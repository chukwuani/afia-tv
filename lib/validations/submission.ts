import { z } from "zod";

export const wordCount = (str: string) =>
	str.trim().split(/\s+/).filter(Boolean).length;

const instagramUrlSchema = z.string().url().refine((url) => {
	try {
		const parsed = new URL(url);

		if (parsed.hostname !== "instagram.com" && parsed.hostname !== "www.instagram.com") {
			return false;
		}

		if (
			parsed.pathname.startsWith("/p/") ||
			parsed.pathname.startsWith("/reel/") ||
			parsed.pathname.startsWith("/tv/") ||
			parsed.pathname.startsWith("/stories/") ||
			parsed.pathname.startsWith("/explore/") ||
			parsed.pathname.startsWith("/accounts/") ||
			parsed.pathname.includes("/tagged/") ||
			parsed.pathname.includes("/reels/") ||
			parsed.pathname.includes("/feed/")
		) {
			return false;
		}

		return /^\/([a-zA-Z0-9_.]+)\/?$/.test(parsed.pathname);
	} catch {
		return false;
	}
}, "Must be a valid Instagram profile URL (e.g., https://instagram.com/username)");

export const categoryEnum = z.enum(["essay", "videography", "photography"]);
export const stateEnum = z.enum(["abia", "anambra", "ebonyi", "enugu", "imo"]);

// Fields the participant fills in directly. No file data here — files are
// uploaded separately and their keys/urls are attached before the final POST.
export const submissionMetadataSchema = z.object({
	fullName: z.string().min(2, "Full name is required"),
	age: z.coerce.number().int().min(1, "Age is required").max(100),
	stateOfOrigin: stateEnum,
	community: z.string().min(2, "Community is required"),
	entryTitle: z.string().min(2, "Entry title is required").max(150),
	category: categoryEnum,
	phone: z
		.string()
		.regex(/^(\+234|0)[789]\d{9}$/, "Enter a valid Nigerian phone number"),
	email: z.string().email("Invalid email address"),
	instagramLink: instagramUrlSchema,
	caption: z.string().optional(),
});

// Shared so the client (live validation) and server (source of truth) enforce
// the exact same rule.
function refineCaption(
	data: z.infer<typeof submissionMetadataSchema>,
	ctx: z.RefinementCtx
) {
	if (data.category === "photography") {
		const count = data.caption ? wordCount(data.caption) : 0;

		if (count < 100 || count > 200) {
			ctx.addIssue({
				code: "custom",
				path: ["caption"],
				message: "Caption/story must be between 100 and 200 words",
			});
		}
	}
}

// Used by the form (react-hook-form resolver) — metadata only.
export const submissionFormSchema = submissionMetadataSchema.superRefine(refineCaption);

// Used by the API route — metadata + the file keys/urls returned by the upload step.
export const submissionSchema = submissionMetadataSchema
	.extend({
		fileKey: z.string().min(1, "Entry file is required"),
		fileUrl: z.string().url(),
		photoKey: z.string().min(1, "Profile photo is required"),
		photoUrl: z.string().url(),
	})
	.superRefine(refineCaption);

export type SubmissionFormValues = z.infer<typeof submissionFormSchema>;
export type SubmissionInput = z.infer<typeof submissionSchema>;