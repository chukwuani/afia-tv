import { randomInt, createHash } from "crypto";
import { eq } from "drizzle-orm";
import { normalizeEmail } from "./normalize";
import { sendZeptoMail } from "./zeptomail";
import { db } from "@/src";
import { emailVerifications } from "@/src/db/schema";

const CODE_TTL_MINUTES = 10;
const MAX_ATTEMPTS = 5;

function hashCode(code: string) {
	return createHash("sha256").update(code).digest("hex");
}

export async function sendEmailVerificationCode(email: string, name: string): Promise<string> {
	const code = randomInt(100000, 999999).toString();
	const expiresAt = new Date(Date.now() + CODE_TTL_MINUTES * 60 * 1000);

	const [row] = await db
		.insert(emailVerifications)
		.values({ email: normalizeEmail(email), codeHash: hashCode(code), expiresAt })
		.returning();

	await sendZeptoMail({
		to: email,
		toName: name,
		subject: "Your verification code",
		html: `
			<div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #111;">
				<p>Hi ${name},</p>
				<p>Your verification code is:</p>
				<p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${code}</p>
				<p style="color:#666; font-size: 13px;">This code expires in ${CODE_TTL_MINUTES} minutes.</p>
			</div>
		`,
	});

	return row.id;
}

export async function confirmEmailVerificationCode(
	verificationId: string,
	code: string
): Promise<{ ok: boolean; reason?: string }> {
	const [row] = await db
		.select()
		.from(emailVerifications)
		.where(eq(emailVerifications.id, verificationId))
		.limit(1);

	if (!row) return { ok: false, reason: "Verification session not found — request a new code." };
	if (row.verified) return { ok: true };
	if (new Date() > row.expiresAt) return { ok: false, reason: "Code expired — request a new one." };
	if (row.attempts >= MAX_ATTEMPTS) return { ok: false, reason: "Too many attempts — request a new code." };

	if (hashCode(code) !== row.codeHash) {
		await db
			.update(emailVerifications)
			.set({ attempts: row.attempts + 1 })
			.where(eq(emailVerifications.id, verificationId));
		return { ok: false, reason: "Incorrect code." };
	}

	await db.update(emailVerifications).set({ verified: true }).where(eq(emailVerifications.id, verificationId));
	return { ok: true };
}