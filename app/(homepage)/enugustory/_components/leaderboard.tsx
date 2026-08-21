"use client";

import { cn } from "@/lib/utils";
import type { GallerySubmission } from "@/lib/gallery";

function Leaderboard({
	entries,
	loading,
	title = "Leaderboard",
}: {
	entries: GallerySubmission[];
	loading: boolean;
	title?: string;
}) {
	return (
		<div className="w-full">
			{title && <h2 className="font-anton text-lg uppercase text-brand">{title}</h2>}

			{loading ? (
				<ul className="mt-3 space-y-3">
					{Array.from({ length: 5 }).map((_, i) => (
						<li key={i} className="h-10 animate-pulse rounded bg-muted" />
					))}
				</ul>
			) : entries.length === 0 ? (
				<p className="mt-3 text-sm text-muted-foreground">
					No votes cast yet — be the first to support an entry.
				</p>
			) : (
				<ol className="mt-3 space-y-1">
					{entries.map((entry, idx) => {
						const rank = idx + 1;
						return (
							<li
								key={entry.id}
								className="flex items-center gap-3 rounded-md">
								<span
									className={cn(
										"flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-azeret-mono font-medium",
										rank === 1
											? "text-brand"
											: "border-muted-foreground/30 text-muted-foreground",
									)}>
									{rank}
								</span>

								<div className="min-w-0 flex-1">
									<p className="truncate text-sm font-medium max-w-[300px]">{entry.entryTitle}</p>
									<p className="truncate text-xs text-muted-foreground">{entry.fullName}</p>
								</div>

								<span className="shrink-0 text-sm font-medium font-azeret-mono text-brand">
									{entry.voteCount.toLocaleString()}
								</span>
							</li>
						);
					})}
				</ol>
			)}
		</div>
	);
}

export default Leaderboard;