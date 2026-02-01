"use client";

import { VideoTypes } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface PaginationResponse {
	videos: VideoTypes[];
	nextCursor: string | null;
	prevCursor: string | null;
	currentPage: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

const usePaginationQuery = (url: string, key: string, skip: number = 0) => {
	const limit = 5;
	const [currentPage, setCurrentPage] = useState(1);
	const [cursorHistory, setCursorHistory] = useState<string[]>([""]);

	const fetchData = async (page: number): Promise<PaginationResponse> => {
		const pageIndex = page - 1;
		const cursor = cursorHistory[pageIndex] || "";
		
		const [id, lastPublishedAt] = cursor ? cursor.replace("lastPublishedAt=", ",").split(",") : ["", ""];

		let videos: VideoTypes[] = [];

		if (id && lastPublishedAt) {
			// Fetch from cursor position
			const query = `*[_type == "videos" && !(_id in path("drafts.**")) && (
      			publishedAt < $lastPublishedAt
      			|| (publishedAt == $lastPublishedAt && _id > $cursor)
    			)] | order(publishedAt desc) [0...${limit}] {
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
				{
					query,
					params: {
						cursor: id,
						lastPublishedAt,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
						"Content-Type": "application/json",
					},
				}
			);

			videos = res.data.result;
		} else {
			// Initial load - first page
			const initialLimit = limit + skip;
			const query = `*[_type == "videos" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...${initialLimit}] {
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

			videos = res.data.result.slice(skip);
		}

		const hasNextPage = videos.length === limit;
		const hasPrevPage = page > 1;

		let nextCursor = null;
		if (hasNextPage && videos.length > 0) {
			nextCursor = videos[limit - 1]._id + `lastPublishedAt=${videos[limit - 1].publishedAt}`;
		}

		// Store cursor for next page if we haven't already
		if (nextCursor && !cursorHistory[page]) {
			setCursorHistory((prev) => {
				const newHistory = [...prev];
				newHistory[page] = nextCursor;
				return newHistory;
			});
		}

		return {
			videos,
			nextCursor,
			prevCursor: cursorHistory[pageIndex - 1] || null,
			currentPage: page,
			hasNextPage,
			hasPrevPage,
		};
	};

	const { data, status, isFetching, refetch } = useQuery({
		queryKey: [key, currentPage],
		queryFn: () => fetchData(currentPage),
		staleTime: 5 * 60 * 1000, // 5 minutes
		placeholderData: (previousData) => previousData, // Keep previous data while fetching
	});

	const goToNextPage = () => {
		if (data?.hasNextPage) {
			setCurrentPage((prev) => prev + 1);
		}
	};

	const goToPrevPage = () => {
		if (data?.hasPrevPage) {
			setCurrentPage((prev) => prev - 1);
		}
	};

	const goToPage = (page: number) => {
		if (page > 0 && page <= cursorHistory.length) {
			setCurrentPage(page);
		}
	};

	return {
		videos: data?.videos || [],
		currentPage: data?.currentPage || 1,
		hasNextPage: data?.hasNextPage || false,
		hasPrevPage: data?.hasPrevPage || false,
		isFetching,
		status,
        refetch,
		goToNextPage,
		goToPrevPage,
		goToPage,
	};
};

export default usePaginationQuery;