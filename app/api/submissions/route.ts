// Final submit step — validates the full payload, re-verifies video duration
// server-side, assigns/reuses a contestant ID, and saves the record.
import { NextRequest, NextResponse, after } from "next/server";
import { and, eq } from "drizzle-orm";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { submissionSchema } from "@/lib/validations/submission";
import { getMp4DurationFromS3 } from "@/lib/mp4Duration";
import { getOrCreateContestant } from "@/lib/contestant";
import { checkSubmissionEligibility } from "@/lib/eligibility";
import { sendSubmissionReceivedEmail } from "@/lib/notifications";
import { verifyVerificationToken } from "@/lib/verificationToken";
import { db } from "@/src";
import { submissions } from "@/src/db/schema";

// Vercel's default timeout is tight for this route: R2 range-fetches for video
// duration verification plus DB queries can add up on a slow connection. 60 is
// the max on Hobby; raise further if you're on Pro/Enterprise.
export const maxDuration = 60;

const s3 = new S3Client({
	region: process.env.R2_REGION || "auto",
	endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID!,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
	},
	requestChecksumCalculation: "WHEN_REQUIRED",
	responseChecksumValidation: "WHEN_REQUIRED",
});

const MIN_VIDEO_SECONDS = 3 * 60;
const MAX_VIDEO_SECONDS = 7 * 60;

async function deleteUploadedFile(key: string) {
	try {
		await s3.send(new DeleteObjectCommand({ Bucket: process.env.R2_BUCKET_NAME!, Key: key }));
	} catch (err) {
		// Non-fatal — an orphaned file in storage is a cleanup task, not a request failure
		console.error("Failed to clean up rejected upload:", key, err);
	}
}

function getClientIp(req: NextRequest): string | null {
	// Best-effort only — used purely as a soft review-flag signal, never to block.
	const forwardedFor = req.headers.get("x-forwarded-for");
	if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || null;
	return req.headers.get("x-real-ip");
}

export async function POST(req: NextRequest) {
	const body = await req.json().catch(() => null);
	const parsed = submissionSchema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
	}

	const data = parsed.data;

	// Checked first, before touching storage or the database at all — an
	// unverified submission shouldn't even trigger a file cleanup, it should
	// never have gotten this far with real uploaded files in a well-behaved client.
	const tokenCheck = verifyVerificationToken(data.verificationToken, data.email);
	if (!tokenCheck.valid) {
		return NextResponse.json({ error: tokenCheck.reason }, { status: 401 });
	}

	// Checked before anything else — disqualification (email OR phone) and the
	// one-resubmission rule both live here. No point verifying video duration
	// for a submission that can't be accepted anyway.
	const eligibility = await checkSubmissionEligibility(data.email, data.phone, data.category);

	if (!eligibility.allowed) {
		await deleteUploadedFile(data.fileKey);
		await deleteUploadedFile(data.photoKey);
		return NextResponse.json({ error: eligibility.reason }, { status: 403 });
	}

	// Never trust the client's own duration check — re-verify server-side against
	// the actual uploaded object before the submission is accepted.
	if (data.category === "videography") {
		let duration: number;

		try {
			duration = await getMp4DurationFromS3(data.fileKey);
		} catch (err) {
			console.error("Video duration check failed:", err);
			await deleteUploadedFile(data.fileKey);
			return NextResponse.json(
				{
					error:
						"We couldn't verify your video's duration. Please re-export as a standard MP4 and try again.",
				},
				{ status: 422 },
			);
		}

		if (duration < MIN_VIDEO_SECONDS || duration > MAX_VIDEO_SECONDS) {
			await deleteUploadedFile(data.fileKey);
			return NextResponse.json(
				{
					error: `Video must be between 3 and 7 minutes long (yours is ${Math.round(
						duration / 60,
					)} min). Please re-upload.`,
				},
				{ status: 422 },
			);
		}
	}

	// Soft signal only — an IP match against a past disqualified submission gets
	// flagged for a human to look at, never auto-blocked (shared IPs are common
	// and would otherwise catch innocent people on the same network/campus/café).
	const ip = getClientIp(req);
	let flaggedForReview = false;
	let flagReason: string | null = null;

	if (ip) {
		const [disqualifiedMatch] = await db
			.select({ id: submissions.id })
			.from(submissions)
			.where(and(eq(submissions.ipAddress, ip), eq(submissions.status, "disqualified")))
			.limit(1);

		if (disqualifiedMatch) {
			flaggedForReview = true;
			flagReason = "IP address matches a previously disqualified submission — verify manually.";
		}
	}

	try {
		const contestant = await getOrCreateContestant(data.email, data.fullName);

		const [submission] = await db
			.insert(submissions)
			.values({
				contestantId: contestant.contestantId,
				fullName: data.fullName,
				dateOfBirth: data.dateOfBirth,
				gender: data.gender,
				stateOfOrigin: data.stateOfOrigin,
				stateOfResidence: data.stateOfResidence,
				address: data.address,
				entryTitle: data.entryTitle,
				category: data.category,
				phone: data.phone,
				email: data.email,
				instagramLink: data.instagramLink,
				caption: data.caption,
				fileKey: data.fileKey,
				fileUrl: data.fileUrl,
				fileKeyTwo: data.fileKeyTwo,
				fileUrlTwo: data.fileUrlTwo,
				photoKey: data.photoKey,
				photoUrl: data.photoUrl,
				attemptNumber: eligibility.attemptNumber,
				ipAddress: ip,
				flaggedForReview,
				flagReason,
			})
			.returning();

		// Scheduled after the response is sent — the client shouldn't wait on
		// ZeptoMail, and sendZeptoMail already never throws so this can't fail silently either.
		after(() =>
			sendSubmissionReceivedEmail(
				data.email,
				data.fullName,
				data.category,
				submission.contestantId,
			),
		);

		return NextResponse.json(
			{ success: true, id: submission.id, contestantId: submission.contestantId },
			{ status: 201 },
		);
	} catch (err) {
		// Postgres raises error code 23505 (unique_violation) against the
		// [email, category, attempt_number] index in a rare race condition.
		const code = (err as { code?: string })?.code;
		const message = err instanceof Error ? err.message : "";

		if (code === "23505" || message.includes("duplicate key value violates unique constraint")) {
			return NextResponse.json(
				{ error: `You've already submitted an entry in the ${data.category} category.` },
				{ status: 409 },
			);
		}

		console.error("Submission save failed:", err);
		return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
	}
}
