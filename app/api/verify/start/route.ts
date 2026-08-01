import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmailVerificationCode } from "@/lib/emailVerification";

const schema = z.object({
	email: z.string().email(),
	fullName: z.string().min(2),
});

export async function POST(req: NextRequest) {
	const body = await req.json().catch(() => null);
	const parsed = schema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
	}

	const { email, fullName } = parsed.data;
	const emailVerificationId = await sendEmailVerificationCode(email, fullName);

	return NextResponse.json({ emailVerificationId });
}