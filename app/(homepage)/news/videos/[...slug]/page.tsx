import { Metadata } from "next";
import axios from "axios";

import { absoluteUrl } from "@/lib/utils";
import { VideoTypes } from "@/types";
import VideoFeed from "@/components/video-feed";

interface PageProps {
	params: Promise<{ slug: string[] }>;
}

// Pre-render the most recent 150 video pages at build time
export async function generateStaticParams() {
	const query = `*[_type == "videos" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...150] {
		"slug": slug.current
	}`;

	const res = await axios.post(
		`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
		{ query },
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
				"Content-Type": "application/json",
			},
		}
	);

	const videos: Pick<VideoTypes, "slug">[] = res.data.result;

	return videos.map((video) => ({
		slug: video.slug.split("/"), // [...slug] catch-all requires an array
	}));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;

	// [...slug] gives an array — join back to a string for the Sanity query
	const slugString = slug.join("/");

	const query = `*[_type == "videos" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
		_id,
		publishedAt,
		title,
		description,
		"slug": slug.current,
		"thumbnail": thumbnail.asset->url,
		"altText": thumbnail.alt,
		embedUrl
	}`;

	const res = await axios.post(
		`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
		{
			query,
			params: { slug: slugString },
		},
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
				"Content-Type": "application/json",
			},
		}
	);

	const video: VideoTypes = res.data.result;

	if (!video) return {};

	const url = process.env.NEXT_PUBLIC_APP_URL!;

	return {
		metadataBase: new URL(url),
		title: video.title,
		description: video.description,
		openGraph: {
			title: video.title,
			description: video.description,
			url: absoluteUrl(`/news/video/${video.slug}`),
			images: [{ url: video.thumbnail, alt: video.altText ?? video.title }],
			type: "video.other",
		},
		twitter: {
			card: "summary_large_image",
			title: video.title,
			description: video.description,
			images: [video.thumbnail],
		},
		keywords: ["video", "news", "watch", "Afia News", video.title],
	};
}

export default function VideoSlugPage() {
	return <VideoFeed />;
}