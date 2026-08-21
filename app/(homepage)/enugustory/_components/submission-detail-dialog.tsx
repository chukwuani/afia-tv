"use client";

import { FileText, ExternalLink } from "lucide-react";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type GallerySubmission } from "@/lib/gallery";

function isPdf(url: string) {
	return url.toLowerCase().endsWith(".pdf");
}

function EssayBody({ submission }: { submission: GallerySubmission }) {
	return (
		<div className="space-y-4">
			{isPdf(submission.fileUrl) ? (
				<iframe
					src={submission.fileUrl}
					title={submission.entryTitle}
					className="h-[60vh] w-full rounded-md border"
				/>
			) : (
				<div className="flex flex-col items-center gap-3 rounded-md border border-dashed p-10 text-center">
					<FileText className="h-8 w-8 text-muted-foreground" />
					<p className="text-sm text-muted-foreground">
						This essay was submitted as a Word document, which can&apos;t be previewed here.
					</p>
				</div>
			)}
			<Button asChild variant="outline">
				<a href={submission.fileUrl} target="_blank" rel="noopener noreferrer">
					Open full essay <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
				</a>
			</Button>
		</div>
	);
}

function PhotographyBody({ submission }: { submission: GallerySubmission }) {
	const images = [submission.fileUrl, submission.fileUrlTwo].filter((url): url is string => Boolean(url));

	return (
		<div className="space-y-4">
			<div className={`grid gap-3 ${images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
				{images.map((url) => (
					<div key={url} className="relative aspect-square overflow-hidden rounded-md bg-muted">
						<img src={url} alt={submission.entryTitle} className="object-cover" />
					</div>
				))}
			</div>
			{submission.caption && (
				<p className="text-sm leading-relaxed text-foreground">{submission.caption}</p>
			)}
		</div>
	);
}

function VideographyBody({ submission }: { submission: GallerySubmission }) {
	return (
		// eslint-disable-next-line jsx-a11y/media-has-caption -- entrant-submitted videos have no caption track
		<video
			src={submission.fileUrl}
			poster={submission.photoUrl}
			controls
			className="w-full rounded-md border bg-black"
		/>
	);
}

function SubmissionDetailDialog({
	submission,
	open,
	onOpenChange,
	onVoteClick,
}: {
	submission: GallerySubmission | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onVoteClick: (submission: GallerySubmission) => void;
}) {
	if (!submission) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
				<DialogHeader>
					<div className="flex items-center gap-3">
						<div className="min-w-0">
							<DialogTitle className="font-anton uppercase font-normal line-clamp-1">
								{submission.entryTitle}
							</DialogTitle>
						</div>
					</div>
				</DialogHeader>

				{submission.category === "essay" && <EssayBody submission={submission} />}
				{submission.category === "photography" && <PhotographyBody submission={submission} />}
				{submission.category === "videography" && <VideographyBody submission={submission} />}

				<div className="flex items-center justify-between border-t pt-4">
					<span className="text-sm font-medium tabular-nums text-brand">
						{submission.voteCount.toLocaleString()} votes
					</span>
					<Button className="bg-brand hover:bg-brand/90" onClick={() => onVoteClick(submission)}>
						Vote for this entry
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default SubmissionDetailDialog;