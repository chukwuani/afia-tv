"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { NewsTypes } from "@/types";

import axios from "axios";
import React, { useState, useRef } from "react";
import { RefreshCw, Search, X } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Shell } from "@/components/shell";
import { Skeleton } from "@/components/ui/skeleton";

type SortMode = "relevance" | "newest" | "oldest";

const SORT_OPTIONS: { label: string; value: SortMode }[] = [
	{ label: "Sort by Relevance", value: "relevance" },
	{ label: "Sort by Newest", value: "newest" },
	{ label: "Sort by Oldest", value: "oldest" },
];

const LIMIT = 8;

const SANITY_URL = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;
const SANITY_HEADERS = {
	Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
	"Content-Type": "application/json",
};

export default function SearchPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const searchQuery = searchParams.get("q") ?? "";

	// ── Search bar local state (mirrors the URL param) ───────────────────────
	const [inputValue, setInputValue] = useState(searchQuery);
	const [sortMode, setSortMode] = useState<SortMode>("relevance");
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSearch = (e?: React.FormEvent) => {
		e?.preventDefault();
		const trimmed = inputValue.trim();
		const params = new URLSearchParams(searchParams.toString());
		if (trimmed) {
			params.set("q", trimmed);
		} else {
			params.delete("q");
		}
		router.push(`?${params.toString()}`);
	};

	const handleClear = () => {
		setInputValue("");
		router.push("?");
		inputRef.current?.focus();
	};

	const fetchData = async ({ pageParam }: { pageParam: string }) => {
		const cursor = pageParam.replace("lastPublishedAt=", ",").split(",")[0];
		const lastPublishedAt = pageParam.replace("lastPublishedAt=", ",").split(",")[1];

		const hasCursor = !!(cursor && lastPublishedAt);
		const isFirstPage = !pageParam;
		const searchTerm = `${searchQuery}*`;

		const orderClause =
			sortMode === "relevance"
				? `| score(
						boost(title match $searchTerm, 3),
						description match $searchTerm
					  )
					  | order(_score desc)`
				: sortMode === "newest"
					? `| order(publishedAt desc)`
					: `| order(publishedAt asc)`;

		const baseFilter = `_type == "news" && !(_id in path("drafts.**"))`;
		const searchFilter = searchQuery ? `&& [title, description] match $searchTerm` : "";
		const cursorFilter =
			hasCursor && sortMode !== "relevance"
				? sortMode === "newest"
					? `&& (publishedAt < $lastPublishedAt || (publishedAt == $lastPublishedAt && _id > $cursor))`
					: `&& (publishedAt > $lastPublishedAt || (publishedAt == $lastPublishedAt && _id > $cursor))`
				: "";

		const projection = `{
			_id,
			_createdAt,
			publishedAt,
			title,
			description,
			author->{
				name,
				"imageUrl": image.asset->url
			},
			"slug": slug.current,
			"mainImage": mainImage.asset->url,
			"altText": mainImage.alt
		}`;

		const pagination =
			sortMode === "relevance"
				? `[${Number(cursor || 0)}...${Number(cursor || 0) + LIMIT}]`
				: `[0...${LIMIT}]`;

		const query = `*[${baseFilter} ${searchFilter} ${cursorFilter}]
			${orderClause}
			${pagination}
			${projection}`;

		const params: Record<string, string | number> = { searchTerm };
		if (hasCursor && sortMode !== "relevance") {
			params.cursor = cursor;
			params.lastPublishedAt = lastPublishedAt;
		}

		const [res, countRes] = await Promise.all([
			axios.post(SANITY_URL, { query, params }, { headers: SANITY_HEADERS }),
			isFirstPage
				? axios.post(
						SANITY_URL,
						{
							query: `count(*[${baseFilter} ${searchFilter}])`,
							params: { searchTerm },
						},
						{ headers: SANITY_HEADERS },
					)
				: Promise.resolve(null),
		]);

		const news: NewsTypes[] = res.data.result ?? [];
		const totalCount: number = countRes?.data?.result ?? 0;

		let nextCursor: string | null = null;
		if (news.length === LIMIT) {
			nextCursor =
				sortMode === "relevance"
					? String(Number(cursor || 0) + LIMIT)
					: news[LIMIT - 1]._id + `lastPublishedAt=${news[LIMIT - 1].publishedAt}`;
		}

		return { news, nextCursor, totalCount };
	};

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, refetch } =
		useInfiniteQuery({
			queryKey: ["infinite_search_news", searchQuery, sortMode],
			queryFn: fetchData,
			initialPageParam: "",
			getNextPageParam: (lastPage) => lastPage?.nextCursor,
		});

	const totalCount = data?.pages?.[0]?.totalCount ?? 0;

	return (
		<section className="flex flex-col sm:px-12 py-16">

			{/* ── Search Bar ────────────────────────────────────────────────── */}
			<form
				onSubmit={handleSearch}
				className="flex items-center gap-2 max-sm:px-6 mb-8 w-full">
				<div className="relative flex-1 max-w-2xl ml-auto">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
					<Input
						ref={inputRef}
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder="Search news..."
						className="pl-9 pr-9 rounded text-sm"
					/>
					{inputValue && (
						<button
							type="button"
							onClick={handleClear}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
							<X className="size-4" />
						</button>
					)}
				</div>
				<Button
					type="submit"
					className="rounded text-[0.75rem] tracking-[2.4px] uppercase mr-auto">
					Search
				</Button>
			</form>

			<div className="flex flex-row items-center justify-between gap-4 max-sm:px-6 max-w-3xl flex-1 mx-auto w-full">
				<section>
					<h2 className="font-anton uppercase text-[20px] sm:text-[24px] leading-[140%] tracking-normal line-clamp-2 text-brand">
						{searchQuery ? `Results for "${searchQuery}"` : "News"}
					</h2>

					<p className="text-sm font-outfit text-muted-foreground">
						{status === "pending" ? (
							"Searching..."
						) : totalCount > 0 ? (
							<>
								Showing {totalCount.toLocaleString()} result{totalCount !== 1 ? "s" : ""}
							</>
						) : null}
					</p>
				</section>

				{/* ── Sort Toggle ───────────────────────────────────────────── */}
				<div className="flex items-center gap-2">
					<Select
						value={sortMode}
						onValueChange={(v: SortMode) => setSortMode(v)}
						defaultValue={sortMode}>
						<SelectTrigger className="w-full max-w-48">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							{SORT_OPTIONS.map((opt) => (
								<SelectItem key={opt.value} value={opt.value}>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<Shell as="article" variant="content" className="px-0 gap-4">
				{status === "pending" && (
					<React.Fragment>
						{Array.from({ length: LIMIT }).map((_, index) => (
							<section key={index} className="group cols-span-1 gap-2 w-full my-4">
								<section className="flex flex-col md:flex-row-reverse items-end gap-4">
									<Skeleton className="aspect-[14/9] rounded-none object-cover md:w-[205px] w-full" />

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
				)}

				{status === "success" && data.pages.flatMap((p) => p.news).length === 0 && (
					<p className="col-span-2 text-center text-muted-foreground font-jetbrains-mono text-sm uppercase tracking-widest py-16">
						No results found for &quot;{searchQuery}&quot;
					</p>
				)}

				{data?.pages?.map((group, i) => (
					<React.Fragment key={i}>
						{group?.news?.map((item: NewsTypes, index: number) => (
							<Link
								key={index}
								title={item?.title}
								href={`/news/${item?.slug}`}
								className="group cols-span-1 gap-2 w-full border-b py-8">
								<section className="flex flex-col md:flex-row-reverse items-end gap-4">
									<img
										src={item?.mainImage}
										alt={item?.altText || "News Image"}
										sizes="(max-width: 600px) 120px, (max-width: 1024px) 165px, 205px"
										className="rounded-none bg-muted object-cover aspect-[14/9] md:w-[205px]"
									/>

									<section className="flex flex-col gap-2 w-fit">
										<section className="flex gap-2 items-center">
											<p className="text-xs text-muted-foreground font-medium uppercase font-jetbrains-mono">
												By {item.author.name} -{" "}
											</p>
											<p className="text-xs text-muted-foreground font-medium inline-flex uppercase font-jetbrains-mono">
												{formatDate(item._createdAt)}
											</p>
										</section>

										<h3 className="font-anton uppercase text-[20px] sm:text-[24px] leading-[140%] tracking-normal mt-1 mb-2 line-clamp-2 transition-colors group-hover:text-brand">
											{item?.title}
										</h3>

										<p className="text-sm font-outfit text-muted-foreground line-clamp-2">
											{item?.description}
										</p>
									</section>
								</section>
							</Link>
						))}
					</React.Fragment>
				))}

				{status === "error" ? (
					<Button
						onClick={() => refetch()}
						variant={"outline"}
						size={"lg"}
						className="flex mx-auto rounded text-[0.75rem] tracking-[2.4px] uppercase">
						Refresh Feed <RefreshCw className="size-5" />
					</Button>
				) : (
					<Button
						variant="outline"
						size="lg"
						disabled={!hasNextPage || isFetchingNextPage}
						onClick={() => fetchNextPage()}
						className="flex mx-auto rounded text-[0.75rem] tracking-[2.4px] uppercase w-fit mt-5">
						{isFetchingNextPage
							? "Loading more..."
							: hasNextPage
								? "Load More"
								: "Nothing more to load"}
					</Button>
				)}
			</Shell>
		</section>
	);
}