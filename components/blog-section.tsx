"use client";

import Link from "next/link";

import NewsSkeleton from "@/components/skeletons/news-skeleton";
import { Button } from "@/components/ui/button";

import { formatDate } from "@/lib/utils";
import { NewsTypes } from "@/types";

import useInfinteQuery from "@/hooks/use-infinte-query";
import React from "react";

const BlogSection = () => {
	const {
		data: news,
		status,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useInfinteQuery("/api/news", "infinite_news", 4);

	return (
		<section className="flex flex-col px-6 sm:px-12 py-16 border-t">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{status === "pending" ? (
					<React.Fragment>
						{Array.from({ length: 6 }).map((_, index) => (
							<NewsSkeleton key={index} />
						))}
					</React.Fragment>
				) : status === "error" ? (
					<React.Fragment>
						{Array.from({ length: 6 }).map((_, index) => (
							<NewsSkeleton key={index} />
						))}
					</React.Fragment>
				) : (
					<React.Fragment>
						{news?.pages?.map((group, i) => (
							<React.Fragment key={i}>
								{group?.news?.map((item: NewsTypes) => (
									<Link
										key={item._id}
										title={item.title}
										href={`/news/${item.slug}`}
										className="group cols-span-1 gap-2 w-full">
										<section className="flex flex-col items-end gap-4">
										
												<img
													src={item.mainImage}
													alt={item.altText}
													sizes="(min-width: 768px) 50vw, (min-width: 1024px) 25vw, 100vw"
													className="rounded-none bg-muted object-cover aspect-[14/9] w-full"
												/>
										

											<section className="flex flex-col gap-2 w-fit">
												<section className="flex gap-2 items-center">
													<p className="text-xs text-muted-foreground font-medium uppercase font-azeret-mono">
														By {item.author.name} -{" "}
													</p>
													<p className="text-xs text-muted-foreground font-medium inline-flex uppercase font-azeret-mono">
														{formatDate(item._createdAt)}
													</p>
												</section>

												<h3 className="font-anton uppercase text-[24px] sm:text-[28px] leading-[140%] tracking-normal mt-1 mb-2 line-clamp-2 transition-colors group-hover:text-brand">
													{item.title}
												</h3>

												<p className="text-sm font-outfit text-muted-foreground line-clamp-2">
													{item.description}
												</p>
											</section>
										</section>
									</Link>
								))}
							</React.Fragment>
						))}
					</React.Fragment>
				)}
			</div>

			<Button
				variant="outline"
				size="lg"
				disabled={!hasNextPage || isFetchingNextPage}
				onClick={() => fetchNextPage()}
				className="flex mx-auto rounded mt-8">
				{isFetchingNextPage
					? "Loading more..."
					: hasNextPage
					? "Load More"
					: "Nothing more to load"}
			</Button>
		</section>
	);
};

export default BlogSection;
