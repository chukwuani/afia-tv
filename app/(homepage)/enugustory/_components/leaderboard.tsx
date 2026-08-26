"use client";

import { cn } from "@/lib/utils";
import type { TopVoter } from "@/lib/gallery";

function RankBadge({ rank }: { rank: number }) {
	return (
		<span
			className={cn(
				"flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
				rank === 1 ? "border-brand text-brand" : "border-muted-foreground/30 text-muted-foreground",
			)}>
			{rank}
		</span>
	);
}

function Leaderboard({ topVoters, loading }: { topVoters: TopVoter[]; loading: boolean }) {
	return (
		<div className="w-full">
			<h3 className="font-anton text-sm uppercase text-brand">Top Voters</h3>

			{loading ? (
				<p className="mt-3 text-sm text-muted-foreground">No votes cast yet.</p>
			) : topVoters.length === 0 ? (
				<p className="mt-3 text-sm text-muted-foreground">No votes cast yet.</p>
			) : (
				<ol className="mt-3 space-y-1">
					{topVoters.map((voter, idx) => (
						<li
							key={voter.voterId}
							className="flex items-center gap-3">
							{/* <RankBadge rank={idx + 1} /> */}
							<p className="min-w-0 flex-1 truncate text-sm font-medium">
								{voter.fullName}{" "}
								<span className="font-normal text-muted-foreground">from {voter.location}</span>
							</p>
							<span className="shrink-0 text-xs font-azeret-mono text-brand">
								{voter.voteCount.toLocaleString()}
							</span>
						</li>
					))}
				</ol>
			)}
		</div>
	);
}

export default Leaderboard;