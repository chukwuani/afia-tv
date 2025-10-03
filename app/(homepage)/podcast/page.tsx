import Image from "next/image";
import { Button } from "@/components/ui/button";
import GuestCard from "@/components/guest-card";
import PodcastCard from "@/components/podcast-card";

const Hero = () => {
	return (
		<>
			<section className="pb-14">
				<section className="flex flex-col md:flex-row overflow-hidden border-none bg-transparent shadow-none px-6 md:px-12 md:items-center gap-[3rem] sm:gap-[4.5rem] w-full py-12 md:pt-0">
					<section className="flex flex-col md:w-[44%] gap-8 relative">
						<h1
							className="text-[4rem] leading-[4rem] -tracking-[.053rem] lg:text-[5.6rem] lg:leading-[6.4rem] lg:-tracking-[.078rem] font-epilogue font-normal mb-auto animate-fade-up"
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
							
								<Button className="font-normal w-fit bg-brand hover:bg-brand/90 rounded-full p-7 text-foreground z-10 h-14 text-base px-5 font-dm-sans text-[0.75rem] tracking-[2.4px] uppercase">
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
								<Image
									src="/images/google-podcast.png"
									alt="Google podcast"
									width={33}
									height={33}
								/>
								<Image src="/images/spotify.png" alt="Spotify" width={33} height={33} />
								<Image src="/images/apple-podcast.png" alt="Apple podcast" width={33} height={33} />
								<Image src="/images/overcast.png" alt="Overcast" width={33} height={33} />
								<Image src="/images/rss.png" alt="RSS" width={33} height={33} />
							</section>
						</section>
					</section>

					<div
						className="flex justify-end animate-fade-up m-auto md:w-[50%]"
						style={{ animationDelay: "0.10s", animationFillMode: "both" }}>
						<Image
							alt="Hero Image"
							className="object-cover w-full"
							height={858}
							width={673}
							quality={100}
							src="/images/podcast-hero-img.png"
						/>
					</div>
				</section>
			</section>

            <PodcastCard />

			<GuestCard />
		</>
	);
};
export default Hero;
