CREATE TYPE "public"."category" AS ENUM('essay', 'videography', 'photography');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('male', 'female');--> statement-breakpoint
CREATE TYPE "public"."identifier_type" AS ENUM('email', 'phone');--> statement-breakpoint
CREATE TYPE "public"."nigerian_state" AS ENUM('abia', 'adamawa', 'akwa_ibom', 'anambra', 'bauchi', 'bayelsa', 'benue', 'borno', 'cross_river', 'delta', 'ebonyi', 'edo', 'ekiti', 'enugu', 'gombe', 'imo', 'jigawa', 'kaduna', 'kano', 'katsina', 'kebbi', 'kogi', 'kwara', 'lagos', 'nasarawa', 'niger', 'ogun', 'ondo', 'osun', 'oyo', 'plateau', 'rivers', 'sokoto', 'taraba', 'yobe', 'zamfara', 'fct');--> statement-breakpoint
CREATE TYPE "public"."state_of_residence" AS ENUM('abia', 'anambra', 'ebonyi', 'enugu', 'imo');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'approved', 'rejected', 'disqualified');--> statement-breakpoint
CREATE TABLE "admins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admins_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "banned_identifiers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "identifier_type" NOT NULL,
	"value" text NOT NULL,
	"contestant_id" integer NOT NULL,
	"reason" text,
	"banned_by" text NOT NULL,
	"banned_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contestants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contestant_id" integer NOT NULL,
	"email" text NOT NULL,
	"full_name" text NOT NULL,
	"disqualified" boolean DEFAULT false NOT NULL,
	"disqualified_reason" text,
	"disqualified_by" text,
	"disqualified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "contestants_contestant_id_unique" UNIQUE("contestant_id"),
	CONSTRAINT "contestants_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "export_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_id" uuid NOT NULL,
	"admin_name" text NOT NULL,
	"category" text,
	"exported_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contestant_id" integer NOT NULL,
	"full_name" text NOT NULL,
	"gender" "gender" NOT NULL,
	"date_of_birth" text NOT NULL,
	"state_of_origin" "nigerian_state" NOT NULL,
	"state_of_residence" "state_of_residence" NOT NULL,
	"address" text NOT NULL,
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
	"attempt_number" integer DEFAULT 1 NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"approved_by" text,
	"reviewed_at" timestamp with time zone,
	"ip_address" text,
	"flagged_for_review" boolean DEFAULT false NOT NULL,
	"flag_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "export_logs" ADD CONSTRAINT "export_logs_admin_id_admins_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admins"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_contestant_id_contestants_contestant_id_fk" FOREIGN KEY ("contestant_id") REFERENCES "public"."contestants"("contestant_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "banned_identifiers_type_value_idx" ON "banned_identifiers" USING btree ("type","value");--> statement-breakpoint
CREATE UNIQUE INDEX "email_category_attempt_idx" ON "submissions" USING btree ("email","category","attempt_number");