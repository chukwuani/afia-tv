"use client";

import { formatDate } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import usePaginationQuery from "@/hooks/use-pagination-query";
import { VideoTypes } from "@/types";

// Fetch the main video from Sanity by slug
const fetchVideoBySlug = async (slug: string): Promise<VideoTypes> => {
	const query = `*[_type == "videos" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
		_id,
		_createdAt,
		publishedAt,
		title,
		description,
		"slug": slug.current,
		"thumbnail": thumbnail.asset->url,
		"altText": thumbnail.alt,
		duration,
		embedUrl
	}`;

	const res = await axios.post(
		`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
		{ query, params: { slug } },
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
				"Content-Type": "application/json",
			},
		}
	);

	return res.data.result;
};

export default function VideoFeed() {
	const params = useParams();

	// Extract slug from /news/video/[slug]
	const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug ?? "");

	// Fetch main video by slug
	const {
		data: mainVideo,
		status: mainStatus,
	} = useQuery({
		queryKey: ["main-video", slug],
		queryFn: () => fetchVideoBySlug(slug),
		enabled: !!slug,
		staleTime: 5 * 60 * 1000,
	});

	// Fetch 3 additional videos, excluding the main video.
	// Passing null defers the query until mainVideo._id is resolved.
	const {
		videos: additionalVideos,
		currentPage,
		hasNextPage,
		hasPrevPage,
		isFetching,
		goToNextPage,
		goToPrevPage,
		status: additionalStatus,
		refetch,
	} = usePaginationQuery("/api/videos", "videos-pagination", 0, {
		limit: 3,
		excludeId: mainVideo?._id ?? null,
	});

		const previousPage = useRef(currentPage);

	// Smooth scroll to section on page change
	useEffect(() => {
		if (previousPage.current !== currentPage) {
			// Commenting the line below stops the next btn from bugging out
			// document.getElementById("videos")?.scrollIntoView({ behavior: "smooth" });
			previousPage.current = currentPage;
		}
	}, [currentPage]);


	// Format YouTube short URL → embed URL
	const formatEmbedUrl = (url: string) => {
		const urlObj = new URL(url);
		const videoId = urlObj.pathname.split("/").pop();
		return `https://www.youtube.com/embed/${videoId}`;
	};

	return (
		<section id="videos" className="flex flex-col pb-10">

			{/* ── Main Video ── */}
			<div className="flex items-center justify-center gap-6 place-content-center sm:px-12">
				<section className="py-10 max-w-[1000px] w-full">

					{mainStatus === "pending" && <MainVideoSkeleton />}

					{mainStatus === "error" && (
						<p className="text-sm text-muted-foreground text-center py-10">
							Could not load the video. Please try again.
						</p>
					)}

					{mainStatus === "success" && mainVideo && (
						<div key={mainVideo._id} className="flex flex-col">
							<section className="w-full aspect-video object-cover mb-6 bg-muted">
								<iframe
									width="100%"
									height="100%"
									src={formatEmbedUrl(mainVideo.embedUrl)}
									title="YouTube video player"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									referrerPolicy="strict-origin-when-cross-origin"
									allowFullScreen
								/>
							</section>

							<section className="max-sm:px-6 px-7 pl-0">
								<section className="flex gap-1 items-center mb-2">
									<p className="text-xs text-muted-foreground font-medium uppercase font-azeret-mono">
										Afia News -
									</p>
									<p className="text-xs text-muted-foreground font-medium inline-flex uppercase font-azeret-mono">
										{formatDate(mainVideo.publishedAt)}
									</p>
								</section>
								<h3 className="font-anton uppercase text-[24px] sm:text-[28px] md:text-[32px] leading-[140%] tracking-normal mt-1 mb-3 line-clamp-2">
									{mainVideo.title}
								</h3>
								<p className="text-sm font-epilogue text-muted-foreground line-clamp-3">
									{mainVideo.description}
								</p>
							</section>
						</div>
					)}
				</section>
			</div>

			{/* ── Up Next ── */}
			<section className="py-10 pb-0 sm:px-12 border-t">
				<section className="flex justify-between items-center gap-10 mb-5 max-sm:px-6">
					<h2 className="text-3xl  tracking-[.009rem] text-brand font-anton font-normal uppercase">
						Up Next
					</h2>

					<section className="flex items-center justify-center gap-3">
						<Button
							onClick={goToPrevPage}
							disabled={!hasPrevPage || isFetching}
							variant="outline"
							size="lg">
							Prev
						</Button>
						<Button
							onClick={goToNextPage}
							disabled={!hasNextPage || isFetching}
							variant="outline"
							size="lg">
							Next
						</Button>
					</section>
				</section>

				<div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6 max-sm:px-6">
					{additionalStatus === "pending" && (
						<React.Fragment>
							{Array.from({ length: 3 }).map((_, index) => (
								<VideoSkeleton key={index} />
							))}
						</React.Fragment>
					)}

					{additionalStatus === "success" &&
						additionalVideos.map((item) => (
							<a
								key={item._id}
								href={`/news/videos/${item.slug}`}
								className="flex flex-col items-start justify-center gap-4">
								<section className="relative w-full">
									<img
										src={item.thumbnail}
										alt={item.altText || "Video Thumbnail"}
										className="aspect-video w-full h-full object-cover bg-muted"
									/>
									<Button
										variant="default"
										className="!px-4 py-3 h-auto font-azeret-mono text-[0.75rem] tracking-[2.4px] uppercase absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 bg-black cursor-pointer">
										Watch
									</Button>
								</section>

								<section>
									<section className="flex gap-1 items-center mb-2">
										<p className="text-xs text-muted-foreground font-medium uppercase font-azeret-mono">
											Afia News -
										</p>
										<p className="text-xs text-muted-foreground font-medium inline-flex uppercase font-azeret-mono">
											{formatDate(item.publishedAt)}
										</p>
									</section>
									<h3 className="font-anton uppercase text-[20px] leading-[140%] tracking-normal mt-1 mb-3 line-clamp-2 transition-colors group-hover:text-brand">
										{item.title}
									</h3>
								</section>
							</a>
						))}
				</div>
			</section>

			{/* ── Error Refresh ── */}
			{additionalStatus === "error" && (
				<Button
					onClick={() => refetch()}
					variant="outline"
					size="lg"
					className="flex mx-auto text-[0.75rem] tracking-[2.4px] uppercase mt-6">
					Refresh Feed <RefreshCw className="size-5" />
				</Button>
			)}
		</section>
	);
}

/* ── Skeletons ── */

const VideoSkeleton = () => (
	<section className="group cols-span-1 gap-2 w-full">
		<section className="flex flex-col items-start justify-center gap-4">
			<Skeleton className="w-full aspect-video rounded-none object-cover" />
			<section className="gap-3 flex flex-col py-2 w-full">
				<Skeleton className="h-[10px] w-3/4 rounded-none mt-3 mb-2" />
				<Skeleton className="h-[10px] w-full rounded-none" />
				<Skeleton className="h-[10px] w-full rounded-none mb-2" />
				<Skeleton className="h-[10px] w-20 rounded-none" />
			</section>
		</section>
	</section>
);

const MainVideoSkeleton = () => (
	<section className="group cols-span-1 gap-2 w-full">
		<section className="flex flex-col items-end gap-4">
			<Skeleton className="w-full aspect-video rounded-none object-cover" />
			<section className="gap-3 flex flex-col py-2 w-full">
				<Skeleton className="h-[10px] w-3/4 rounded-none mt-3 mb-2" />
				<Skeleton className="h-[10px] w-full rounded-none" />
				<Skeleton className="h-[10px] w-full rounded-none mb-2" />
				<Skeleton className="h-[10px] w-20 rounded-none" />
			</section>
		</section>
	</section>
);