import { sql } from "drizzle-orm";
import {
	pgTable,
	text,
	integer,
	boolean,
	timestamp,
	uuid,
	uniqueIndex,
	pgEnum,
} from "drizzle-orm/pg-core";

// Full list of Nigerian states + FCT — used for "State of Origin" (open to anyone).
export const nigerianStateEnum = pgEnum("nigerian_state", [
	"abia",
	"adamawa",
	"akwa_ibom",
	"anambra",
	"bauchi",
	"bayelsa",
	"benue",
	"borno",
	"cross_river",
	"delta",
	"ebonyi",
	"edo",
	"ekiti",
	"enugu",
	"gombe",
	"imo",
	"jigawa",
	"kaduna",
	"kano",
	"katsina",
	"kebbi",
	"kogi",
	"kwara",
	"lagos",
	"nasarawa",
	"niger",
	"ogun",
	"ondo",
	"osun",
	"oyo",
	"plateau",
	"rivers",
	"sokoto",
	"taraba",
	"yobe",
	"zamfara",
	"fct",
]);

// South East only — used for "State of Residence", which the competition restricts.
export const stateOfResidenceEnum = pgEnum("state_of_residence", [
	"abia",
	"anambra",
	"ebonyi",
	"enugu",
	"imo",
]);

export const genderEnum = pgEnum("gender", ["male", "female"]);

export const categoryEnum = pgEnum("category", ["essay", "videography", "photography"]);

export const statusEnum = pgEnum("status", ["pending", "approved", "rejected", "disqualified"]);

// NEW: distinguishes the two submission tracks. Local entries keep using the
// Nigerian state enums; international entries use the free-text `location`
// field instead, since we can't enumerate every country/region.
export const submissionOriginEnum = pgEnum("submission_origin", ["local", "international"]);

// One row per person. contestantId is the public-facing 3-digit number;
// email is what ties a person's multiple category entries together.
// Self-managed email OTP - code generated and hashed here, delivered via ZeptoMail.
// Phone OTP is delegated entirely to Termii, which handles generate/send/verify itself.
export const emailVerifications = pgTable("email_verifications", {
	id: uuid("id").defaultRandom().primaryKey(),
	email: text("email").notNull(),
	codeHash: text("code_hash").notNull(),
	verified: boolean("verified").notNull().default(false),
	attempts: integer("attempts").notNull().default(0),
	expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const identifierTypeEnum = pgEnum("identifier_type", ["email", "phone"]);

export const bannedIdentifiers = pgTable(
	"banned_identifiers",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		type: identifierTypeEnum("type").notNull(),
		value: text("value").notNull(), // normalized: lowercased email, or last-10-digits phone
		contestantId: integer("contestant_id").notNull(),
		reason: text("reason"),
		bannedBy: text("banned_by").notNull(),
		bannedAt: timestamp("banned_at", { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => ({
		typeValueIdx: uniqueIndex("banned_identifiers_type_value_idx").on(table.type, table.value),
	}),
);

export const contestants = pgTable("contestants", {
	id: uuid("id").defaultRandom().primaryKey(),
	contestantId: integer("contestant_id").notNull().unique(),
	email: text("email").notNull().unique(),
	fullName: text("full_name").notNull(),
	disqualified: boolean("disqualified").notNull().default(false),
	disqualifiedReason: text("disqualified_reason"),
	disqualifiedBy: text("disqualified_by"),
	disqualifiedAt: timestamp("disqualified_at", { withTimezone: true }),

	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const submissions = pgTable(
	"submissions",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		contestantId: integer("contestant_id")
			.notNull()
			.references(() => contestants.contestantId),
		fullName: text("full_name").notNull(),
		dateOfBirth: text("date_of_birth").notNull(),
		gender: genderEnum("gender").notNull(),

		// NEW: which track this entry belongs to. Defaults to "local" so existing
		// rows/inserts are unaffected.
		origin: submissionOriginEnum("origin").notNull().default("local"),

		// Local-only fields — now nullable, enforced as required at the app layer
		// when origin = "local".
		stateOfOrigin: nigerianStateEnum("state_of_origin"),
		stateOfResidence: stateOfResidenceEnum("state_of_residence"),

		// International-only field — free text (e.g. "London, United Kingdom").
		// Enforced as required at the app layer when origin = "international".
		location: text("location"),

		address: text("address").notNull(),
		entryTitle: text("entry_title").notNull(),
		category: categoryEnum("category").notNull(),
		phone: text("phone").notNull(),
		email: text("email").notNull(),
		instagramLink: text("instagram_link").notNull(),
		caption: text("caption"),
		fileKey: text("file_key").notNull(),
		fileUrl: text("file_url").notNull(),
		fileKeyTwo: text("file_key_two"),
		fileUrlTwo: text("file_url_two"),
		photoKey: text("photo_key").notNull(),
		photoUrl: text("photo_url").notNull(),
		attemptNumber: integer("attempt_number").notNull().default(1),
		status: statusEnum("status").notNull().default("pending"),
		approvedBy: text("approved_by"), // name of the admin who last actioned this entry
		reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
		ipAddress: text("ip_address"),
		flaggedForReview: boolean("flagged_for_review").notNull().default(false),
		flagReason: text("flag_reason"),

		// NEW: cached vote count for fast leaderboard reads. Kept in sync inside
		// the same transaction that inserts a row into `votes`.
		voteCount: integer("vote_count").notNull().default(0),

		createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => ({
		// A person can now have up to 2 rows per category (original + one resubmission),
		// but never two rows at the same attempt number.
		emailCategoryAttemptIdx: uniqueIndex("email_category_attempt_idx").on(
			table.email,
			table.category,
			table.attemptNumber,
		),
	}),
);

// Each admin gets their own key (?ak=...) mapped to their name.
export const admins = pgTable("admins", {
	id: uuid("id").defaultRandom().primaryKey(),
	key: text("key").notNull().unique(),
	name: text("name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Append-only audit trail of every export, not just the last one.
export const exportLogs = pgTable("export_logs", {
	id: uuid("id").defaultRandom().primaryKey(),
	adminId: uuid("admin_id")
		.notNull()
		.references(() => admins.id),
	adminName: text("admin_name").notNull(),
	category: text("category"), // null = exported everything
	exportedAt: timestamp("exported_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Voting
// ---------------------------------------------------------------------------

export const voteSourceEnum = pgEnum("vote_source", ["free", "paid"]);
export const paymentProviderEnum = pgEnum("payment_provider", ["flutterwave"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "success", "failed"]);

// Authenticated voters. Separate from `contestants` — someone can vote without
// entering, and an entrant can vote too. Reuses the existing `emailVerifications`
// table for OTP (it's already keyed on email only, not tied to a contestant),
// so no new verification flow is needed — just create a `voters` row once the
// email is verified.
export const voters = pgTable("voters", {
	id: uuid("id").defaultRandom().primaryKey(),
	email: text("email").notNull().unique(),
	fullName: text("full_name").notNull(),   // was nullable
	location: text("location").notNull(),     // new
	hasUsedFreeVote: boolean("has_used_free_vote").notNull().default(false),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// One row per checkout. Provider is chosen based on the submission's origin:
// "local" -> Paystack (NGN), "international" -> Stripe (USD). Quantity lets
// someone buy a bundle of votes in one payment instead of one at a time.
export const votePurchases = pgTable("vote_purchases", {
	id: uuid("id").defaultRandom().primaryKey(),
	voterId: uuid("voter_id")
		.notNull()
		.references(() => voters.id),
	submissionId: uuid("submission_id")
		.notNull()
		.references(() => submissions.id),
	provider: paymentProviderEnum("provider").notNull(),
	providerReference: text("provider_reference").notNull().unique(), // Stripe session id / Paystack tx ref
	quantity: integer("quantity").notNull().default(1),
	unitAmountCents: integer("unit_amount_cents").notNull().default(500), // $5.00 (or Paystack's kobo equivalent)
	amountTotalCents: integer("amount_total_cents").notNull(),
	currency: text("currency").notNull(), // "usd" | "ngn"
	status: paymentStatusEnum("status").notNull().default("pending"),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	confirmedAt: timestamp("confirmed_at", { withTimezone: true }), // set by the webhook handler
});

// One row per individual vote (free or paid). Paid votes are only inserted
// after the provider webhook confirms payment — never on the client redirect.
export const votes = pgTable(
	"votes",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		submissionId: uuid("submission_id")
			.notNull()
			.references(() => submissions.id),
		voterId: uuid("voter_id")
			.notNull()
			.references(() => voters.id),
		source: voteSourceEnum("source").notNull(),
		votePurchaseId: uuid("vote_purchase_id").references(() => votePurchases.id), // null for free votes
		createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => ({
		// DB-level backstop for "one free vote per voter", in addition to the
		// `hasUsedFreeVote` flag checked in application code.
		oneFreeVotePerVoter: uniqueIndex("one_free_vote_per_voter_idx")
			.on(table.voterId)
			.where(sql`${table.source} = 'free'`),
	}),
);

export type Contestant = typeof contestants.$inferSelect;
export type Submission = typeof submissions.$inferSelect;
export type NewSubmission = typeof submissions.$inferInsert;
export type Admin = typeof admins.$inferSelect;
export type Voter = typeof voters.$inferSelect;
export type Vote = typeof votes.$inferSelect;
export type VotePurchase = typeof votePurchases.$inferSelect;
export type NewVotePurchase = typeof votePurchases.$inferInsert;
