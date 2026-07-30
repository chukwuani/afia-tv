import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getAdminByKey } from "@/lib/adminAuth";
import { banContestantIdentifiers } from "@/lib/banIdentity"
import { sendApprovedEmail, sendRejectedEmail, sendDisqualifiedEmail } from "@/lib/notifications";
import { db } from "@/src";
import { contestants, submissions } from "@/src/db/schema";

const STATUS_BY_ACTION = {
	approve: "approved",
	reject: "rejected",
	disqualify: "disqualified",
} as const;

// Next.js 15: route params are async. On Next.js 14, change the signature to
// `{ params }: { params: { id: string } }` and drop the `await`.
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const key = req.nextUrl.searchParams.get("ak");
	const admin = await getAdminByKey(key);

	if (!admin) {
		return NextResponse.json({ error: "Invalid or missing access key" }, { status: 401 });
	}

	const body = await req.json().catch(() => null);
	const action = body?.action as keyof typeof STATUS_BY_ACTION | undefined;

	if (!action || !(action in STATUS_BY_ACTION)) {
		return NextResponse.json(
			{ error: "action must be 'approve', 'reject', or 'disqualify'" },
			{ status: 400 }
		);
	}

	const [updated] = await db
		.update(submissions)
		.set({
			status: STATUS_BY_ACTION[action],
			approvedBy: admin.name,
			reviewedAt: new Date(),
		})
		.where(eq(submissions.id, id))
		.returning();

	if (!updated) {
		return NextResponse.json({ error: "Submission not found" }, { status: 404 });
	}

	if (action === "disqualify") {
		// Contestant-level ban — flags them so they're blocked from submitting to
		// any category, not just the one just actioned. Also hard-bans their email
		// and every phone number on record, so a new email alone won't bypass this.
		await db
			.update(contestants)
			.set({
				disqualified: true,
				disqualifiedBy: admin.name,
				disqualifiedAt: new Date(),
				disqualifiedReason: body?.reason ?? null,
			})
			.where(eq(contestants.contestantId, updated.contestantId));

		await banContestantIdentifiers(updated.contestantId, updated.email, admin.name, body?.reason);
	}

	// Fire-and-forget — sendZeptoMail never throws, so a broken email provider
	// can't undo an admin decision that already saved successfully.
	if (action === "approve") {
		await sendApprovedEmail(updated.email, updated.fullName, updated.category, updated.entryTitle);
	} else if (action === "reject") {
		await sendRejectedEmail(
			updated.email,
			updated.fullName,
			updated.category,
			updated.entryTitle,
			updated.attemptNumber < 2
		);
	} else if (action === "disqualify") {
		await sendDisqualifiedEmail(updated.email, updated.fullName);
	}

	return NextResponse.json({ success: true, submission: updated });
}