"use client";

import Link from "next/link";

import { cn, formatDate } from "@/lib/utils";
import { NewsTypes, VideoTypes } from "@/types";

import axios from "axios";
import React from "react";
import { RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Button, buttonVariants } from "@/components/ui/button";
import NewsSkeleton from "@/components/skeletons/news-skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const VideoFeedSection = ({layout = "default"}: {layout?: "default" | "secondary"}) => {
	const { isPending, isError, data, refetch } = useQuery<VideoTypes[]>({
		queryKey: ["video-feed-section"],
		queryFn: async () => {
			const limit = 4;
			const query = `*[_type == "videos" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...${limit}] {
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
			return data.result;
		},
	});

	return (
		<Card className="flex flex-col overflow-hidden border-none bg-background rounded-none shadow-none pt-20 px-6 md:px-10 lg:px-12 pb-10">
			{/* Section header */}
			<section className="flex justify-between items-center gap-10">
                {layout === "default" ? 
                  <CardHeader className="px-0">
					<CardTitle className="text-brand font-anton text-[36px] md:text-[50px] leading-[1.1em] font-normal tracking-[.5px] mb-2 uppercase">
						Video Feed
					</CardTitle>
					<CardDescription className="font-outfit text-muted-foreground text-sm md:text-base max-w-[480px]">
						Watch the latest videos from our newsroom, covering breaking news and in-depth
						interviews.
					</CardDescription>
				</CardHeader>  :
                <h2 className="text-3xl mb-10 tracking-[.009rem] text-brand font-anton text-[36px] leading-[1.1em] font-normal uppercase">
					Video Feed
				</h2>
                }
				
                {layout === "default" && 
                  <Link
					href="/news/videos"
					className={cn(
						buttonVariants({ variant: "outline" }),
						"hidden md:flex text-[0.75rem] tracking-[2.4px] uppercase",
					)}>
					View All
				</Link>  
                }
				
			</section>

			{/* Main Section for duplication */}
			<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full px-0">
				{isPending && (
					<React.Fragment>
						{Array.from({ length: 4 }).map((_, index) => (
							<NewsSkeleton key={index} />
						))}
					</React.Fragment>
				)}

				{data?.map((item, index) => (
					<Link
						key={index}
						title={item?.title}
						href={`/news/videos/${item?.slug}`}
						className="cols-span-1 gap-2 w-full">
						<section className="flex flex-col items-end gap-4">
							<section className="relative">
								<img
									src={item?.thumbnail}
									alt={item?.altText || "Video Thumbnail"}
									sizes="(min-width: 768px) 50vw, (min-width: 1024px) 25vw, 100vw"
									className="rounded-none bg-muted object-cover aspect-[16/9] w-full"
								/>

								

                                <Button
						variant={"default"}
						className=
							"text-base !px-4 py-3 h-auto font-azeret-mono text-[0.75rem] tracking-[2.4px] uppercase absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 bg-black cursor-pointer">
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
			</CardContent>

			{isError ? (
				<Button
					onClick={() => refetch()}
					variant={"outline"}
					size={"lg"}
					className="flex mx-auto text-[0.75rem] tracking-[2.4px] uppercase">
					Refresh Feed <RefreshCw className="size-5" />
				</Button>
			) : (
				<Link
					href="/news/videos"
					className={cn(
						buttonVariants({ variant: "outline", size: "lg" }),
						"flex md:hidden mx-auto text-[0.75rem] tracking-[2.4px] uppercase",
                        layout === "secondary" && "mt-5 md:flex"
					)}>
					View All
				</Link>
			)}
		</Card>
	);
};

export default VideoFeedSection;
