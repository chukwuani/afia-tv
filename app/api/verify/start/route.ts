// ROUTE: POST /api/verify/start
// Sends an email code (self-managed, via ZeptoMail) and a phone OTP (via Termii)
// in parallel. The client holds onto emailVerificationId/phonePinId and submits
// them, plus both codes, to /api/verify/confirm.
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmailVerificationCode } from "@/lib/emailVerification";
import { PHONE_OTP_ENABLED, sendPhoneOtp } from "@/lib/termii";

const schema = z.object({
	email: z.string().email(),
	phone: z.string().regex(/^(\+234|0)[789]\d{9}$/, "Enter a valid Nigerian phone number"),
	fullName: z.string().min(2),
});

export async function POST(req: NextRequest) {
	const body = await req.json().catch(() => null);
	const parsed = schema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json({ error: "Please provide a valid email and phone number." }, { status: 400 });
	}

	const { email, phone, fullName } = parsed.data;

	const [emailVerificationId, phoneResult] = await Promise.all([
		sendEmailVerificationCode(email, fullName),
		PHONE_OTP_ENABLED ? sendPhoneOtp(phone) : Promise.resolve({ pinId: "phone-otp-disabled" }),
	]);

	if ("error" in phoneResult) {
		return NextResponse.json({ error: phoneResult.error }, { status: 502 });
	}

	return NextResponse.json({ emailVerificationId, phonePinId: phoneResult.pinId });
}