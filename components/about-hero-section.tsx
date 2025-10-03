"use client";

import React from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/heading";

import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

const HeroSection = () => {
	const videoRef = React.useRef<HTMLVideoElement>(null);
	const [isMuted, setIsMuted] = React.useState(true);

	// --- Mute/Unmute Handler ---
	const handleMuteUnmute = (): void => {
		if (videoRef.current) {
			videoRef.current.muted = !videoRef.current.muted; // Toggle the muted property of the video element
			setIsMuted(videoRef.current.muted); // Update our state to reflect the actual mute status
		}
	};

	return (
		<section className="flex flex-col items-center pt-28 relative w-full">
			<div className="flex flex-col max-w-[1200px] items-center gap-[50px]  py-0 relative w-full">
				<div className="flex flex-col w-full max-w-[1150px] items-center justify-center gap-8 px-[32px]">
					<div className="mx-auto sm:text-center">
						<Heading className="text-[3rem] leading-[4rem] -tracking-[.053rem] lg:text-[5.6rem] lg:leading-[6.4rem] lg:-tracking-[.078rem] text-center font-epilogue font-normal">
							Telling the stories, Shaping the Culture.
						</Heading>

						{/* Subheading text */}
						<div className="flex flex-col max-w-[480px] w-full items-center relative text-center mt-6 mx-auto">
							<p className="font-dm-sans font-medium text-muted-foreground  text-base leading-[28px] tracking-[.009rem]">
								Connecting you to the Heart of the Southeast. Discover the Richness and Diversity of
								Our Region&apos;s Stories.
							</p>
						</div>
					</div>
				</div>

				{/* Video/image preview card */}
				<Card className="w-full max-w-[1150px] max-h-[650px] rounded-[28px] max-lg:rounded-none overflow-hidden border-0 p-0 z-10 aspect-[4/3]">
					<div className="relative w-full h-full">
						<video
							ref={videoRef}
							className="object-cover bg-cover size-full max-h-[650px]"
							loop
							playsInline
							autoPlay
							muted
							poster="/images/hero_thumbnail.png">
							<source src="https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL4ENDgMAtEAkupNRIDY2jC6ULsoz1M37VwebW4" />
						</video>

						{/* Mute/Unmute button */}
						<button onClick={handleMuteUnmute} className="absolute bottom-6 left-6">
							<Badge className="flex items-center gap-[3px] px-[7px] py-[7px] bg-imaginative-timing-328979framerappwhite-7 rounded-[1000px] backdrop-blur-[12.5px] font-epilogue">
								<span className="[font-family:'Inter',Helvetica] font-medium text-white text-[13.6px] tracking-[-0.14px] leading-[16.8px]">
									{isMuted ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="20px"
											viewBox="0 -960 960 960"
											width="20px"
											fill="#e3e3e3">
											<path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z" />
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="20px"
											viewBox="0 -960 960 960"
											width="20px"
											fill="#e3e3e3">
											<path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" />
										</svg>
									)}
								</span>
							</Badge>
						</button>
					</div>
				</Card>
			</div>

      <div className="container mx-auto px-6 md:px-12 py-12">
        {/*Our Mission Section */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-12 my-24 max-w-[1200px]">
				<h2
					className="text-[40px] leading-[52px] font-san tracking-[-3.6px] font-normal animate-fade-up max-w-[500px]"
					style={{ animationDelay: "0.20s", animationFillMode: "both" }}>
					Our Mission
				</h2>
				<div className="space-y-6 col-span-2">
					<p
						className="text-lg font-dm-sans font-normal text-muted-foreground animate-fade-up"
						style={{ animationDelay: "0.30s", animationFillMode: "both" }}>
						Afia TV is the first regional television channel dedicated to telling authentic stories
						from the Southeast of Nigeria. Broadcasting 24/7 on DStv Channel 254 and GOtv Channel
						17, Afia TV serves as a cultural compass—preserving, celebrating, and projecting the
						rich traditions, innovations, and voices of the Igbo people. Launched in February 2023
						and based in Enugu, our name "Afia" (which means "market" in Igbo) reflects our mission
						to be a meeting point—where stories, ideas, and communities converge.
					</p>
					<p
						className="text-lg font-dm-sans font-normal text-muted-foreground animate-fade-up"
						style={{ animationDelay: "0.30s", animationFillMode: "both" }}>
						We aim to be the most trusted and impactful regional media brand in Nigeria—dedicated to
						reclaiming our narrative, celebrating local excellence, and preserving cultural identity
						through engaging, inclusive, and high-quality content.
					</p>
				</div>
			</div>

			<Separator />
			{/*Our Vision Section */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-12 my-24 mb-24 max-w-[1200px]">
				<h2
					className="text-[40px] leading-[52px] font-san tracking-[-3.6px]  font-normal animate-fade-up max-w-[500px]"
					style={{ animationDelay: "0.20s", animationFillMode: "both" }}>
					Our Vision
				</h2>
				<div className="space-y-6 col-span-2">
					<p
						className="text-lg font-dm-sans font-normal text-muted-foreground animate-fade-up"
						style={{ animationDelay: "0.30s", animationFillMode: "both" }}>
						A Southeast Nigeria where every voice is celebrated, every tradition preserved, and
						every dream given a stage — uniting communities through culture, music, and heritage
						that inspire connection, pride, and belonging.
					</p>
				</div>
			</div>

      <Separator />
			{/*Strategic Partnerships Section */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-12 my-24 mb-24 max-w-[1200px]">
				<h2
					className="text-[40px] leading-[52px] font-san tracking-[-3.6px]  font-normal animate-fade-up max-w-[500px]"
					style={{ animationDelay: "0.20s", animationFillMode: "both" }}>
					Strategic Partnerships
				</h2>
				<div className="space-y-6 col-span-2">
					<p
						className="text-lg font-dm-sans font-normal text-muted-foreground animate-fade-up"
						style={{ animationDelay: "0.30s", animationFillMode: "both" }}>
						In our commitment to expand and enrich local storytelling, Afia TV has partnered with media platforms like Anaedo TV and other regional creators. These collaborations help us reach more communities and amplify more authentic voices across Ala Igbo.
					</p>
				</div>
			</div>
      </div>

			
		</section>
	);
};

export default HeroSection;
