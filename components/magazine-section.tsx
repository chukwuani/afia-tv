"use client";

import React from "react";
import Link from "next/link";

import { cn, formatDate } from "@/lib/utils";
import { NewsTypes } from "@/types";

import axios from "axios";
import { RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Button, buttonVariants } from "@/components/ui/button";
import NewsSkeleton from "@/components/skeletons/news-skeleton";

export default function MagazineSection() {
	const { isPending, isError, data, refetch } = useQuery<NewsTypes[]>({
		queryKey: ["recommended-section"],
		queryFn: async () => {
			const limit = 4;
			const query = `*[_type == "news" && recommended == true] | order(publishedAt desc) [0...${limit}] {
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

	const {
		isPending: featuresPending,
		isError: featuresError,
		data: features,
		refetch: refetchFeatures,
	} = useQuery<NewsTypes[]>({
		queryKey: ["featured-section"],
		queryFn: async () => {
			const limit = 4;
			const query = `*[_type == "news" && featured == true] | order(publishedAt desc) [0...${limit}] {
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
		<div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16 sm:px-12">
			<section className="py-10 lg:col-span-2">
				<h2 className="text-3xl mb-10 max-sm:px-6 tracking-[.009rem] text-brand font-anton text-[36px] leading-[1.1em] font-normal uppercase">
					Recommended
				</h2>

				{isPending && (
						<section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-sm:px-6">
							{Array.from({ length: 4 }).map((_, index) => (
								<NewsSkeleton key={index} />
							))}
						</section>
					)}
				
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
								className="rounded-md bg-muted object-cover aspect-[16/9] w-auto max-sm:mx-6 mb-4"
							/>

							<section className="max-sm:px-6">
								<section className="flex gap-2 items-center mb-2">
									<p className="text-xs text-muted-foreground font-medium capitalize">
										By {item.author?.name} -{" "}
									</p>
									<p className="text-xs text-muted-foreground font-medium inline-flex capitalize">
										{formatDate(item.publishedAt)}
									</p>
								</section>

								<h3 className="font-anton uppercase text-[24px] sm:text-[28px] leading-[140%] tracking-normal mt-1 mb-3 line-clamp-2 transition-colors group-hover:text-brand">
									{item.title}
								</h3>
								<p className="text-sm font-dm-sans text-muted-foreground mb-4 line-clamp-2">
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
						className="flex mx-auto rounded-full text-[0.75rem] tracking-[2.4px] uppercase font-dm-sans">
						Refresh Feed <RefreshCw className="size-5" />
					</Button>
				) : (
					<Link
						href="/news/recommended"
						className={cn(
							buttonVariants({ variant: "outline", size: "lg" }),
							"flex mx-auto rounded-full text-[0.75rem] tracking-[2.4px] uppercase font-dm-sans w-fit mt-5"
						)}>
						View All Recommended
					</Link>
				)}
			</section>

			<section className="py-10 lg:col-span-1">
				<h2 className="text-3xl mb-10 max-sm:px-6 tracking-[.009rem] text-brand font-anton text-[36px] leading-[1.1em] font-normal uppercase">
					Features
				</h2>

				<div className="grid grid-cols-1 gap-8 max-sm:px-6">
					{featuresPending && (
						<React.Fragment>
							{Array.from({ length: 2 }).map((_, index) => (
								<NewsSkeleton key={index} />
							))}
						</React.Fragment>
					)}

					{features?.map((item) => (
						<Link key={item._id} title={item.title} href={`/news/${item.slug}`} className="group">
							<section className="flex gap-2 items-center mb-2">
								<p className="text-xs text-muted-foreground font-medium capitalize">
									By {item.author?.name} -{" "}
								</p>
								<p className="text-xs text-muted-foreground font-medium inline-flex capitalize">
									{formatDate(item.publishedAt)}
								</p>
							</section>

							<h3 className="font-anton uppercase text-[24px] sm:text-[28px] leading-[140%] tracking-normal mt-1 mb-3 line-clamp-2 transition-colors group-hover:text-brand">
								{item.title}
							</h3>
							<p className="text-sm font-epilogue text-muted-foreground mb-4 line-clamp-3">
								{item.description}
							</p>

							
						</Link>
					))}
				</div>

				{featuresError ? (
					<Button
						onClick={() => refetchFeatures()}
						variant={"outline"}
						size={"lg"}
						className="flex mx-auto rounded-full text-[0.75rem] tracking-[2.4px] uppercase font-dm-sans">
						Refresh Feed <RefreshCw className="size-5" />
					</Button>
				) : (
					<Link
						href="/news/featured"
						className={cn(
							buttonVariants({ variant: "outline", size: "lg" }),
							"flex mx-auto rounded-full text-[0.75rem] tracking-[2.4px] uppercase font-dm-sans w-fit mt-5"
						)}>
						View All Features
					</Link>
				)}
			</section>
		</div>
	);
}
