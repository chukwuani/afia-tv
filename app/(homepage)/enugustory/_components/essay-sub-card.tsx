"use client";

import { Button } from "@/components/ui/button";
import type { GallerySubmission } from "@/lib/gallery";

function EssayCard({
	submission,
	onView,
	onVoteClick,
}: {
	submission: GallerySubmission;
	onView: (submission: GallerySubmission) => void;
	onVoteClick: (submission: GallerySubmission) => void;
}) {
	return (
		<section className="group flex flex-col rounded-lg border border-border p-5 text-left transition-shadow hover:shadow-md">
			<h3 className="text-sm md:text-base font-outfit font-medium line-clamp-2 mt-1 mb-3">
				{submission.entryTitle}
			</h3>

			<section className="flex gap-2 items-center mb-3">
				<p className="text-xs text-muted-foreground font-medium uppercase font-azeret-mono">
					{submission.category} -{" "}
				</p>
				<p className="text-xs text-muted-foreground font-medium inline-flex uppercase font-azeret-mono">
					By {submission.fullName}
				</p>
			</section>

			<section className="flex items-center justify-start gap-2 w-full">
				<Button className="w-fit" variant="outline" onClick={() => onView(submission)}>
					View entry
				</Button>

				<Button
					className="w-fit"
					variant="default"
					
					onClick={(e) => {
						e.stopPropagation();
						onVoteClick(submission);
					}}>
					Vote
				</Button>
			</section>
		</section>
	);
}

export default EssayCard;
