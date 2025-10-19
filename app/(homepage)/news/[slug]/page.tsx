import { notFound } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

import { cn, formatDate } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Shell } from "@/components/shell";
import { components } from "@/components/portable-component";

import { PortableText } from "@portabletext/react";
import { NewsTypes } from "@/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Share from "@/components/share";
import axios from "axios";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
	const query = `*[_type == "news"] | order(publishedAt desc) [0...10] {
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
	const posts: NewsTypes[] = data.result;

	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	const query = `*[_type == "news" && slug.current == $slug][0]{
  _id,
  _createdAt,
  title,  
  "slug": slug.current, 
  "mainImage": mainImage.asset->url, 
  "altText": mainImage.alt,
  body, 
  author->{
    name,
    "imageUrl": image.asset->url
  },
  readingTime,
  publishedAt
    }`;

	const data = await axios.post(
		`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
		{
			query,
			params: {
				slug: slug.replace("/", ""),
			},
		},
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
				"Content-Type": "application/json",
			},
		}
	);

	const news: NewsTypes = data.data.result;

	if (!news) {
		notFound();
	}

	const author = news.author;
	const content = news.body;

	return (
		<Shell as="article" variant="content">
			<Link
				href="/news"
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute left-[-200px] top-14 hidden xl:inline-flex"
				)}>
				<ChevronLeftIcon className="mr-2 size-4" aria-hidden="true" />
				See all news
			</Link>

			<div className="space-y-2">
				<h1 className="inline-block text-[36px] lg:text-[68px] font-normal tracking-[-1px] leading-[110%] font-anton">
					{news.title}
				</h1>

				<div className="flex items-center space-x-4 pt-4">
					<section className="flex items-center space-x-2 text-sm">
						<img
							src={author.imageUrl}
							alt={author.name}
							width={40}
							height={40}
							className="rounded-full size-10 object-cover"
						/>
						<div className="flex-1 text-left leading-tight">
							<p className="font-medium">{author.name}</p>

							<div className="flex items-center space-x-2 text-xs text-muted-foreground">
								<time dateTime={""}>{formatDate(news.publishedAt)}</time>

								<div>•</div>

								<div>{news.readingTime}min</div>
							</div>
						</div>
					</section>
				</div>
			</div>

			<img
				src={news.mainImage}
				alt={news.altText}
				sizes="(min-width: 768px) 50vw, (min-width: 1024px) 25vw, 100vw"
				className="rounded-md bg-muted object-cover aspect-[16/11] w-full"
			/>

			<PortableText value={content} components={components} />

			<Share title={news.title} />

			<Separator className="my-4" />

			<Link
				href="/news"
				className={cn(buttonVariants({ variant: "ghost", className: "mx-auto mt-4 w-fit" }))}>
				<ChevronLeftIcon className="mr-2 size-4" aria-hidden="true" />
				See all posts
				<span className="sr-only">See all posts</span>
			</Link>
		</Shell>
	);
}
