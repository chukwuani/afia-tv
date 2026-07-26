"use client";

import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { NewsTypes } from "@/types";

import axios from "axios";
import React from "react";
import { RefreshCw } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import NewsSkeleton from "@/components/skeletons/news-skeleton";

const FeaturedPage = () => {
    const fetchData = async ({ pageParam }: { pageParam: string }) => {
        const limit = 9;
        const cursor = pageParam.replace("lastPublishedAt=", ",").split(",")[0];
        const lastPublishedAt = pageParam.replace("lastPublishedAt=", ",").split(",")[1];

        let news: NewsTypes[] = [];

        if (cursor && lastPublishedAt) {
            const query = `*[_type == "news" && featured == true && (
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
            const initialLimit = limit;
            const query = `*[_type == "news" && featured == true] | order(publishedAt desc) [0...${initialLimit}] {
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

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, refetch } =
        useInfiniteQuery({
            queryKey: ["infinite-featured-news"],
            queryFn: fetchData,
            initialPageParam: "",
            getNextPageParam: (lastPage) => lastPage?.nextCursor,
        });

    return (
        <section className="flex flex-col px-4 sm:px-12 py-16">
            <h2 className="text-3xl mb-10 tracking-[.009rem] text-brand font-anton text-[36px] leading-[1.1em] font-normal uppercase">
                Featured 
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {status === "pending" && (
                    <React.Fragment>
                        {Array.from({ length: 9 }).map((_, index) => (
                            <NewsSkeleton key={index} />
                        ))}
                    </React.Fragment>
                )}

                {data?.pages?.map((group, i) => (
                    <React.Fragment key={i}>
                        {group?.news?.map((item: NewsTypes) => (
                            <Link
                                key={item._id}
                                title={item.title}
                                href={`/news/${item.slug}`}
                                className="group cols-span-1 gap-2 w-full">
                                <section className="flex flex-col items-end gap-4">
                                    <img
                                        src={item.mainImage}
                                        alt={item.altText}
                                        sizes="(min-width: 768px) 50vw, (min-width: 1024px) 25vw, 100vw"
                                        className="rounded-none bg-muted object-cover aspect-[14/9] w-full"
                                    />

                                    <section className="flex flex-col gap-2 w-fit">
                                        <section className="flex gap-2 items-center">
                                            <p className="text-xs text-muted-foreground font-medium uppercase font-azeret-mono">
                                                By {item.author.name} -{" "}
                                            </p>
                                            <p className="text-xs text-muted-foreground font-medium inline-flex uppercase font-azeret-mono">
                                                {formatDate(item._createdAt)}
                                            </p>
                                        </section>

                                        <h3 className="font-anton uppercase text-[24px] sm:text-[28px] leading-[140%] tracking-normal mt-1 mb-2 line-clamp-2 transition-colors group-hover:text-brand">
                                            {item.title}
                                        </h3>

                                        <p className="text-sm font-outfit text-muted-foreground line-clamp-2">
                                            {item.description}
                                        </p>
                                    </section>
                                </section>
                            </Link>
                        ))}
                    </React.Fragment>
                ))}
            </div>

            {status === "error" ? (
                <Button
                    onClick={() => refetch()}
                    variant={"outline"}
                    size={"lg"}
                    className="flex mx-auto rounded text-[0.75rem] tracking-[2.4px] uppercase">
                    Refresh Feed <RefreshCw className="size-5" />
                </Button>
            ) : (
                <Button
                    variant="outline"
                    size="lg"
                    disabled={!hasNextPage || isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    className="flex mx-auto rounded text-[0.75rem] tracking-[2.4px] uppercase w-fit mt-5">
                    {isFetchingNextPage
                        ? "Loading more..."
                        : hasNextPage
                        ? "Load More"
                        : "Nothing more to load"}
                </Button>
            )}
        </section>
    );
};

export default FeaturedPage;
