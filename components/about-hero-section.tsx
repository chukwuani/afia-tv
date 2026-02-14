"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/heading";

import { Separator } from "./ui/separator";
import {
	EarthIcon,
	HeartHandshakeIcon,
	LightbulbIcon,
	ShieldCheckIcon,
	ShieldIcon,
} from "lucide-react";

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
			<div className="flex flex-col md:px-10 lg:px-12 items-center gap-[50px]  py-0 relative w-full">
				<div className="flex flex-col w-full max-w-[1150px] items-center justify-center gap-8 px-[32px]">
					<div className="mx-auto text-center">
						<Heading className="text-[55px] leading-[107%] tracking-normal lg:text-[100px] lg:leading-[100%] lg:tracking-[-2px] font-anton font-normal max-w-[500px] uppercase">
							Where they see us...
						</Heading>

						{/* Subheading text */}
						<div className="flex flex-col max-w-[480px] w-full items-center relative text-center mt-6 mx-auto">
							<p className="font-dm-sans text-muted-foreground text-sm md:text-base">
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

			<section className="mx-auto flex flex-col items-center justify-center gap-[30px] lg:gap-20 py-20 pt-[140px] pb-0 px-6 md:px-10 lg:px-12 relative overflow-hidden">
				<section className="max-w-[1000px] mb-20">
					<h3 className="font-anton text-center text-[35px] tracking-[1px] lg:text-[68px] lg:tracking-[-1.5px] leading-[100%] uppercase text-balance">
						Broadcasting Eastern Nigeria's news, business, lifestyle and culture.
					</h3>
				</section>
			</section>

			{/* Mission and Vision  */}
			<div className="px-6 md:px-10 lg:px-17 w-full">
				<CardHeader className="px-0">
					<CardTitle className="text-brand font-anton text-[36px] md:text-[50px] leading-[1.1em] font-normal tracking-[.5px] mb-4 uppercase">
						Our Mission and Vision
					</CardTitle>
					<CardDescription className="font-dm-sans text-muted-foreground text-sm md:text-base max-w-[520px] mb-5">
						To be the Chief Marketing platform South East Nigeria to the world. Delivering
						compelling content rooted in culture, community, and commerce, whilst unlocking
						opportunities for our audiences and partners.
					</CardDescription>
				</CardHeader>

				<div className="w-full rounded-2xl overflow-hidden relative pt-4">
					<img
						className="size-full rounded-[12px] object-cover"
						alt=""
						src={"https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL45SvQuDiwayn8tM2jkJqHVSIRrW9oYbhNs43x"}
					/>
				</div>
			</div>

			{/* Core Values */}
			<div className="px-6 md:px-10 lg:px-17 w-full py-20">
				<CardHeader className="px-0">
					<CardTitle className="text-brand font-anton text-[36px] md:text-[50px] leading-[1.1em] font-normal tracking-[.5px] mb-4 uppercase">
						Core Values
					</CardTitle>
					<CardDescription className="font-dm-sans text-muted-foreground text-sm md:text-base max-w-[480px] mb-5">
						Experience growth through innovative digital marketing designed to reach, inspire, and
						deliver results.
					</CardDescription>
				</CardHeader>

				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-auto gap-[80px] items-center">
					<li className="flex flex-col gap-8">
						<LightbulbIcon className="size-[60px]" color="#f9700b" />
						<section className="flex flex-col gap-5 font-san max-w-[300px] md:max-w-[500px]">
							<h3 className="text-2xl font-normal">Innovation</h3>
							<p className="font-dm-sans text-muted-foreground text-sm md:text-base">
								Delivering news through modern storytelling and digital-first reporting.
							</p>
						</section>
					</li>

					<li className="flex flex-col gap-8">
						<HeartHandshakeIcon className="size-[60px]" color="#f9700b" />
						<section className="flex flex-col gap-5 font-san max-w-[300px] md:max-w-[500px]">
							<h3 className="text-2xl font-normal">Excellence & Inclusivity</h3>
							<p className="font-dm-sans text-muted-foreground text-sm md:text-base">
								Accurate reporting that represents every voice and community.
							</p>
						</section>
					</li>

					<li className="flex flex-col gap-8">
						<ShieldCheckIcon className="size-[60px]" color="#f9700b" />
						<section className="flex flex-col gap-5 font-san max-w-[300px] md:max-w-[500px]">
							<h3 className="text-2xl font-normal">Authenticity</h3>
							<p className="font-dm-sans text-muted-foreground text-sm md:text-base">
								Transparent journalism rooted in facts and integrity.
							</p>
						</section>
					</li>

					<li className="flex flex-col gap-8">
						<EarthIcon className="size-[60px]" color="#f9700b" />
						<section className="flex flex-col gap-5 font-san max-w-[300px] md:max-w-[500px]">
							<h3 className="text-2xl font-normal">Community</h3>
							<p className="font-dm-sans text-muted-foreground text-sm md:text-base">
								Connecting people through stories that matter locally and globally.
							</p>
						</section>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default HeroSection;
