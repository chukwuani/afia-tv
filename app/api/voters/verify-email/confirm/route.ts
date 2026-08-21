// Route: POST /api/voters/verify-email/confirm
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";

import { db } from "@/src";
import { emailVerifications, voters } from "@/src/db/schema";
import { confirmEmailVerificationCode } from "@/lib/emailVerification";
import { createVoterSession } from "@/lib/voters/auth";

const bodySchema = z.object({
	verificationId: z.string().uuid(),
	code: z.string().min(4).max(8),
});

export async function POST(req: NextRequest) {
	const parsed = bodySchema.safeParse(await req.json());
	if (!parsed.success) {
		return NextResponse.json({ error: "Enter the code we sent you." }, { status: 400 });
	}
	const { verificationId, code } = parsed.data;

	const result = await confirmEmailVerificationCode(verificationId, code);
	if (!result.ok) {
		return NextResponse.json({ error: result.reason ?? "That code didn't work." }, { status: 400 });
	}

	// confirmEmailVerificationCode only returns ok/reason, not the row — pull
	// it separately to get the (already-normalized) email it verified.
	const [verification] = await db
		.select()
		.from(emailVerifications)
		.where(eq(emailVerifications.id, verificationId))
		.limit(1);
	if (!verification) {
		return NextResponse.json({ error: "Verification session not found." }, { status: 400 });
	}

	let [voter] = await db.select().from(voters).where(eq(voters.email, verification.email)).limit(1);
	if (!voter) {
		[voter] = await db.insert(voters).values({ email: verification.email }).returning();
	}

	await createVoterSession(voter.id);

	return NextResponse.json({
		voter: { id: voter.id, email: voter.email, hasUsedFreeVote: voter.hasUsedFreeVote },
	});
}