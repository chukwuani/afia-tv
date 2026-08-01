import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { confirmEmailVerificationCode } from "@/lib/emailVerification";
import { issueVerificationToken } from "@/lib/verificationToken";

const schema = z.object({
	email: z.string().email(),
	emailVerificationId: z.string(),
	emailCode: z.string(),
});

export async function POST(req: NextRequest) {
	const body = await req.json().catch(() => null);
	const parsed = schema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json({ error: "Invalid verification request." }, { status: 400 });
	}

	const { email, emailVerificationId, emailCode } = parsed.data;
	const result = await confirmEmailVerificationCode(emailVerificationId, emailCode);

	if (!result.ok) {
		return NextResponse.json({ error: result.reason }, { status: 400 });
	}

	const token = issueVerificationToken(email);
	return NextResponse.json({ verified: true, token });
}