export type SubmissionOrigin = "local" | "international";
export type Category = "essay" | "photography" | "videography";
export type CategoryFilter = "all" | Category;

export interface GallerySubmission {
	id: string;
	contestantId: number;
	fullName: string;
	entryTitle: string;
	category: Category;
	origin: SubmissionOrigin;
	// One of these is set depending on origin.
	stateOfResidenceLabel: string | null;
	location: string | null;
	caption: string | null;
	// The entrant's profile photo — used as an avatar/fallback, not the entry itself.
	photoUrl: string;
	// The actual entry file: the photograph for photography, the video for
	// videography, or the essay document for essay.
	fileUrl: string;
	fileUrlTwo: string | null;
	voteCount: number;
}

export interface Voter {
	id: string;
	email: string;
	hasUsedFreeVote: boolean;
}

export const CATEGORY_LABELS: Record<Category, string> = {
	essay: "Essay",
	photography: "Photography",
	videography: "Videography",
};

export const ORIGIN_LABELS: Record<SubmissionOrigin, string> = {
	local: "Nigeria",
	international: "International",
};