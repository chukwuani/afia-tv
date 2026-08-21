"use client";

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GallerySubmission } from "@/lib/gallery";

function VideographyCard({
	submission,
	place,
	onView,
	onVoteClick,
}: {
	submission: GallerySubmission;
	place: string | null;
	onView: (submission: GallerySubmission) => void;
	onVoteClick: (submission: GallerySubmission) => void;
}) {
	return (
		<button
			type="button"
			onClick={() => onView(submission)}
			className="group relative flex flex-col overflow-hidden rounded-lg border border-[#DCCBB0] bg-[#241F1B] text-left transition-shadow hover:shadow-md">
			{/* Using the entrant's profile photo as a poster — there's no stored
			    video thumbnail. Swap for a generated frame if you add one later. */}
			<div className="relative aspect-[4/3] w-full overflow-hidden">
				<img
					src={submission.photoUrl}
					alt={submission.entryTitle}
					sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
					className="object-cover opacity-70 transition-transform duration-300 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />

				<span className="absolute left-3 top-3 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
					Videography
				</span>

				<div className="absolute inset-0 flex items-center justify-center">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#BD4B2C] text-white shadow-lg transition-transform group-hover:scale-110">
						<Play className="h-5 w-5 translate-x-0.5 fill-current" />
					</div>
				</div>

				<div className="absolute inset-x-0 bottom-0 p-3">
					<h3 className="line-clamp-1 font-[Fraunces,serif] text-base text-white">
						{submission.entryTitle}
					</h3>
					<p className="truncate text-xs text-white/70">
						{submission.fullName}
						{place ? ` · ${place}` : ""}
					</p>
				</div>
			</div>

			<div className="flex items-center justify-between bg-[#1B1613] px-4 py-3">
				<span className="font-[IBM_Plex_Mono,monospace] text-sm tabular-nums text-[#C9973A]">
					{submission.voteCount.toLocaleString()} votes
				</span>
				<Button
					size="sm"
					variant="outline"
					className="border-[#C9973A] text-[#C9973A] hover:bg-[#C9973A] hover:text-[#1B1613]"
					onClick={(e) => {
						e.stopPropagation();
						onVoteClick(submission);
					}}>
					Vote
				</Button>
			</div>
		</button>
	);
}

export default VideographyCard;