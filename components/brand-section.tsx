"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BrandSection() {
	return (
		<div className="py-20 pb-10 px-6 md:px-10 lg:px-12">
			<CardHeader className="px-0">
				<CardTitle className="text-brand font-anton text-[36px] md:text-[50px] leading-[1.1em] font-normal tracking-[.5px] mb-2 uppercase">
					Our Brands
				</CardTitle>
				<CardDescription className="font-outfit text-muted-foreground text-sm md:text-base max-w-[480px] mb-5">
					We are committed to shaping culture and informing our audience with insightful content and
					engaging storytelling.
				</CardDescription>
			</CardHeader>

			{/* Afia TV & Afia Radio cards */}
			<section className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-8">
				<div className="w-full bg-accent flex flex-col-reverse rounded-none">
					<section className="p-8">
						<h1 className=" text-[30px] leading-[140%] tracking-normal font-normal font-anton mb-2 uppercase">
							Afia TV
						</h1>

						<p className="font-outfit text-muted-foreground text-sm leading-[24px] tracking-[.009rem]">
							We are Afia TV, Southeastern Nigeria&apos;s first regional television channel on DSTV
							ch.254 and GOTV ch.17. We are dedicated to promoting the business, lifestyle and
							cultural stories of the region across the world.
						</p>

						<Link
							href="https://afiatv.net/about"
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								buttonVariants({ variant: "link" }),
								"relative font-azeret-mono text-[0.75rem] tracking-[2.4px] uppercase px-0 underline text-foreground"
							)}>
							Learn more
						</Link>
					</section>

					<div className="mt-0 h-[300px] w-full rounded-none overflow-hidden relative px-4 pt-4">
						<img
							className="size-full rounded-none object-cover"
							alt=""
							src={"/images/AFIA_LOGO_BLACK_ORANGE.jpg"}
						/>
					</div>
				</div>

				<div className="w-full bg-accent flex flex-col-reverse rounded-none h-full items-center justify-between">
					<section className="p-8">
						<h1 className="text-[30px] leading-[140%] tracking-normal font-normal font-anton mb-2 uppercase">
							Afia 99.3
						</h1>

						<p className="font-outfit text-muted-foreground text-sm leading-[24px] tracking-[.009rem]">
							Afia 99.3FM, Enugu. Your Number One Voice Of Enterprise! Discover the latest music
							tracks, explore captivating podcasts, or tune in to radio shows.
						</p>

						<Link
							href="https://afia993.com"
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								buttonVariants({ variant: "link" }),
								"relative font-azeret-mono text-[0.75rem] tracking-[2.4px] uppercase px-0 underline text-foreground"
							)}>
							Learn more
						</Link>
					</section>

					<div className="mt-0 h-[300px] w-full rounded-none overflow-hidden relative px-4 pt-4">
						<img
							className="size-full rounded-none object-cover"
							alt=""
							src={"/images/afia993.webp"}
						/>
					</div>
				</div>
			</section>

			{/* Afia Cinema card (Original design) */}
			<div className="w-full flex max-lg:flex-col-reverse bg-accent rounded-none p-4 pt-4 lg:p-8 lg:!pb-0 mt-12 lg:gap-12">
				<section className="max-lg:p-4 max-lg:pt-8">
					<h1 className="text-[30px] leading-[140%] tracking-normal font-normal font-anton mb-2 uppercase">
						Afia Cinema
					</h1>

					<p className="font-outfit text-muted-foreground text-sm leading-[24px] tracking-[.009rem]">
						Afia Cinema is a Film and Television series division, founded under AfiaTV to create and
						project stories of Igbo origin for the global Igbo audience.
					</p>

					<Link
						href="https://www.youtube.com/@AfiaCinema"
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
								buttonVariants({ variant: "link" }),
								"relative font-azeret-mono text-[0.75rem] tracking-[2.4px] uppercase px-0 underline text-foreground"
							)}>
						Learn more
					</Link>
				</section>

				<div className="mt-0 h-[300px] w-full rounded-none lg:rounded-b-none overflow-hidden relative">
					<img
						className="size-full rounded-none rounded-b-none object-cover"
						alt=""
						src={"/images/afia_cinema.png"}
					/>
				</div>
			</div>
		</div>
	);
}
