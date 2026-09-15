"use client";

import { buttonVariants } from "@/components/ui/button";
import SubmissionCTA from "../../enugustory/_components/submission-cta";
import { cn } from "@/lib/utils";

const HeroSection = () => {
	return (
		<section className="flex flex-col">
			<div className="relative flex md:min-h-[calc(100dvh-104px)] flex-col-reverse overflow-hidden md:p-6">
				<div className="z-10 mt-auto flex max-w-87.5 min-w-0 flex-col gap-4 bg-white max-md:pb-8 max-md:px-6 p-4">
					<div>
						<h1 className="font-anton uppercase text-[24px] leading-[140%] tracking-normal mb-3 line-clamp-2 transition-colors">
							The Visibility your business deserves
						</h1>
						<p className="text-sm font-outfit text-muted-foreground line-clamp-2">
							A media support fund for small and medium businesses across the five South Eastern
							states.
						</p>

						<a
							href="#"
							className={cn(
								buttonVariants({ variant: "default" }),
								"mt-4 relative z-10 text-xs text-[10px]! p-2 lg:px-4! lg:py-3 h-auto lg:text-[0.75rem]! tracking-[2.4px] uppercase",
							)}>
							Get Started
						</a>
					</div>
				</div>

				<div className="md:absolute top-0 right-0 bottom-0 w-full grayscale-60">
					<img
						alt="banner_img"
						loading="lazy"
						width="3264"
						height="2448"
						src="/images/obuzo_thumb.png"
					/>
				</div>
			</div>

			{/* <section className="mx-auto flex flex-col items-center justify-center py-10 lg:py-20 px-6 md:px-10 lg:px-12 relative overflow-hidden">
				<section className="max-w-250">
					<h3 className="font-anton text-center text-[28px] tracking-[1px] lg:text-[68px] lg:tracking-[-1.5px] leading-[104%] uppercase text-balance">
						Redefining Digital Impact with Innovative Strategies That Drive Real Results!
					</h3>
				</section>
			</section> */}
		</section>
	);
};

export default HeroSection;
