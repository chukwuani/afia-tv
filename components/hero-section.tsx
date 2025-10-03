import React from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/heading";

import { cn } from "@/lib/utils";
// bg-[url('/images/hero-bg.png')] bg-cover bg-center bg-no-repeat min-h-screen

const HeroSection = () => {
	return (
		<section className="flex flex-col items-center pt-60 md:pt-28 relative w-full">
			<div
				className="flex flex-col items-center text-center md:text-start md:items-start w-full max-w-[1200px] justify-center px-[19px] md
            :px-[32px] gap-[50px]  py-0 relative">
				<div className="flex flex-col">
					<Heading className="text-[4rem] leading-[4rem] -tracking-[.053rem] lg:text-[5.6rem] lg:leading-[6.4rem] lg:-tracking-[.078rem] font-epilogue font-normal">
						Stories that
						<br />
						shape Ala igbo
					</Heading>

					{/* Subheading text */}
					<div className="flex flex-col max-w-[480px] w-full items-center relative mt-6">
						<p className="font-dm-sans font-medium text-muted-foreground  text-base leading-[28px] tracking-[.009rem]">
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
