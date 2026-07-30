import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "@/src/index";
import { admins, type Admin } from "@/src/db/schema";

export async function getAdminByKey(key: string | null | undefined): Promise<Admin | null> {
	if (!key) return null;

	const [admin] = await db.select().from(admins).where(eq(admins.key, key)).limit(1);
	return admin ?? null;
}

function generateAdminKey() {
	// 12 URL-safe characters (~72 bits of entropy) — short enough to live in a
	// query string comfortably, long enough not to be guessable, unlike the
	// short numeric keys used for initial seeding.
	return randomBytes(9).toString("base64url");
}

const MAX_ROTATE_ATTEMPTS = 20;

/** Replaces an admin's access key with a fresh random one and returns it. */
export async function rotateAdminKey(adminId: string): Promise<string> {
	for (let attempt = 0; attempt < MAX_ROTATE_ATTEMPTS; attempt++) {
		const newKey = generateAdminKey();

		try {
			await db.update(admins).set({ key: newKey }).where(eq(admins.id, adminId));
			return newKey;
		} catch (err) {
			const code = (err as { code?: string })?.code;
			if (code !== "23505") throw err; // real error, not a key collision — don't swallow it
			// else: extremely unlikely collision, loop and try another random key
		}
	}

	throw new Error("Could not generate a unique access key after multiple attempts");
}