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
	"abia", "adamawa", "akwa_ibom", "anambra", "bauchi", "bayelsa", "benue",
	"borno", "cross_river", "delta", "ebonyi", "edo", "ekiti", "enugu", "gombe",
	"imo", "jigawa", "kaduna", "kano", "katsina", "kebbi", "kogi", "kwara",
	"lagos", "nasarawa", "niger", "ogun", "ondo", "osun", "oyo", "plateau",
	"rivers", "sokoto", "taraba", "yobe", "zamfara", "fct",
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

// One row per person. contestantId is the public-facing 3-digit number;
// email is what ties a person's multiple category entries together.
export const identifierTypeEnum = pgEnum("identifier_type", ["email", "phone"]);

// Hard-block list. When a contestant is disqualified, their email and every
// phone number they've used gets a row here. This is the actual enforcement
// point — not contestants.disqualified, which is just a cached display flag.
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
	})
);

export const contestants = pgTable("contestants", {
	id: uuid("id").defaultRandom().primaryKey(),
	contestantId: integer("contestant_id").notNull().unique(),
	email: text("email").notNull().unique(),
	fullName: text("full_name").notNull(),

	// Once true, this person is blocked from submitting to ANY category, regardless
	// of which specific entry triggered it.
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
		gender: genderEnum("gender").notNull(),
		dateOfBirth: text("date_of_birth").notNull(),
		stateOfOrigin: nigerianStateEnum("state_of_origin").notNull(),
		stateOfResidence: stateOfResidenceEnum("state_of_residence").notNull(),
		address: text("address").notNull(),
		entryTitle: text("entry_title").notNull(),
		category: categoryEnum("category").notNull(),
		phone: text("phone").notNull(),
		email: text("email").notNull(),
		instagramLink: text("instagram_link").notNull(),
		caption: text("caption"),

		// Entry file (essay doc / video / photo artwork)
		fileKey: text("file_key").notNull(),
		fileUrl: text("file_url").notNull(),

		// Participant's profile photo
		photoKey: text("photo_key").notNull(),
		photoUrl: text("photo_url").notNull(),

		// 1 = original entry, 2 = the one-time resubmission allowed after a rejection.
		// Never goes higher — enforced in application logic, see lib/eligibility.ts.
		attemptNumber: integer("attempt_number").notNull().default(1),

		status: statusEnum("status").notNull().default("pending"),
		approvedBy: text("approved_by"), // name of the admin who last actioned this entry
		reviewedAt: timestamp("reviewed_at", { withTimezone: true }),

		// Best-effort signal, not an enforcement mechanism — can be spoofed and shared
		// networks cause false positives, so this only ever flags for human review, never blocks.
		ipAddress: text("ip_address"),
		flaggedForReview: boolean("flagged_for_review").notNull().default(false),
		flagReason: text("flag_reason"),

		createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => ({
		// A person can now have up to 2 rows per category (original + one resubmission),
		// but never two rows at the same attempt number.
		emailCategoryAttemptIdx: uniqueIndex("email_category_attempt_idx").on(
			table.email,
			table.category,
			table.attemptNumber
		),
	})
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

export type Contestant = typeof contestants.$inferSelect;
export type Submission = typeof submissions.$inferSelect;
export type NewSubmission = typeof submissions.$inferInsert;
export type Admin = typeof admins.$inferSelect;