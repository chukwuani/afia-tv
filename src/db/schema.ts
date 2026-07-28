import { sql } from "drizzle-orm";
import { pgTable, text, integer, timestamp, uuid, uniqueIndex, pgEnum } from "drizzle-orm/pg-core";

export const stateOfOriginEnum = pgEnum("state_of_origin", [
	"abia",
	"anambra",
	"ebonyi",
	"enugu",
	"imo",
]);

export const categoryEnum = pgEnum("category", ["essay", "videography", "photography"]);

export const statusEnum = pgEnum("status", ["pending", "approved", "rejected"]);

// One row per person. contestantId is the public-facing 3-digit number;
// email is what ties a person's multiple category entries together.
export const contestants = pgTable("contestants", {
	id: uuid("id").defaultRandom().primaryKey(),
	contestantId: integer("contestant_id").notNull().unique(),
	email: text("email").notNull().unique(),
	fullName: text("full_name").notNull(),
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
		age: integer("age").notNull(),
		stateOfOrigin: stateOfOriginEnum("state_of_origin").notNull(),
		community: text("community").notNull(),
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

		status: statusEnum("status").notNull().default("pending"),
		approvedBy: text("approved_by"), // name of the admin who approved/rejected
		reviewedAt: timestamp("reviewed_at", { withTimezone: true }),

		createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => ({
		// One entry per participant per category
		emailCategoryIdx: uniqueIndex("email_category_idx").on(table.email, table.category),
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
	adminName: text("admin_name").notNull(), // denormalized so history survives an admin being removed later
	category: text("category"), // null = exported everything
	exportedAt: timestamp("exported_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Contestant = typeof contestants.$inferSelect;
export type Submission = typeof submissions.$inferSelect;
export type NewSubmission = typeof submissions.$inferInsert;
export type Admin = typeof admins.$inferSelect;
