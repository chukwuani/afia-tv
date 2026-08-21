import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { eq } from "drizzle-orm";

import { db } from "@/src";
import { voters } from "@/src/db/schema";

const SESSION_COOKIE = "voter_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days

function getSecret() {
	const secret = process.env.VOTER_SESSION_SECRET;
	if (!secret) throw new Error("VOTER_SESSION_SECRET is not set");
	return new TextEncoder().encode(secret);
}

export async function createVoterSession(voterId: string) {
	const token = await new SignJWT({ voterId })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("180d")
		.sign(getSecret());

	const cookieStore = await cookies();
	cookieStore.set(SESSION_COOKIE, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: SESSION_MAX_AGE_SECONDS,
		path: "/",
	});
}

/** Reads the session cookie and returns the full voter row, or null. */
export async function getCurrentVoter() {
	const cookieStore = await cookies();
	const token = cookieStore.get(SESSION_COOKIE)?.value;
	if (!token) return null;

	try {
		const { payload } = await jwtVerify(token, getSecret());
		const voterId = payload.voterId as string;
		const [voter] = await db.select().from(voters).where(eq(voters.id, voterId)).limit(1);
		return voter ?? null;
	} catch {
		// Expired, tampered, or malformed token — treat as logged out.
		return null;
	}
}

// OTP generation/hashing/sending is handled by @/src/lib/emailVerification —
// this module only owns the voter session cookie once that's confirmed.