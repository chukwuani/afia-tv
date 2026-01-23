"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CardDescription, CardHeader, CardTitle } from "./ui/card";

function AboutSection() {
	return (
		<section className="mx-auto flex flex-col items-center justify-center gap-[30px] lg:gap-20 py-20 pt-[140px] pb-0 px-6 md:px-10 lg:px-12 relative overflow-hidden">
			<section className="max-w-[1000px] md:mb-20">
				<h3 className="font-anton text-center text-[36px] tracking-[1px] lg:text-[68px] lg:tracking-[-1.5px] leading-[100%] uppercase">
					Reclaiming our narrative, celebrating local excellence, and preserving cultural identity through engaging, inclusive, and high-quality content.
				</h3>
			</section>

			{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-28 w-full">
				
				<CardHeader className="px-0 pt-0">
					<CardTitle className="text-brand font-anton text-[36px] md:text-[40px] leading-[1.1em] font-normal tracking-[.5px] mb-6 uppercase">
						our mission and vision
					</CardTitle>

					<CardDescription className="font-dm-sans text-muted-foreground text-sm md:text-base">
						At Revento, we are more than a digital marketing agency—we are your growth partners.
						Founded with a mission to transform ideas into impactful results, we specialize in
						delivering innovative strategies that drive measurable success.
						<br />
						<br />
						With a team of seasoned experts and cutting-edge tools, we help businesses of all sizes
						unlock their potential in the digital landscape.
						<br />
						<br />
						With years of experience and a track record of delivering measurable results, we craft
						strategies that work. From startups to established enterprises, we've helped businesses
						across industries thrive in the digital landscape.
					</CardDescription>

					<div
						className="flex items-start gap-4 animate-fade-up mt-6 w-auto"
						style={{ animationDelay: "0.40s", animationFillMode: "both" }}>
						<Link
							href="/news"
							className={cn(
								buttonVariants({ variant: "default" }),
								"relative rounded-full z-10 h-14 text-base px-5 font-dm-sans text-[0.75rem] tracking-[2.4px] uppercase",
							)}>
							Learn More
						</Link>
					</div>
				</CardHeader>

				
				<div className="w-full h-full flex items-center justify-center">
					<img
						decoding="auto"
						loading="lazy"
						width="1082"
						height="1322"
						src="https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL4MJWBCjgAqr7QVURiEx5WOICkcbPzh4lHYTLo"
						alt="Mission Image "
						style={{
							display: "block",
							width: "100%",
							height: "100%",
							objectPosition: "center center",
							objectFit: "cover",
                            borderRadius: "12px",
						}}
					/>
				</div>
			</div> */}
		</section>
	);
}

export default AboutSection;
