CREATE TYPE "public"."category" AS ENUM('essay', 'videography', 'photography');--> statement-breakpoint
CREATE TYPE "public"."state_of_origin" AS ENUM('abia', 'anambra', 'ebonyi', 'enugu', 'imo');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"age" integer NOT NULL,
	"state_of_origin" "state_of_origin" NOT NULL,
	"community" text NOT NULL,
	"entry_title" text NOT NULL,
	"category" "category" NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"instagram_link" text NOT NULL,
	"caption" text,
	"file_key" text NOT NULL,
	"file_url" text NOT NULL,
	"photo_key" text NOT NULL,
	"photo_url" text NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "email_category_idx" ON "submissions" USING btree ("email","category");