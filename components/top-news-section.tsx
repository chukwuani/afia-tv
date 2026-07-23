"use client";

import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { NewsTypes } from "@/types";

import axios from "axios";
import React from "react";
import { RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import NewsSkeleton from "@/components/skeletons/news-skeleton";

function TopNewsSection() {
	const { isPending, isError, data, refetch } = useQuery<NewsTypes[]>({
		queryKey: ["top-news-section"],
		queryFn: async () => {
			const limit = 4;
			const query = `*[_type == "news" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...${limit}] {
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
		<section>
			<>
				{isPending ? (
					<section className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 sm:px-12 py-10">
						{Array.from({ length: 3 }).map((_, index) => (
							<NewsSkeleton key={index} />
						))}
					</section>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:px-12 py-10">
						<section className="md:col-span-2">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								{data?.slice(0, 2).map((item) => (
									<Link
										key={item._id}
										title={item.title}
										href={`/news/${item.slug}`}
										className="group cols-span-1 gap-2 w-full">
										<div key={item._id} className="flex flex-col">
											<img
												src={item.mainImage}
												alt={item.altText || "News Image"}
												sizes="(min-width: 768px) 50vw, (min-width: 1024px) 25vw, 100vw"
												className="rounded-none bg-muted object-cover aspect-[16/9] w-auto max-sm:mx-4 mb-4"
											/>

											<section className="max-sm:px-4">
												<section className="flex gap-2 items-center mb-2">
													<p className="text-xs text-muted-foreground font-medium uppercase font-azeret-mono">
														By {item.author?.name} -{" "}
													</p>
													<p className="text-xs text-muted-foreground font-medium inline-flex uppercase font-azeret-mono">
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
										</div>
									</Link>
								))}
							</div>
						</section>

						<section className="md:col-span-1">
							<div className="grid grid-cols-1 gap-8 max-sm:px-4">
								{data?.slice(2, 4).map((item) => (
									<Link
										key={item._id}
										title={item.title}
										href={`/news/${item.slug}`}
										className="group cols-span-1 gap-2 w-full">
										<section className="flex flex-col">
											<h3 className="font-anton uppercase text-[24px] sm:text-[28px] leading-[140%] tracking-normal mt-1 mb-3 line-clamp-2 transition-colors group-hover:text-brand">
												{item.title}
											</h3>

											<p className="text-sm font-outfit text-muted-foreground mb-4 line-clamp-3">
												{item.description}
											</p>

											<section className="flex gap-2 items-center">
												<p className="text-xs text-muted-foreground font-medium uppercase font-azeret-mono">
													By {item.author?.name} -{" "}
												</p>
												<p className="text-xs text-muted-foreground font-medium inline-flex uppercase font-azeret-mono">
													{formatDate(item.publishedAt)}
												</p>
											</section>
										</section>
									</Link>
								))}
							</div>
						</section>
					</div>
				)}
			</>

			{isError && (
				<Button
					onClick={() => refetch()}
					variant={"outline"}
					size={"lg"}
					className="flex mx-auto rounded text-[0.75rem] tracking-[2.4px] uppercase font-outfit">
					Refresh Feed <RefreshCw className="size-5" />
				</Button>
			)}
		</section>
	);
}

export default TopNewsSection;
