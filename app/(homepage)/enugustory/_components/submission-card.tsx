"use client";

import Image from "next/image";
import { FileText, Image as ImageIcon, Video, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, type GallerySubmission } from "@/lib/gallery";

const CATEGORY_ICONS = {
	essay: FileText,
	photography: ImageIcon,
	videography: Video,
} as const;

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
	const Icon = CATEGORY_ICONS[submission.category];

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={() => onView(submission)}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onView(submission);
				}
			}}
			className="bg-background flex flex-col gap-1 rounded-lg border p-2 pe-3 transition-colors duration-300 cursor-pointer hover:border-brand/50">
			<div className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-3 overflow-hidden">
					<div className="relative flex aspect-square size-10 shrink-0 items-center justify-center overflow-hidden rounded border bg-muted">
						{submission.category === "photography" ? (
							<img src={submission.fileUrl} alt={submission.entryTitle} className="object-cover" />
						) : (
							<Icon className="size-4 text-muted-foreground" aria-hidden="true" />
						)}
					</div>
					<div className="flex min-w-0 flex-col gap-0.5">
						<p className="truncate text-sm font-medium">{submission.entryTitle}</p>
						<p className="text-muted-foreground truncate text-xs font-azeret-mono uppercase">
							{CATEGORY_LABELS[submission.category]} by {submission.fullName}·
						</p>
					</div>
				</div>

				<div className="flex items-center gap-1">
					<span className="text-brand text-xs font-medium tabular-nums">
						{submission.voteCount.toLocaleString()}
					</span>
					<button
						type="button"
						aria-label="Vote for this entry"
						onClick={(e) => {
							e.stopPropagation();
							onVoteClick(submission);
						}}
						className={cn(
							"text-muted-foreground/80 hover:text-brand -me-2 size-8 hover:bg-transparent",
							"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
							"disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring",
							"focus-visible:ring-ring/50 inline-flex items-center justify-center gap-2 rounded-md",
							"text-sm font-medium whitespace-nowrap outline-none transition-[color,box-shadow] focus-visible:ring-[3px]",
						)}>
						<Heart aria-hidden="true" className="size-4" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default SubmissionCard;
