"use client";

import { useEffect, useState } from "react";
import SubmissionCard from "./submission-card";
import SubmissionDetailDialog from "./submission-detail-dialog";
import VoteDialog from "./vote-dialog";
import Leaderboard from "./leaderboard";

import {
	CATEGORY_LABELS,
	ORIGIN_LABELS,
	type CategoryFilter,
	type GallerySubmission,
	type SubmissionOrigin,
} from "@/lib/gallery";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import NewsSkeleton from "@/components/skeletons/news-skeleton";
import { useSubmissions, useLeaderboard, useVoter } from "@/hooks/use-gallery";

const ORIGIN_OPTIONS: { value: SubmissionOrigin; label: string }[] = [
	{ value: "local", label: ORIGIN_LABELS.local },
	{ value: "international", label: ORIGIN_LABELS.international },
];

const CATEGORY_OPTIONS: { value: CategoryFilter; label: string }[] = [
	{ value: "all", label: "All categories" },
	{ value: "essay", label: "Essay" },
	{ value: "videography", label: "Videography" },
	{ value: "photography", label: "Photography" },
];

const PAGE_SIZE = 12;

function SubmissionsGallery() {
	const [origin, setOrigin] = useState<SubmissionOrigin>("local");
	const [category, setCategory] = useState<CategoryFilter>("all");
	const [page, setPage] = useState(1);

	const [voteTarget, setVoteTarget] = useState<GallerySubmission | null>(null);
	const [viewTarget, setViewTarget] = useState<GallerySubmission | null>(null);

	// Reset to page 1 whenever the filters change, otherwise you can land on
	// a page that doesn't exist for the new origin/category combination.
	useEffect(() => {
		setPage(1);
	}, [origin, category]);

	const { data: voter } = useVoter();

	const { data: submissionsData, isLoading: loadingSubmissions } = useSubmissions({
		origin,
		category,
		page,
		pageSize: PAGE_SIZE,
	});

	const { data: leaderboardData, isLoading: loadingLeaderboard } = useLeaderboard({ origin });

	const submissions = submissionsData?.submissions ?? [];
	const totalCount = submissionsData?.totalCount ?? 0;
	const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

	return (
		<Card className="flex flex-col border-none bg-background rounded-none shadow-none py-8 px-4 md:px-10 lg:px-12">
			{/* Section header */}
			<section>
				<CardHeader className="px-0">
					<CardTitle className="text-brand font-anton text-[28px] md:text-[50px] leading-[1.1em] font-normal tracking-[.5px] mb-2 uppercase">
						My Enugu Story — Entries
					</CardTitle>
					<CardDescription className="font-outfit text-muted-foreground text-sm md:text-base max-w-[480px]">
						Browse this year&apos;s entries and cast your vote to keep supporting your favorites.
					</CardDescription>
				</CardHeader>
			</section>

			{/* Separator */}
			<div
				className="h-px w-full"
				style={{
					backgroundImage: "repeating-linear-gradient(90deg, #000 0 6px, transparent 6px 12px)",
				}}
			/>

			{/* Filters */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-6">
				<Select value={origin} onValueChange={(v) => setOrigin(v as SubmissionOrigin)}>
					<SelectTrigger className="w-full sm:w-[200px]" id="origin">
						<SelectValue placeholder="Select origin" />
					</SelectTrigger>
					<SelectContent>
						{ORIGIN_OPTIONS.map((opt) => (
							<SelectItem key={opt.value} value={opt.value}>
								{opt.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<div className="flex flex-wrap gap-2">
					<Select value={category} onValueChange={(v) => setCategory(v as CategoryFilter)}>
						<SelectTrigger className="w-full sm:w-[200px]" id="category">
							<SelectValue placeholder="Select category" />
						</SelectTrigger>
						<SelectContent>
							{CATEGORY_OPTIONS.map((opt) => (
								<SelectItem key={opt.value} value={opt.value}>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Submissions + leaderboard, side by side */}
			<div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
				<div>
					<section className="grid grid-cols-1 gap-3 md:grid-cols-2">
						{loadingSubmissions ? (
							Array.from({ length: 6 }).map((_, index) => <NewsSkeleton key={index} />)
						) : submissions.length === 0 ? (
							<div className="col-span-full rounded-lg p-10 text-center text-sm text-muted-foreground">
								No {category === "all" ? "" : `${CATEGORY_LABELS[category]} `}entries yet for{" "}
								{ORIGIN_LABELS[origin]}.
							</div>
						) : (
							submissions.map((submission) => (
								<SubmissionCard
									key={submission.id}
									submission={submission}
									onView={setViewTarget}
									onVoteClick={setVoteTarget}
								/>
							))
						)}
					</section>

					{totalCount > PAGE_SIZE && (
						<div className="mt-8 flex items-center justify-center gap-3">
							<Button
								variant="outline"
								size="sm"
								disabled={page <= 1}
								onClick={() => setPage((p) => Math.max(1, p - 1))}>
								Previous
							</Button>
							<span className="text-sm text-muted-foreground">
								Page {page} of {totalPages}
							</span>
							<Button
								variant="outline"
								size="sm"
								disabled={page >= totalPages}
								onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
								Next
							</Button>
						</div>
					)}
				</div>

				<aside className="bg-background h-fit rounded-lg border p-4">
					<Leaderboard topVoters={leaderboardData?.topVoters ?? []} loading={loadingLeaderboard} />
				</aside>
			</div>

			{/* Dialogs */}
			<SubmissionDetailDialog
				submission={viewTarget}
				open={Boolean(viewTarget)}
				onOpenChange={(open) => {
					if (!open) setViewTarget(null);
				}}
				onVoteClick={(submission) => {
					setViewTarget(null);
					setVoteTarget(submission);
				}}
			/>

			{voteTarget && (
				<VoteDialog
					submission={voteTarget}
					voter={voter}
					open={Boolean(voteTarget)}
					onOpenChange={(open) => {
						if (!open) setVoteTarget(null);
					}}
				/>
			)}
		</Card>
	);
}

export default SubmissionsGallery;