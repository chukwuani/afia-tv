// ROUTE: POST /api/verify/confirm
// Checks the email code (against our own stored hash). Phone OTP verification
// is disabled for now (PHONE_OTP_ENABLED = false in lib/termii.ts) - once a
// Termii sender ID is approved, flip that flag and this route re-enables
// checking phoneCode/phonePinId without any other changes needed here.
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { confirmEmailVerificationCode } from "@/lib/emailVerification";
import { PHONE_OTP_ENABLED, verifyPhoneOtp } from "@/lib/termii";
import { issueVerificationToken } from "@/lib/verificationToken";

const schema = z.object({
	email: z.string().email(),
	phone: z.string(),
	emailVerificationId: z.string(),
	emailCode: z.string(),
	phonePinId: z.string().optional(),
	phoneCode: z.string().optional(),
});

export async function POST(req: NextRequest) {
	const body = await req.json().catch(() => null);
	const parsed = schema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json({ error: "Invalid verification request." }, { status: 400 });
	}

	const { email, phone, emailVerificationId, emailCode, phonePinId, phoneCode } = parsed.data;

	const [emailResult, phoneVerified] = await Promise.all([
		confirmEmailVerificationCode(emailVerificationId, emailCode),
		PHONE_OTP_ENABLED && phonePinId && phoneCode
			? verifyPhoneOtp(phonePinId, phoneCode)
			: Promise.resolve(true),
	]);

	if (!emailResult.ok || !phoneVerified) {
		const errors: string[] = [];
		if (!emailResult.ok) errors.push(`Email code: ${emailResult.reason}`);
		if (!phoneVerified) errors.push("Phone code: incorrect or expired.");
		return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
	}

	const token = issueVerificationToken(email, phone);
	return NextResponse.json({ verified: true, token });
}