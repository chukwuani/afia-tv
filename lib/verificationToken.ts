import { createHmac, timingSafeEqual } from "crypto";
import { normalizeEmail } from "./normalize";

const TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes — enough to finish the form and upload files

function sign(payload: string): string {
	const secret = process.env.VERIFICATION_TOKEN_SECRET;
	if (!secret) throw new Error("VERIFICATION_TOKEN_SECRET is not set");
	return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function issueVerificationToken(email: string): string {
	const payload = JSON.stringify({
		email: normalizeEmail(email),
		exp: Date.now() + TOKEN_TTL_MS,
	});
	const encodedPayload = Buffer.from(payload).toString("base64url");
	return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifyVerificationToken(
	token: string | undefined | null,
	email: string
): { valid: boolean; reason?: string } {
	if (!token) return { valid: false, reason: "Email verification is required before submitting." };

	const [encodedPayload, signature] = token.split(".");
	if (!encodedPayload || !signature) return { valid: false, reason: "Invalid verification token." };

	const expectedSignature = sign(encodedPayload);
	const sigBuf = Buffer.from(signature);
	const expectedBuf = Buffer.from(expectedSignature);

	if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
		return { valid: false, reason: "Invalid verification token." };
	}

	let payload: { email: string; exp: number };
	try {
		payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
	} catch {
		return { valid: false, reason: "Invalid verification token." };
	}

	if (Date.now() > payload.exp) {
		return { valid: false, reason: "Verification expired — please verify your email again." };
	}

	if (payload.email !== normalizeEmail(email)) {
		return { valid: false, reason: "Verification does not match the submitted email." };
	}

	return { valid: true };
}