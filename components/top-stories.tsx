"use client";

import Link from "next/link";

import { cn, formatDate } from "@/lib/utils";
import { NewsTypes } from "@/types";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { RefreshCw } from "lucide-react";

import NewsSkeleton from "@/components/skeletons/news-skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

export default function TopStories() {
	const { isPending, isError, data, refetch } = useQuery<NewsTypes[]>({
		queryKey: ["news"],
		queryFn: async () => {
			const limit = 3;
			const query = `*[_type == "news"  && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...${limit}] {
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
				}
			);

			const data = res.data;
			return data.result;
		},
	});

	return (
		<Card className="flex flex-col gap-5 overflow-hidden border-none bg-background rounded-none shadow-none pt-20 px-6 md:px-10 lg:px-12 pb-10">
			{/* Section header */}
			<section className="flex justify-between items-center gap-10">
				<CardHeader className="px-0">
					<CardTitle className="text-brand font-anton text-[36px] md:text-[50px] leading-[1.1em] font-normal tracking-[.5px] mb-2 uppercase">
						Top Stories
					</CardTitle>
					<CardDescription className="font-dm-sans text-muted-foreground text-sm md:text-base max-w-[480px]">
						Discover the hottest trends, breaking news, and exclusive stories from Nigeria and across the globe.
					</CardDescription>
				</CardHeader>

				<Link
					href="/news"
					className={cn(
						buttonVariants({ variant: "outline" }),
						"hidden md:flex rounded-full text-[0.75rem] tracking-[2.4px] uppercase font-dm-sans"
					)}>
					View All
				</Link>
			</section>

			{/* Main Section for duplication */}
			<CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full px-0">
				{isPending && (
					<React.Fragment>
						{Array.from({ length: 3 }).map((_, index) => (
							<NewsSkeleton key={index} />
						))}
					</React.Fragment>
				)}

				{data?.map((item, index) => (
					<Link
						key={index}
						title={item?.title}
						href={`/news/${item?.slug}`}
						className="group cols-span-1 gap-2 w-full">
						<section className="flex flex-col items-end gap-4">
							<img
								src={item?.mainImage}
								alt={item?.altText || "News Image"}
								sizes="(min-width: 768px) 50vw, (min-width: 1024px) 25vw, 100vw"
								className="rounded-md bg-muted object-cover aspect-[14/9] w-full"
							/>

							<section className="flex flex-col gap-2 w-fit">
								<section className="flex gap-2 items-center">
									<p className="text-xs text-muted-foreground font-medium capitalize">
										By {item?.author?.name} -{" "}
									</p>
									<p className="text-xs text-muted-foreground font-medium inline-flex capitalize">
										{formatDate(item?._createdAt)}
									</p>
								</section>

								<p className="font-anton uppercase text-[24px] leading-[140%] tracking-normal mt-1 mb-2 line-clamp-2 transition-colors group-hover:text-brand">
									{item?.title}
								</p>

								<p className="text-sm font-dm-sans text-muted-foreground line-clamp-2">
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
					className="flex mx-auto rounded-full text-[0.75rem] tracking-[2.4px] uppercase font-dm-sans">
					Refresh Feed <RefreshCw className="size-5" />
				</Button>
			) : (
				<Link
					href="/news"
					className={cn(
						buttonVariants({ variant: "outline", size: "lg" }),
						"flex md:hidden mx-auto rounded-full text-[0.75rem] tracking-[2.4px] uppercase font-dm-sans"
					)}>
					View All
				</Link>
			)}
		</Card>
	);
}
