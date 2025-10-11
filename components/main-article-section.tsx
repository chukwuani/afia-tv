"use client";

import { formatDate } from "@/lib/utils";
import { NewsTypes } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import NewsSkeleton from "./skeletons/news-skeleton";
import Link from "next/link";

export default function MainArticleSection() {
	const { isPending, isError, data } = useQuery<NewsTypes[]>({
		queryKey: ["news"],
		queryFn: async () => {
			const limit = 4;
			const query = `*[_type == "news"] | order(publishedAt desc) [0...${limit}] {
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
		<section className="flex flex-col items-center justify-center pt-32 px-6 md:px-10 lg:px-12 w-full">
			{/* Section header */}
			<header className="flex flex-col items-center justify-center gap-[18px] max-w-[650px] w-full mb-18">
				<h1
					className="text-pretty text-[2.5rem] leading-[4rem] -tracking-[.053rem] lg:text-[4rem] lg:leading-[5rem] lg:-tracking-[.078rem] text-center font-epilogue font-normal mx-auto
            ">
					Featured Stories
				</h1>
			</header>

			{/* Main Section for duplication */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
				{isError && (
					<React.Fragment>
						{Array.from({ length: 3 }).map((_, index) => (
							<NewsSkeleton key={index} />
						))}
					</React.Fragment>
				)}

				{isPending && (
					<React.Fragment>
						{Array.from({ length: 3 }).map((_, index) => (
							<NewsSkeleton key={index} />
						))}
					</React.Fragment>
				)}

				<section className="md:col-span-2">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Blog Post 1 & 2 */}
						{data &&
							data.length > 0 &&
							data.slice(0, 2).map((post) => (
								<Link
									key={post._id}
									title={post.title}
									href={`/news/${post.slug}`}
									className="group flex flex-col-reverse lg:flex-col">
									<img
										src={post.mainImage}
										alt={post.altText}
										className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
									/>

									<section className="max-sm:px-3">
										<p className="text-muted-foreground font-epilogue text-sm mb-2">
											{formatDate(post.publishedAt)}
										</p>
										<h4 className="text-2xl font-dm-sans mb-3 line-clamp-2 transition-colors group-hover:text-brand">
											{post.title}
										</h4>
										<p className="text-sm leading-7 tracking-wide font-epilogue text-muted-foreground mb-4 line-clamp-3">
											{post.description}
										</p>
									</section>
								</Link>
							))}
					</div>
				</section>

				<section className="md:col-span-1 max-lg:pt-0">
					<div className="grid grid-cols-1 gap-8">
						{/* Blog Post 3 & 4 */}
						{data &&
							data.length > 0 &&
							data.slice(2).map((post) => (
								<Link
									key={post._id}
									title={post.title}
									href={`/news/${post.slug}`}
									className="group flex flex-col">
									<p className="text-muted-foreground font-epilogue text-sm mb-2">
										{formatDate(post.publishedAt)}
									</p>
									<h4 className="text-2xl font-dm-sans mb-3 line-clamp-2 transition-colors group-hover:text-brand">
										{post.title}
									</h4>
									<p className="text-sm leading-7 tracking-wide font-epilogue text-muted-foreground mb-4 line-clamp-3">
										{post.description}
									</p>
								</Link>
							))}
					</div>
				</section>
			</div>
		</section>
	);
}
