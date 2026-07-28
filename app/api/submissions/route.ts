import { NextRequest, NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { db } from "@/src/index";
import { submissions } from "@/src/db/schema";
import { submissionSchema } from "@/lib/validations/submission";
import { getMp4DurationFromS3 } from "@/lib/mp4Duration";
import { getOrCreateContestant } from "@/lib/contestant";

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

export async function POST(req: NextRequest) {
	const body = await req.json().catch(() => null);
	const parsed = submissionSchema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
	}

	const data = parsed.data;

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
				{ status: 422 }
			);
		}

		if (duration < MIN_VIDEO_SECONDS || duration > MAX_VIDEO_SECONDS) {
			await deleteUploadedFile(data.fileKey);
			return NextResponse.json(
				{
					error: `Video must be between 3 and 7 minutes long (yours is ${Math.round(
						duration / 60
					)} min). Please re-upload.`,
				},
				{ status: 422 }
			);
		}
	}

	try {
		const contestant = await getOrCreateContestant(data.email, data.fullName);

		const [submission] = await db
			.insert(submissions)
			.values({
				contestantId: contestant.contestantId,
				fullName: data.fullName,
				age: data.age,
				stateOfOrigin: data.stateOfOrigin,
				community: data.community,
				entryTitle: data.entryTitle,
				category: data.category,
				phone: data.phone,
				email: data.email,
				instagramLink: data.instagramLink,
				caption: data.caption,
				fileKey: data.fileKey,
				fileUrl: data.fileUrl,
				photoKey: data.photoKey,
				photoUrl: data.photoUrl,
			})
			.returning();

		return NextResponse.json(
			{ success: true, id: submission.id, contestantId: submission.contestantId },
			{ status: 201 }
		);
	} catch (err) {
		// Postgres raises error code 23505 (unique_violation) against the
		// [email, category] index when someone submits a second entry in the same category.
		const code = (err as { code?: string })?.code;
		const message = err instanceof Error ? err.message : "";

		if (code === "23505" || message.includes("duplicate key value violates unique constraint")) {
			return NextResponse.json(
				{ error: `You've already submitted an entry in the ${data.category} category.` },
				{ status: 409 }
			);
		}

		console.error("Submission save failed:", err);
		return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
	}
}