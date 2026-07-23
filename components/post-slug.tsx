"use client";

import { notFound } from "next/navigation";

import { formatDate } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";
import { Shell } from "@/components/shell";
import { components } from "@/components/portable-component";

import { PortableText } from "@portabletext/react";
import { NewsTypes } from "@/types";
import Share from "@/components/share";
import axios from "axios";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PostLoading from "@/components/skeletons/post-loading";
import ArticleFollow from "@/components/article-follow";
import RelatedArticles from "@/components/related-articles";

function PostSlug() {
	const params = useParams();
	const slug = params.slug as string[];

	const { isPending, data } = useQuery<NewsTypes>({
		queryKey: [`news-${slug}`],
		queryFn: async () => {
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
    "imageUrl": image.asset->url,
	"slug": slug.current
  },
  readingTime,
  publishedAt
    		}`;

			const res = await axios.post(
				`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
				{
					query,
					params: {
						slug: slug.length > 1 ? `${slug[0]}/${slug[1]}` : slug[0],
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
			return data.result;
		},
	});

	const news = data;

	if (isPending) {
		return <PostLoading />;
	}

	if (!news) {
		notFound();
	}

	const author = news.author;
	const content = news.body;

	console.log(slug);

	return (
		<>
			<Shell as="article" variant="content">
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
								<p className="font-medium uppercase font-azeret-mono">{author.name}</p>

								<div className="flex items-center space-x-2 text-xs text-muted-foreground uppercase font-azeret-mono">
									<time dateTime={""}>{formatDate(news.publishedAt)}</time>

									<div>•</div>

									<div>{news.readingTime}min</div>
								</div>
							</div>
						</section>
					</div>
				</div>

				<Share title={news.title} />
			</Shell>

			<section className="w-auto h-auto lg:h-[540px] lg:w-[976px] mx-auto">
				<img
					src={news.mainImage}
					alt={news.altText}
					sizes="(min-width: 976px) 976px, 100vw"
					className="rounded-none bg-muted object-cover w-full h-full aspect-[16/11] lg:aspect-auto"
					width="960"
					height="540"
				/>
			</section>

			<Shell as="article" variant="content">
				<section>
					<PortableText value={content} components={components} />
				</section>

				<ArticleFollow />

				<Separator className="my-2" />
			</Shell>

			<RelatedArticles currentSlug={slug.length > 1 ? `${slug[0]}/${slug[1]}` : slug[0]} />
		</>
	);
}

export default PostSlug;
