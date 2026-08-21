"use client";

import { Button } from "@/components/ui/button";
import type { GallerySubmission } from "@/lib/gallery";

function PhotographyCard({
	submission,
	onView,
	onVoteClick,
}: {
	submission: GallerySubmission;
	onView: (submission: GallerySubmission) => void;
	onVoteClick: (submission: GallerySubmission) => void;
}) {
	return (
		<section className="flex flex-col">
			<img
				src={submission.fileUrl}
				alt={submission.entryTitle}
				sizes="(min-width: 768px) 50vw, (min-width: 1024px) 25vw, 100vw"
				className="rounded-none bg-muted object-cover aspect-[16/9] w-auto max-sm:mx-4 mb-4"
			/>

			<section className="max-sm:px-4">
				<section className="flex gap-2 items-center mb-2">
					<p className="text-xs text-muted-foreground font-medium uppercase font-azeret-mono">
						{submission.category} -{" "}
					</p>
					<p className="text-xs text-muted-foreground font-medium inline-flex uppercase font-azeret-mono">
						By {submission.fullName}
					</p>
				</section>

				<h3 className="font-anton uppercase text-[24px] leading-[140%] tracking-normal mt-1 mb-3 line-clamp-2 transition-colors">
					{submission.entryTitle}
				</h3>
				<p className="text-sm font-outfit text-muted-foreground mb-4 line-clamp-2">
					{submission.caption}
				</p>
			</section>

			<Button
				size="sm"
				variant="outline"
				onClick={() => onView(submission)}>
				View entry
			</Button>

			<Button
				size="sm"
				variant="default"
                className="mt-3"
				onClick={(e) => {
					e.stopPropagation();
					onVoteClick(submission);
				}}>
				Vote
			</Button>
		</section>
	);
}

export default PhotographyCard;
