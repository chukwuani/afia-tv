"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BrandSection() {
	return (
		<div className="py-20 pb-0 px-6 md:px-10 lg:px-12">
			<CardHeader className="px-0">
				<CardTitle className="text-brand font-anton text-[36px] md:text-[50px] leading-[1.1em] font-normal tracking-[.5px] mb-2 uppercase">
					Our Brands
				</CardTitle>
				<CardDescription className="font-dm-sans text-muted-foreground text-sm md:text-base max-w-[480px] mb-5">
					We are committed to shaping culture and informing our audience with insightful content and
					engaging storytelling.
				</CardDescription>
			</CardHeader>

			{/* Afia TV & Afia Radio cards */}
			<section className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-8">
				<div className="w-full bg-accent rounded-3xl shadow-sm">
					<section className="p-8 pb-0">
						<h1 className="text-white text-4xl sm:text-[32px] leading-[140%] tracking-normal font-normal font-anton mb-6 uppercase">
							Afia TV
						</h1>

						<p className="font-dm-sans text-muted-foreground text-sm leading-[28px] tracking-[.009rem] mb-8">
							We are Afia TV, Southeastern Nigeria&apos;s first regional television channel on DSTV
							ch.254 and GOTV ch.17. We are dedicated to promoting the business, lifestyle and
							cultural stories of the region across the world.
						</p>

						<Link
							href="https://afiatv.net/about"
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								buttonVariants({ variant: "default" }),
								"inline-block bg-black text-white px-8 !py-3 rounded-full font-medium uppercase tracking-wide !text-sm h-auto"
							)}>
							Learn more
						</Link>
					</section>

					<div className="mt-12 h-[300px] w-full rounded-2xl rounded-b-none overflow-hidden relative px-4 md:px-8">
						<img
							className="size-full rounded-[12px] rounded-b-none object-cover"
							alt=""
							src={"/images/afia-tv.jpg"}
						/>
					</div>
				</div>

				<div className="w-full bg-accent rounded-3xl shadow-sm h-full flex flex-col items-center justify-between">
					<section className="p-8 pb-0">
						<h1 className="text-white text-4xl sm:text-[32px] leading-[140%] tracking-normal font-normal font-anton mb-6 uppercase">
							Afia 99.3
						</h1>

						<p className="font-dm-sans text-muted-foreground text-sm leading-[28px] tracking-[.009rem] mb-8">
							Afia 99.3FM, Enugu. Your Number One Voice Of Enterprise! Discover the latest music
							tracks, explore captivating podcasts, or tune in to radio shows.
						</p>

						<Link
							href="https://afia993.com"
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								buttonVariants({ variant: "default" }),
								"inline-block bg-black text-white px-8 !py-3 rounded-full font-medium uppercase tracking-wide !text-sm h-auto"
							)}>
							Learn more
						</Link>
					</section>

					<div className="mt-12 h-[300px] w-full rounded-2xl rounded-b-none overflow-hidden relative px-4 md:px-8">
						<img
							className="size-full rounded-[12px] rounded-b-none object-cover"
							alt=""
							src={"/images/afia993.webp"}
						/>
					</div>
				</div>
			</section>

			{/* Afia Cinema card */}
			<div className="w-full flex max-lg:flex-col bg-accent rounded-3xl p-4 pt-8 lg:p-8 !pb-0 shadow-sm mt-12 lg:gap-12">
				<section className="max-lg:px-4">
					<h1 className="text-white text-4xl sm:text-[32px] leading-[140%] tracking-normal font-normal font-anton mb-6 uppercase">
						Afia Cinema
					</h1>

					<p className="font-dm-sans text-muted-foreground text-sm leading-[28px] tracking-[.009rem] mb-8">
						Afia Cinema is a Film and Television series division, founded under AfiaTV to create and
						project stories of Igbo origin for the global Igbo audience.
					</p>

					<Link
						href="https://www.youtube.com/@AfiaCinema"
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
							buttonVariants({ variant: "default" }),
							"inline-block bg-black text-white px-8 !py-3 rounded-full font-medium uppercase tracking-wide !text-sm h-auto"
						)}>
						Learn more
					</Link>
				</section>

				<div className="mt-12 h-[300px] w-full rounded-2xl rounded-b-none overflow-hidden relative">
					<img
						className="size-full rounded-[12px] rounded-b-none object-cover"
						alt=""
						src={"/images/afia_cinema.png"}
					/>
				</div>
			</div>
		</div>
	);
}
