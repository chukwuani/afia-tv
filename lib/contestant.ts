import { eq } from "drizzle-orm";
import { db } from "@/src/index";
import { contestants, type Contestant } from "@/src/db/schema";

const MAX_ATTEMPTS = 15;

function randomThreeDigitId() {
	return Math.floor(100 + Math.random() * 900); // 100–999
}

/**
 * Returns the existing contestant for this email, or creates one with a fresh
 * random 3-digit contestantId. Retries on contestant_id collisions (only 900
 * possible values, so collisions are expected as the pool fills up) and also
 * handles the race where two submissions from the same brand-new email land
 * at nearly the same time.
 */
export async function getOrCreateContestant(email: string, fullName: string): Promise<Contestant> {
	const [existing] = await db.select().from(contestants).where(eq(contestants.email, email)).limit(1);
	if (existing) return existing;

	for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
		try {
			const [created] = await db
				.insert(contestants)
				.values({ contestantId: randomThreeDigitId(), email, fullName })
				.returning();
			return created;
		} catch (err) {
			const code = (err as { code?: string })?.code;
			const message = err instanceof Error ? err.message : "";

			if (code !== "23505") throw err; // not a uniqueness conflict — real error, bail out

			// Two concurrent requests from the same new email both tried to create
			// a contestant — the other one won, so just fetch what it made.
			if (message.includes("contestants_email")) {
				const [raceWinner] = await db
					.select()
					.from(contestants)
					.where(eq(contestants.email, email))
					.limit(1);
				if (raceWinner) return raceWinner;
			}

			// Otherwise it was a contestant_id collision — try another random number.
		}
	}

	throw new Error("Could not generate a unique contestant ID after multiple attempts");
}