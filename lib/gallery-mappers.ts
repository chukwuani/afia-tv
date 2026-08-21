import type { Submission } from "@/src/db/schema";

const STATE_OF_RESIDENCE_LABELS: Record<string, string> = {
	abia: "Abia",
	anambra: "Anambra",
	ebonyi: "Ebonyi",
	enugu: "Enugu",
	imo: "Imo",
};

export function toGallerySubmission(row: Submission) {
	return {
		id: row.id,
		contestantId: row.contestantId,
		fullName: row.fullName,
		entryTitle: row.entryTitle,
		category: row.category,
		origin: row.origin,
		stateOfResidenceLabel: row.stateOfResidence
			? (STATE_OF_RESIDENCE_LABELS[row.stateOfResidence] ?? row.stateOfResidence)
			: null,
		location: row.location,
		caption: row.caption,
		photoUrl: row.photoUrl,
		fileUrl: row.fileUrl,
		fileUrlTwo: row.fileUrlTwo,
		voteCount: row.voteCount,
	};
}