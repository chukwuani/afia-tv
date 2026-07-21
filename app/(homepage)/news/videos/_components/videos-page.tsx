"use client";

import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { NewsTypes, VideoTypes } from "@/types";

import axios from "axios";
import React from "react";
import { RefreshCw } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import NewsSkeleton from "@/components/skeletons/news-skeleton";

const VideosPage = () => {
	const fetchData = async ({ pageParam }: { pageParam: string }) => {
		const limit = 8;
		const cursor = pageParam.replace("lastPublishedAt=", ",").split(",")[0];
		const lastPublishedAt = pageParam.replace("lastPublishedAt=", ",").split(",")[1];

		let videos: VideoTypes[] = [];

		if (cursor && lastPublishedAt) {
			const query = `*[_type == "videos" && !(_id in path("drafts.**")) && (
                publishedAt < $lastPublishedAt
                || (publishedAt == $lastPublishedAt && _id > $cursor)
                )] | order(publishedAt desc) [0...${limit}] {
                _id,
				_createdAt,
				publishedAt,
				title, 
				description, 
				"slug": slug.current, 
				"thumbnail": thumbnail.asset->url, 
				"altText": thumbnail.alt,
				duration,
				embedUrl
            }`;

			const res = await axios.post(
				`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
				{
					query,
					params: {
						cursor,
						lastPublishedAt,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
						"Content-Type": "application/json",
					},
				},
			);

			const data = res.data;
			videos = data.result;
		} else {
			const initialLimit = limit;
			const query = `*[_type == "videos" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...${initialLimit}] {
                _id,
				_createdAt,
				publishedAt,
				title, 
				description, 
				"slug": slug.current, 
				"thumbnail": thumbnail.asset->url, 
				"altText": thumbnail.alt,
				duration,
				embedUrl
            }`;

			const res = await axios.post(
				`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
				{
					query,
				},
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
						"Content-Type": "application/json",
					},
				},
			);

			const data = res.data;
			videos = data.result;
		}

		let nextCursor = null;

		if (videos.length === limit) {
			nextCursor = videos[limit - 1]._id + `lastPublishedAt=${videos[limit - 1].publishedAt}`;
		}

		return {
			videos,
			nextCursor,
		};
	};

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, refetch } =
		useInfiniteQuery({
			queryKey: ["infinite_video_news"],
			queryFn: fetchData,
			initialPageParam: "",
			getNextPageParam: (lastPage) => lastPage?.nextCursor,
		});

	return (
		<section className="flex flex-col sm:px-12 py-16">
			<h2 className="text-3xl mb-10 max-sm:px-6 tracking-[.009rem] text-brand font-anton text-[36px] leading-[1.1em] font-normal uppercase">
				Videos
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{status === "pending" && (
					<React.Fragment>
						{Array.from({ length: 8 }).map((_, index) => (
							<NewsSkeleton key={index} />
						))}
					</React.Fragment>
				)}

				{data?.pages?.map((group, i) => (
					<React.Fragment key={i}>
						{group?.videos?.map((item: VideoTypes, index: number) => (
							<Link
								key={index}
								title={item?.title}
								href={`/news/videos/${item?.slug}`}
								className="cols-span-1 gap-2 w-full">
								<section className="flex flex-col items-end gap-4">
									<section className="relative">
                                        <section className="aspect-video">
                                            <img
											src={item?.thumbnail}
											alt={item?.altText || "Video Thumbnail"}
											sizes="(min-width: 768px) 50vw, (min-width: 1024px) 25vw, 100vw"
											className="rounded-none bg-muted object-cover aspect-[16/9] w-full"
										/>
                                        </section>
										

										<Button
											variant={"default"}
											className="text-base !px-4 py-3 h-auto font-azeret-mono text-[0.75rem] tracking-[2.4px] uppercase absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 bg-black cursor-pointer">
											Watch
										</Button>
									</section>

									<section className="flex flex-col gap-2 w-fit">
										<section className="flex gap-2 items-center">
											<p className="text-xs text-muted-foreground font-medium uppercase font-azeret-mono">
												Afia News -
											</p>
											<p className="text-xs text-muted-foreground font-medium inline-flex uppercase font-azeret-mono">
												{formatDate(item?._createdAt)}
											</p>
										</section>

										<p className="font-anton uppercase text-[24px] leading-[140%] tracking-normal mt-1 mb-2 line-clamp-2">
											{item?.title}
										</p>

										<p className="text-sm font-outfit text-muted-foreground line-clamp-2">
											{item?.description}
										</p>
									</section>
								</section>
							</Link>
						))}
					</React.Fragment>
				))}
			</div>

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
		</section>
	);
};

export default VideosPage;
