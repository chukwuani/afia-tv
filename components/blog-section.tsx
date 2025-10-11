"use client";

import Link from "next/link";

import { Separator } from "./ui/separator";

import NewsSkeleton from "@/components/skeletons/news-skeleton";
import { Button } from "@/components/ui/button";

import { formatDate } from "@/lib/utils";
import { NewsTypes } from "@/types";

import useInfinteQuery from "@/hooks/use-infinte-query";
import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";

const BlogSection = () => {
	const {
		data: news,
		status,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useInfinteQuery("/api/news", "infinite_news");

	return (
		<section className="flex flex-col sm:px-12 py-16">
			<h1 className="text-3xl font-epilogue mb-5 max-sm:px-6 uppercase tracking-[.009rem]">
				Latest Stories
			</h1>
			<Separator className="mb-8 h-0.5 bg-border" />

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{status === "pending" ? (
					<React.Fragment>
						{Array.from({ length: 8 }).map((_, index) => (
							<NewsSkeleton key={index} />
						))}
					</React.Fragment>
				) : status === "error" ? (
					<React.Fragment>
						{Array.from({ length: 8 }).map((_, index) => (
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
										href={`/news/${item.slug}`}
										title={item.description}
										className="group cols-span-1 gap-2 w-full">
										<section className="flex flex-col items-end gap-4">
											<AspectRatio ratio={14 / 9}>
												<Image
													src={item.mainImage}
													alt={item.altText}
													fill
													className="rounded-md bg-muted object-cover"
													priority
												/>
											</AspectRatio>

											<section className="flex flex-col gap-2 w-fit">
												<section className="flex gap-2 items-center text-muted-foreground font-epilogue text-sm mb-2">
													<p className="text-xs text-muted-foreground font-medium capitalize">
														By {item.author.name} -{" "}
													</p>
													<p className="text-xs text-muted-foreground font-medium inline-flex capitalize">
														{formatDate(item._createdAt)}
													</p>
												</section>

												<p className="text-2xl font-dm-sans mb-3 line-clamp-2 group-hover:text-brand">{item.title}</p>

												<p className="text-sm leading-7 tracking-wide font-epilogue text-muted-foreground mb-4 line-clamp-3">
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
				className="flex mx-auto rounded-full mt-8">
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
