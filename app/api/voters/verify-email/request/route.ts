// Route: POST /api/voters/verify-email/request
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { db } from "@/src";
import { bannedIdentifiers } from "@/src/db/schema";
// Reuses your existing OTP + ZeptoMail pipeline as-is.
import { sendEmailVerificationCode } from "@/lib/emailVerification";
import { normalizeEmail } from "@/lib/normalize";

const bodySchema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
	const parsed = bodySchema.safeParse(await req.json());
	if (!parsed.success) {
		return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
	}
	const email = normalizeEmail(parsed.data.email);

	const [banned] = await db
		.select()
		.from(bannedIdentifiers)
		.where(and(eq(bannedIdentifiers.type, "email"), eq(bannedIdentifiers.value, email)))
		.limit(1);
	if (banned) {
		return NextResponse.json({ error: "Unable to send a code to this address." }, { status: 400 });
	}

	// No voter name to personalize the email with yet at this point in the
	// flow — swap "there" for a real name if you add a name field to the
	// vote dialog before this call.
	const verificationId = await sendEmailVerificationCode(email, "there");

	return NextResponse.json({ verificationId });
}