"use client";

import { NewsTypes } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const useInfinteQuery = (url: string, key: string) => {
	const fetchData = async ({ pageParam }: { pageParam: string }) => {
		const cursor = pageParam.replace("lastPublishedAt=", ",").split(",")[0];
		const lastPublishedAt = pageParam.replace("lastPublishedAt=", ",").split(",")[1];
		const limit = 6;

		let news: NewsTypes[] = [];

		if (cursor && lastPublishedAt) {
			const query = `*[_type == "news"  && (
      			publishedAt < $lastPublishedAt
      			|| (publishedAt == $lastPublishedAt && _id > $cursor)
    			)] | order(publishedAt desc) [0...${limit}] {
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
					params: {
						cursor,
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

			const data = res.data;
			news = data.result;
		} else {
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
			news = data.result;
		}

		let nextCursor = null;

		if (news.length === limit) {
			nextCursor = news[limit - 1]._id + `lastPublishedAt=${news[limit - 1].publishedAt}`;
		}

		return {
			news,
			nextCursor,
		};
	};

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
		queryKey: [key],
		queryFn: fetchData,
		initialPageParam: "",
		getNextPageParam: (lastPage) => lastPage?.nextCursor,
	});

	return {
		data,
		hasNextPage,
		isFetchingNextPage,
		status,
		fetchNextPage,
	};
};

export default useInfinteQuery;
