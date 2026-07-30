import { and, desc, eq, or } from "drizzle-orm";
import { normalizeEmail, normalizePhone } from "@/lib/normalize";
import { bannedIdentifiers, submissions } from "@/src/db/schema";
import { db } from "@/src";

type Category = "essay" | "videography" | "photography";

type EligibilityResult =
	| { allowed: true; attemptNumber: number }
	| { allowed: false; reason: string };

export async function checkSubmissionEligibility(
	email: string,
	phone: string,
	category: Category
): Promise<EligibilityResult> {
	// Hard block — checked against email OR phone, not just email, so someone
	// disqualified can't simply register a new email address to get back in.
	const [banned] = await db
		.select()
		.from(bannedIdentifiers)
		.where(
			or(
				and(eq(bannedIdentifiers.type, "email"), eq(bannedIdentifiers.value, normalizeEmail(email))),
				and(eq(bannedIdentifiers.type, "phone"), eq(bannedIdentifiers.value, normalizePhone(phone)))
			)
		)
		.limit(1);

	if (banned) {
		return {
			allowed: false,
			reason:
				"This email or phone number is associated with a disqualified contestant and cannot submit further entries.",
		};
	}

	const [latest] = await db
		.select()
		.from(submissions)
		.where(and(eq(submissions.email, email), eq(submissions.category, category)))
		.orderBy(desc(submissions.attemptNumber))
		.limit(1);

	if (!latest) {
		return { allowed: true, attemptNumber: 1 };
	}

	if (latest.status === "rejected" && latest.attemptNumber < 2) {
		return { allowed: true, attemptNumber: latest.attemptNumber + 1 };
	}

	if (latest.status === "rejected") {
		return {
			allowed: false,
			reason: `You've already used your one resubmission for the ${category} category.`,
		};
	}

	if (latest.status === "disqualified") {
		return { allowed: false, reason: "This entry was disqualified and cannot be resubmitted." };
	}

	// pending or approved
	return {
		allowed: false,
		reason: `You've already submitted an entry in the ${category} category.`,
	};
}