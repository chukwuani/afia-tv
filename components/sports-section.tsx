"use client";

import Link from "next/link";

import { cn, formatDate } from "@/lib/utils";
import { NewsTypes } from "@/types";

import axios from "axios";
import React from "react";
import { RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Button, buttonVariants } from "@/components/ui/button";
import NewsSkeleton from "@/components/skeletons/news-skeleton";

const SportsSection = () => {
	const { isPending, isError, data, refetch } = useQuery<NewsTypes[]>({
		queryKey: ["sports-section"],
		queryFn: async () => {
			const limit = 3;
			const query = `*[_type == "news" && featured != true && recommended != true && category == "sports"] | order(publishedAt desc) [0...${limit}] {
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
				},
			);

			const data = res.data;
			return data.result;
		},
	});

	return (
		<section className="flex flex-col sm:px-12 py-16 border-t">
			<h2 className="text-3xl mb-10 max-sm:px-6 tracking-[.009rem] text-brand font-anton text-[36px] leading-[1.1em] font-normal uppercase">
				Sports
			</h2>

			{isPending && (
				<section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-sm:px-6">
					{Array.from({ length: 3 }).map((_, index) => (
						<NewsSkeleton key={index} />
					))}
				</section>
			)}

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{data?.map((item) => (
					<Link
						key={item._id}
						title={item.title}
						href={`/news/${item.slug}`}
						className="group flex flex-col">
						<img
							src={item.mainImage}
							alt={item.altText || "News Image"}
							sizes="(min-width: 768px) 50vw, (min-width: 1024px) 25vw, 100vw"
							className="rounded-none bg-muted object-cover aspect-[16/9] w-auto max-sm:mx-6 mb-4"
						/>

						<section className="max-sm:px-6">
							<section className="flex gap-2 items-center mb-2">
								<p className="text-xs text-muted-foreground font-medium uppercase font-jetbrains-mono">
									By {item.author?.name} -{" "}
								</p>
								<p className="text-xs text-muted-foreground font-medium inline-flex uppercase font-jetbrains-mono">
									{formatDate(item.publishedAt)}
								</p>
							</section>

							<h3 className="font-anton uppercase text-[24px] sm:text-[28px] leading-[140%] tracking-normal mt-1 mb-3 line-clamp-2 transition-colors group-hover:text-brand">
								{item.title}
							</h3>
							<p className="text-sm font-outfit text-muted-foreground mb-4 line-clamp-2">
								{item.description}
							</p>
						</section>
					</Link>
				))}
			</div>

			{isError ? (
				<Button
					onClick={() => refetch()}
					variant={"outline"}
					size={"lg"}
					className="flex mx-auto rounded text-[0.75rem] tracking-[2.4px] uppercase">
					Refresh Feed <RefreshCw className="size-5" />
				</Button>
			) : (
				<Link
					href="/news/sports"
					className={cn(
						buttonVariants({ variant: "outline", size: "lg" }),
						"flex mx-auto rounded text-[0.75rem] tracking-[2.4px] uppercase w-fit mt-5",
					)}>
					View All Sports
				</Link>
			)}
		</section>
	);
};

export default SportsSection;
