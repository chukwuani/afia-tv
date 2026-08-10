import { Metadata } from "next";
import axios from "axios";

import PostSlug from "@/components/post-slug";
import { absoluteUrl } from "@/lib/utils";
import { NewsTypes } from "@/types";

interface PageProps {
	params: Promise<{ slug: string }>;
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
	const query = `*[_type == "news" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...150] {
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
	const posts: NewsTypes[] = data.result;

	return posts.map((post) => ({
		slug: post.slug.split("/"),
	}));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;

	const query = `*[_type == "news" && !(_id in path("drafts.**")) && slug.current == $slug][0]{
	  _id,
	  _createdAt,
	  title,  
	  tags,
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

	const news: NewsTypes = data.result;
	if (!news) {
		return {};
	}

	const url = process.env.NEXT_PUBLIC_APP_URL!;
	const tags = news.tags ? news.tags.split(",").map((tag) => tag.trim()) : [];

	return {
		metadataBase: new URL(url),
		title: news.title,
		description: news.description,
		authors: { name: news.author.name },
		alternates: { canonical: absoluteUrl(`/news/${news.slug}`) },
		openGraph: {
			type: "article",
			authors: [news.author.name],
			title: news.title,
			description: news.description,
			url: absoluteUrl(`/news/${news.slug}`),
			images: [news.mainImage],
		},
		twitter: {
			card: "summary_large_image",
			title: news.title,
			description: news.description,
			images: [news.mainImage],
		},
		keywords: ["news", "articles", "latest news", "breaking news", news.title, ...tags],
	};
}

export default function PostPage() {
	return <PostSlug />;
}
