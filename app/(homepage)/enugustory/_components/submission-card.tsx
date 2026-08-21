"use client";

import { FileText, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, type GallerySubmission } from "@/lib/gallery";

function SubmissionCard({
	submission,
	onView,
	onVoteClick,
}: {
	submission: GallerySubmission;
	onView: (submission: GallerySubmission) => void;
	onVoteClick: (submission: GallerySubmission) => void;
}) {
	const place =
		submission.origin === "local" ? submission.stateOfResidenceLabel : submission.location;

	// Same box, same aspect ratio, for every category — only the fill and
	// overlay differ. Photography shows the actual entry photo; essay and
	// videography fall back to the entrant's profile photo since neither
	// has a natural still image (a document, and a video with no stored
	// thumbnail, respectively).
	const imageSrc = submission.category === "photography" ? submission.fileUrl : submission.photoUrl;

	return (
		<section className="flex flex-col">
			<img
				src={imageSrc}
				alt={submission.entryTitle}
				sizes="(min-width: 768px) 50vw, (min-width: 1024px) 25vw, 100vw"
				className="rounded-none bg-muted object-cover aspect-[16/9] w-auto max-sm:mx-4 mb-4"
			/>

			<section className="max-sm:px-4">
				<section className="flex gap-2 items-center mb-2">
					<p className="text-xs text-muted-foreground font-medium inline-flex uppercase font-azeret-mono">
						{submission.category} -
					</p>

					<p className="text-xs text-muted-foreground font-medium uppercase font-azeret-mono">
						By {submission.fullName}
					</p>
				</section>

				<h3 className="font-anton uppercase text-[24px] leading-[140%] tracking-normal mt-1 mb-3 line-clamp-2">
					{submission.entryTitle}
				</h3>

<section className="flex gap-3">
	<Button size="sm" onClick={() => onVoteClick(submission)}>
					Vote
				</Button>

				<Button size="sm" variant="outline" onClick={() => onView(submission)}>
					View entry
				</Button>
</section>
				
			</section>
		</section>
	);
}

export default SubmissionCard;
