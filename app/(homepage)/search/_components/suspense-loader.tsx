"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Shell } from "@/components/shell";

export default function SuspenseLoader() {
	return (
		<section className="flex flex-col sm:px-12 py-16">
			{/* ── Search Bar ────────────────────────────────────────────────── */}
			<form className="flex items-center gap-2 max-sm:px-6 mb-8 w-full">
				<div className="relative flex-1 max-w-2xl ml-auto">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
					<Input placeholder="Search news..." className="pl-9 pr-9 rounded text-sm" />
				</div>
				<Button type="submit" className="rounded text-[0.75rem] tracking-[2.4px] uppercase mr-auto">
					Search
				</Button>
			</form>

			<div className="flex flex-row items-center justify-between gap-4 max-sm:px-6 max-w-3xl flex-1 mx-auto w-full">
				<section>
					<h2 className="font-anton uppercase text-[20px] sm:text-[24px] leading-[140%] tracking-normal line-clamp-2 text-brand">
						Results for News
					</h2>

					<p className="text-sm font-outfit text-muted-foreground">Searching...</p>
				</section>

				{/* ── Sort Toggle ───────────────────────────────────────────── */}
				<div className="flex items-center gap-2">
					<Select defaultValue={"Relevance"}>
						<SelectTrigger className="w-full max-w-48">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
					</Select>
				</div>
			</div>

			<Shell as="article" variant="content" className="px-0 gap-4">
				<React.Fragment>
					{Array.from({ length: 8 }).map((_, index) => (
						<section key={index} className="group cols-span-1 gap-2 w-full my-4">
							<section className="flex flex-col md:flex-row-reverse items-end gap-4">
								<Skeleton className="aspect-[14/9] rounded-none object-cover max-w-[205px] w-full" />

								<section className="gap-3 flex flex-col py-2 w-full">
									<Skeleton className="h-[10px] w-3/4 rounded-none mt-3 mb-2" />

									<Skeleton className="h-[10px] w-full rounded-none" />

									<Skeleton className="h-[10px] w-full rounded-none mb-2" />

									<Skeleton className="h-[10px] w-20 rounded-none" />
								</section>
							</section>
						</section>
					))}
				</React.Fragment>

				<Button
					variant="outline"
					size="lg"
					className="flex mx-auto rounded text-[0.75rem] tracking-[2.4px] uppercase w-fit mt-5">
					Load More
				</Button>
			</Shell>
		</section>
	);
}
