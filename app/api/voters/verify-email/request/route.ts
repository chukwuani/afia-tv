import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { db } from "@/src";
import { bannedIdentifiers } from "@/src/db/schema";
import { sendEmailVerificationCode } from "@/lib/emailVerification";
import { normalizeEmail } from "@/lib/normalize";

const bodySchema = z.object({
	email: z.string().email(),
	fullName: z.string().min(1),
});

export async function POST(req: NextRequest) {
	const parsed = bodySchema.safeParse(await req.json());
	if (!parsed.success) {
		return NextResponse.json({ error: "Enter your name and a valid email address." }, { status: 400 });
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

	const verificationId = await sendEmailVerificationCode(email, parsed.data.fullName);

	return NextResponse.json({ verificationId });
}