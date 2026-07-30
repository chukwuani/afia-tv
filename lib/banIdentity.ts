import { eq } from "drizzle-orm";

import { normalizeEmail, normalizePhone } from "@/lib/normalize";
import { db } from "@/src";
import { bannedIdentifiers, submissions } from "@/src/db/schema";

export async function banContestantIdentifiers(
	contestantId: number,
	email: string,
	bannedBy: string,
	reason?: string | null,
) {
	// Ban every phone number this contestant has ever used across any of their
	// submissions, not just the one on the entry being disqualified — someone
	// entering multiple categories might have typed slightly different numbers.
	const phoneRows = await db
		.selectDistinct({ phone: submissions.phone })
		.from(submissions)
		.where(eq(submissions.contestantId, contestantId));

	const values = [
		{
			type: "email" as const,
			value: normalizeEmail(email),
			contestantId,
			bannedBy,
			reason: reason ?? null,
		},
		...phoneRows.map((row) => ({
			type: "phone" as const,
			value: normalizePhone(row.phone),
			contestantId,
			bannedBy,
			reason: reason ?? null,
		})),
	];

	// onConflictDoNothing: re-disqualifying (or disqualifying via a second
	// category) shouldn't error just because the identifier's already banned.
	await db.insert(bannedIdentifiers).values(values).onConflictDoNothing();
}
