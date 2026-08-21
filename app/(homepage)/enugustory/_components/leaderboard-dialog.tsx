"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import Leaderboard from "./leaderboard";
import type { GallerySubmission } from "@/lib/gallery";

function LeaderboardDialog({
	open,
	onOpenChange,
	entries,
	loading,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	entries: GallerySubmission[];
	loading: boolean;
}) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="font-anton uppercase text-brand font-normal">Leaderboard</DialogTitle>
					<DialogDescription>Top entries by votes, for the filters you currently have set.</DialogDescription>
				</DialogHeader>
				<Leaderboard entries={entries} loading={loading} title="" />
			</DialogContent>
		</Dialog>
	);
}

export default LeaderboardDialog;