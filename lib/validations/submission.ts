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

export const genderEnum = z.enum(["male", "female"]);

// Full Nigerian states + FCT — anyone can select any of these for State of Origin.
export const nigerianStateEnum = z.enum([
	"abia", "adamawa", "akwa_ibom", "anambra", "bauchi", "bayelsa", "benue",
	"borno", "cross_river", "delta", "ebonyi", "edo", "ekiti", "enugu", "gombe",
	"imo", "jigawa", "kaduna", "kano", "katsina", "kebbi", "kogi", "kwara",
	"lagos", "nasarawa", "niger", "ogun", "ondo", "osun", "oyo", "plateau",
	"rivers", "sokoto", "taraba", "yobe", "zamfara", "fct",
]);

export const NIGERIAN_STATE_LABELS: Record<z.infer<typeof nigerianStateEnum>, string> = {
	abia: "Abia", adamawa: "Adamawa", akwa_ibom: "Akwa Ibom", anambra: "Anambra",
	bauchi: "Bauchi", bayelsa: "Bayelsa", benue: "Benue", borno: "Borno",
	cross_river: "Cross River", delta: "Delta", ebonyi: "Ebonyi", edo: "Edo",
	ekiti: "Ekiti", enugu: "Enugu", gombe: "Gombe", imo: "Imo", jigawa: "Jigawa",
	kaduna: "Kaduna", kano: "Kano", katsina: "Katsina", kebbi: "Kebbi", kogi: "Kogi",
	kwara: "Kwara", lagos: "Lagos", nasarawa: "Nasarawa", niger: "Niger", ogun: "Ogun",
	ondo: "Ondo", osun: "Osun", oyo: "Oyo", plateau: "Plateau", rivers: "Rivers",
	sokoto: "Sokoto", taraba: "Taraba", yobe: "Yobe", zamfara: "Zamfara", fct: "FCT (Abuja)",
};

// Restricted to South East — used for State of Residence, since the competition is SE-specific.
export const stateOfResidenceEnum = z.enum(["abia", "anambra", "ebonyi", "enugu", "imo"]);

export const STATE_OF_RESIDENCE_LABELS: Record<z.infer<typeof stateOfResidenceEnum>, string> = {
	abia: "Abia",
	anambra: "Anambra",
	ebonyi: "Ebonyi",
	enugu: "Enugu",
	imo: "Imo",
};

// Fields the participant fills in directly. No file data here — files are
// uploaded separately and their keys/urls are attached before the final POST.
export const submissionMetadataSchema = z.object({
	fullName: z.string().min(2, "Full name is required"),
	dateOfBirth: z.string().min(5, "Date of Birth is required"),
	gender: genderEnum,
	stateOfOrigin: nigerianStateEnum,
	stateOfResidence: stateOfResidenceEnum,
	address: z.string().min(5, "Address is required"),
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