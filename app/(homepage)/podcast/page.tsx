"use client";

import { Button } from "@/components/ui/button";
// import GuestCard from "@/components/guest-card";
// import PodcastCard from "@/components/podcast-card";

import { comingSoonMsg } from "@/lib/utils";

import { toast } from "sonner";

const Hero = () => {
	return (
		<>
			<section className="pb-14">
				<section className="flex flex-col-reverse md:flex-row overflow-hidden border-none bg-transparent shadow-none px-6 md:px-12 md:items-center gap-[3rem] sm:gap-[4.5rem] w-full py-12 md:pt-0">
					<section className="flex flex-col md:w-[44%] gap-8 relative">
						<h1
							className="text-[55px] leading-[107%] tracking-normal lg:text-[100px] lg:leading-[100%] lg:tracking-[-2px] font-anton font-normal max-w-[800px] uppercase mb-auto animate-fade-up"
							style={{ animationDelay: "0.20s", animationFillMode: "both" }}>
							The Eastern Narrative
						</h1>

						<p
							className="font-dm-sans font-medium text-muted-foreground  text-base leading-[28px] tracking-[.009rem] animate-fade-up"
							style={{ animationDelay: "0.30s", animationFillMode: "both" }}>
							From politics to pop culture, tradition to tech, our podcasts spotlight the real
							stories, bold opinions, and local legends that define Ala Igbo—wherever you are in the
							world.
						</p>

						<div
							className="flex items-center gap-4 animate-fade-up font-san"
							style={{ animationDelay: "0.40s", animationFillMode: "both" }}>
							<Button
								onClick={() => {
									toast.info("Coming Soon!", {
										description: comingSoonMsg,
									});
								}}
								className="font-normal w-fit bg-brand hover:bg-brand/90 rounded-full p-7 text-foreground z-10 h-14 text-base px-5 font-dm-sans text-[0.75rem] tracking-[2.4px] uppercase">
								Listen live
							</Button>
						</div>

						<section>
							<p
								className="font-dm-sans font-medium text-base leading-[28px] tracking-[.009rem] text-primary animate-fade-up h-11 mt-8"
								style={{ animationDelay: "0.30s", animationFillMode: "both" }}>
								Listen to us on:
							</p>

							<section className="flex gap-4">
								<img src="/images/google-podcast.png" alt="Google podcast" width={33} height={33} />
								<img src="/images/spotify.png" alt="Spotify" width={33} height={33} />
								<img src="/images/apple-podcast.png" alt="Apple podcast" width={33} height={33} />
								<img src="/images/overcast.png" alt="Overcast" width={33} height={33} />
								<img src="/images/rss.png" alt="RSS" width={33} height={33} />
							</section>
						</section>
					</section>

					<div
						className="flex justify-end animate-fade-up m-auto md:w-[50%]"
						style={{ animationDelay: "0.10s", animationFillMode: "both" }}>
						<img
							alt="Afia TV Podcast Hero Image"
							className="object-cover w-full"
							height={858}
							width={673}
							src="/images/podcast-hero-img.png"
						/>
					</div>
				</section>
			</section>

			{/* <PodcastCard /> */}
			{/* <GuestCard /> */}
		</>
	);
};
export default Hero;
