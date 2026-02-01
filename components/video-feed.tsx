"use client";

import { formatDate } from "@/lib/utils";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import usePaginationQuery from "@/hooks/use-pagination-query";
import { VideoTypes } from "@/types";

import { Skeleton } from "@/components/ui/skeleton";

export default function VideoFeed() {
	const {
		videos,
		currentPage,
		hasNextPage,
		hasPrevPage,
		isFetching,
		goToNextPage,
		goToPrevPage,
		status,
		refetch,
	} = usePaginationQuery("/api/videos", "videos-pagination", 0);

	const [mainVideo, setMainVideo] = useState<VideoTypes | null>(null);
	const [additionalVideos, setAdditionalVideos] = useState<VideoTypes[]>([]);
	const previousPage = useRef(currentPage);

	useEffect(() => {
		if (videos && videos.length > 0) {
			setMainVideo(videos[0]);
			setAdditionalVideos(videos.slice(1));
		}
	}, [videos]);

	useEffect(() => {
		// Only scroll if page actually changed
		if (previousPage.current !== currentPage) {
			const videoFeedSection = document.getElementById("videos");
			if (videoFeedSection) {
				videoFeedSection.scrollIntoView({ behavior: "smooth" });
			}
			previousPage.current = currentPage;
		}
	}, [currentPage]);

	// Format embed URL for YouTube videos eg: https://youtu.be/QbYKRcY9bBc?si=yyMEaBbOaDbkgHfI
	const formatEmbedUrl = (url: string) => {
		const urlObj = new URL(url);
		const videoId = urlObj.pathname.split("/").pop();
		return `https://www.youtube.com/embed/${videoId}`;
	};

	const handleVideoClick = (videoId: string) => {
		// on click replace main video with clicked video from the additional videos list
		const selectedVideo = videos?.find((video) => video._id === videoId) || null;
		setMainVideo(selectedVideo);

		// Set additional videos excluding the selected video
		const updatedAdditionalVideos = videos?.filter((video) => video._id !== videoId) || [];
		setAdditionalVideos(updatedAdditionalVideos);

		// Scroll to top of video feed section by id not top of page
		const videoFeedSection = document.getElementById("videos");
		if (videoFeedSection) {
			videoFeedSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section id="videos" className="flex flex-col pb-10 bg-muted/50">
			<div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 sm:px-12">
				<section className="py-10 pb-0 lg:col-span-2">
					<h2 className="text-3xl mb-10 max-sm:px-6 tracking-[.009rem] text-brand font-anton text-[36px] leading-[1.1em] font-normal uppercase">
						Top Video News
					</h2>

					{status === "pending" && (
						<section className="grid grid-cols-1 gap-8">
							{Array.from({ length: 1 }).map((_, index) => (
								<MainVideoSkeleton key={index} />
							))}
						</section>
					)}

					<div className="grid grid-cols-1 gap-8">
						{mainVideo && (
							<div key={mainVideo._id} className="flex flex-col">
								<section className="w-full aspect-video object-cover mb-6 bg-muted">
									<iframe
										width="100%"
										height="100%"
										src={formatEmbedUrl(mainVideo.embedUrl)}
										title="YouTube video player"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										referrerPolicy="strict-origin-when-cross-origin"
										allowFullScreen></iframe>
								</section>

								<section className="max-sm:px-6 px-7 pl-0">
									<section className="flex gap-1 items-center mb-2">
										<p className="text-xs text-muted-foreground font-medium capitalize">
											Afia News -
										</p>
										<p className="text-xs text-muted-foreground font-medium inline-flex capitalize">
											{formatDate(mainVideo.publishedAt)}
										</p>
									</section>

									<h3 className="font-anton uppercase text-[24px] sm:text-[28px] md:text-[32px] leading-[140%] tracking-normal mt-1 mb-3 line-clamp-2 transition-colors group-hover:text-brand">
										{mainVideo.title}
									</h3>
									<p className="text-sm font-epilogue text-muted-foreground mb-4 line-clamp-3">
										{mainVideo.description}
									</p>
								</section>
							</div>
						)}
					</div>
				</section>

				<section className="py-10 pb-0 lg:col-span-1">
					<h2 className="text-3xl mb-10 max-sm:px-6 tracking-[.009rem] text-brand font-anton text-[36px] leading-[1.1em] font-normal uppercase">
						More Videos
					</h2>

					<div className="grid grid-cols-1 gap-6 max-sm:px-6">
						{status === "pending" && (
							<React.Fragment>
								{Array.from({ length: 4 }).map((_, index) => (
									<VideoSkeleton key={index} />
								))}
							</React.Fragment>
						)}

						{additionalVideos.map((item) => (
							<div className="flex items-start justify-center gap-4" key={item._id}>
								<section
									onClick={() => handleVideoClick(item._id)}
									className="relative max-w-[120px] aspect-square">
									<img
										src={item.thumbnail}
										alt={item.altText || "Video Thumbnail"}
										className="max-w-[120px] aspect-square object-cover bg-muted"
									/>

									<section className="size-11 bg-black p-2 flex items-center justify-center rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 cursor-pointer">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="128"
											height="128"
											viewBox="0 0 24 24"
											fill="none"
											data-src="https://cdn.hugeicons.com/icons/play-solid-rounded.svg?v=1.0.1"
											role="img"
											color="#FFFFFF">
											<path
												d="M13.9405 6.337C15.5735 7.26468 16.8567 7.99369 17.7709 8.66148C18.6913 9.33386 19.3721 10.0366 19.6159 10.9632C19.7947 11.6426 19.7947 12.3574 19.6159 13.0368C19.3721 13.9634 18.6913 14.6661 17.7709 15.3385C16.8567 16.0063 15.5735 16.7353 13.9406 17.663L13.9406 17.663C12.3632 18.5591 11.033 19.3148 10.0232 19.7444C9.0053 20.1773 8.07729 20.3968 7.17536 20.1412C6.51252 19.9533 5.90941 19.5968 5.42356 19.1066C4.76419 18.4414 4.49951 17.5219 4.37429 16.4154C4.24998 15.3169 4.24999 13.879 4.25 12.0501V12.0501V11.9499V11.9499C4.24999 10.121 4.24998 8.68309 4.37429 7.58464C4.49951 6.4781 4.76419 5.55861 5.42356 4.89335C5.90941 4.40317 6.51252 4.04666 7.17536 3.85883C8.07729 3.60325 9.0053 3.82269 10.0232 4.25565C11.033 4.68516 12.3632 5.44084 13.9405 6.337Z"
												fill="#FFFFFF"></path>
										</svg>
									</section>
								</section>

								<section>
									<section className="flex gap-1 items-center mb-2">
										<p className="text-xs text-muted-foreground font-medium capitalize">
											Afia News -
										</p>
										<p className="text-xs text-muted-foreground font-medium inline-flex capitalize">
											{formatDate(item.publishedAt)}
										</p>
									</section>
									<h3 className="font-anton uppercase text-[20px] leading-[140%] tracking-normal mt-1 mb-3 line-clamp-2 transition-colors group-hover:text-brand">
										{item.title}
									</h3>
									<p className="text-xs font-epilogue text-muted-foreground mb-4 line-clamp-2">
										{item.description}
									</p>
								</section>
							</div>
						))}
					</div>

					<section className="flex items-center justify-center gap-3 mx-auto w-full mt-4">
						<Button
							onClick={goToPrevPage}
							disabled={!hasPrevPage || isFetching}
							variant="outline"
							size="lg"
							className="flex rounded-full">
							<ChevronLeftIcon data-icon="inline-rnd" />
							Prev
						</Button>

						<Button
							onClick={goToNextPage}
							disabled={!hasNextPage || isFetching}
							variant="outline"
							size="lg"
							className="flex rounded-full">
							Next
							<ChevronRightIcon data-icon="inline-rnd" />
						</Button>
					</section>
				</section>
			</div>

			{status === "error" ? (
				<Button
					onClick={() => refetch()}
					variant={"outline"}
					size={"lg"}
					className="flex mx-auto rounded-full text-[0.75rem] tracking-[2.4px] uppercase font-dm-sans">
					Refresh Feed <RefreshCw className="size-5" />
				</Button>
			) : null}
		</section>
	);
}

const VideoSkeleton = () => {
	return (
		<section className="group cols-span-1 gap-2 w-full">
			<section className="flex items-start justify-center gap-4">
				<Skeleton className="w-full max-w-[120px] aspect-square rounded-none object-cover" />

				<section className="gap-3 flex flex-col py-2 w-full">
					<Skeleton className="h-[10px] w-3/4 rounded-none mt-3 mb-2" />

					<Skeleton className="h-[10px] w-full rounded-none" />

					<Skeleton className="h-[10px] w-full rounded-none mb-2" />

					<Skeleton className="h-[10px] w-20 rounded-none" />
				</section>
			</section>
		</section>
	);
};

const MainVideoSkeleton = () => {
	return (
		<section className="group cols-span-1 gap-2 w-full">
			<section className="flex flex-col items-end gap-4">
				<Skeleton className="w-full aspect-video rounded-md object-cover" />

				<section className="gap-3 flex flex-col py-2 w-full">
					<Skeleton className="h-[10px] w-3/4 rounded-none mt-3 mb-2" />

					<Skeleton className="h-[10px] w-full rounded-none" />

					<Skeleton className="h-[10px] w-full rounded-none mb-2" />

					<Skeleton className="h-[10px] w-20 rounded-none" />
				</section>
			</section>
		</section>
	);
};
