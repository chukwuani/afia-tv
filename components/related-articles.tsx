"use client";

import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { NewsTypes } from "@/types";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { RefreshCw } from "lucide-react";

import NewsSkeleton from "@/components/skeletons/news-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RelatedArticles({ currentSlug }: { currentSlug: string }) {
	const { isPending, isError, data, refetch } = useQuery<NewsTypes[]>({
		queryKey: ["relatedNews", currentSlug],
		queryFn: async () => {
			const limit = 3;
			const query = `*[_type == "news" && slug.current == $currentSlug && !(_id in path("drafts.**"))][0]{
                "cat": category
            }{
                "related": *[
                    _type == "news" &&
                    slug.current != $currentSlug &&
                    category == ^.cat &&
                    !(_id in path("drafts.**"))
                ] | order(publishedAt desc) [0...${limit}] {
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
                },
                "fallback": *[
                    _type == "news" &&
                    slug.current != $currentSlug &&
                    !(_id in path("drafts.**"))
                ] | order(publishedAt desc) [0...${limit}] {
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
                }
            }`;

			const res = await axios.post(
				`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
				{
					query,
					params: { currentSlug },
				},
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
						"Content-Type": "application/json",
					},
				},
			);

			const data = res.data;
			const { related, fallback } = data.result;
			return related?.length ? related : fallback;
		},
		enabled: !!currentSlug,
	});

	return (
		<Card className="flex flex-col overflow-hidden border-none bg-background rounded-none shadow-none px-4 md:px-10 lg:px-12 pb-10">
			<CardTitle className="text-3xl mb-8 tracking-[.009rem] text-brand font-anton text-[36px] leading-[1.1em] font-normal uppercase">
				Related Stories
			</CardTitle>

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
								className="rounded-none bg-muted object-cover aspect-[14/9] w-full"
							/>

							<section className="flex flex-col gap-2 w-fit">
								<section className="flex gap-2 items-center">
									<p className="text-xs text-muted-foreground font-medium uppercase font-azeret-mono">
										By {item?.author?.name} -{" "}
									</p>
									<p className="text-xs text-muted-foreground font-medium inline-flex uppercase font-azeret-mono">
										{formatDate(item?._createdAt)}
									</p>
								</section>

								<p className="font-anton uppercase text-[24px] leading-[140%] tracking-normal mt-1 mb-2 line-clamp-2 transition-colors group-hover:text-brand">
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

			{isError && (
				<Button
					onClick={() => refetch()}
					variant={"outline"}
					size={"lg"}
					className="flex mx-auto text-[0.75rem] tracking-[2.4px] uppercase">
					Refresh Feed <RefreshCw className="size-5" />
				</Button>
			)}
		</Card>
	);
}
