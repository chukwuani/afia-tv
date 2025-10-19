import React from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/heading";

import { cn } from "@/lib/utils";
import Image from "next/image";
// bg-[url('/images/hero-bg.png')] bg-cover bg-center bg-no-repeat min-h-screen

const HeroSection = () => {
	return (
		<section className="flex flex-col items-center pt-[400px] pb-0 md:pt-28 md:pb-[109.8px] relative w-full overflow-hidden">
			{/* Hero Background Image */}
			<section
				className="absolute top-0 left-0 md:block hidden"
				style={{
					opacity: 1,
					mask: "linear-gradient(90deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 100%) add",
				}}>
				<Image src="/images/hero-bg.png" alt="" width={1400} height={600} />
			</section>

			<section
				className="absolute top-0 left-0 md:hidden block w-full"
				style={{
					opacity: 1,
					mask: "linear-gradient(0deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 100%) add",
				}}>
				<Image src="/images/hero-bg-mobile.png" alt="" width={1000} height={600} />
			</section>

			<div className="flex flex-col items-center text-center md:text-start md:items-start w-full justify-center px-6 md:px-10 lg:px-12 gap-[35px] md:gap-[50px] py-0 relative">
				<div className="flex flex-col">
					<Heading className="text-[55px] leading-[107%] tracking-normal lg:text-[85px] lg:leading-[104%] lg:tracking-normal font-anton font-normal max-w-[600px] uppercase">
						Stories that
						<br />
						shape Ala igbo
					</Heading>

					{/* Subheading text */}
					<div className="flex flex-col max-w-[480px] w-full items-center relative mt-6">
						<p className="font-dm-sans font-medium text-muted-foreground text-sm md:text-base">
							Streaming 24/7 on DStv 254 & GOtv 17 — Dive into Igbo stories, culture, and power like
							never before.
						</p>
					</div>
				</div>

				{/* Call to action buttons */}
				<div
					className="flex items-center gap-4 animate-fade-up mt-3 w-auto justify-center"
					style={{ animationDelay: "0.40s", animationFillMode: "both" }}>
					<Link
						href="/news"
						className={cn(
							buttonVariants({ variant: "default" }),
							"relative rounded-full z-10 h-14 text-base px-5 font-dm-sans text-[0.75rem] tracking-[2.4px] uppercase"
						)}>
						Read our Stories
					</Link>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
