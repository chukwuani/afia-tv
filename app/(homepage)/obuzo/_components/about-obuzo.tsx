"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AboutObuzo = () => {
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
		<section className="flex flex-col items-center relative w-full">
			<div className="px-4 md:px-6 w-full py-10 md:py-20">
				<CardHeader className="px-0 pt-0">
					<CardTitle className="text-brand font-anton text-3xl md:text-[36px] leading-[1.1em] font-normal tracking-[.5px] mb-5 uppercase max-w-75">
						Why Obuzo Is the Trusted Choice
					</CardTitle>
					<CardDescription className="font-outfit text-muted-foreground text-sm md:text-base max-w-[480px]">
						Experience growth through innovative digital marketing designed to reach, inspire, and
						deliver results.
					</CardDescription>
				</CardHeader>

				{/* Video/image preview card */}
				<Card className="w-full max-h-[650px] rounded-none overflow-hidden border-0 p-0 z-10 aspect-[4/3]">
					<div className="relative w-full h-full">
						<video
							ref={videoRef}
							className="object-cover bg-cover size-full max-h-[650px]"
							loop
							playsInline
							autoPlay
							muted
							poster="/images/obuzo_thumb.png">
							<source src="https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL4ONfzOrBwPvE6BD4Jtl9i7gzYnUkWeF3fKbS2" />
						</video>

						{/* Mute/Unmute button */}
						<button onClick={handleMuteUnmute} className="absolute bottom-6 left-6">
							<Badge className="flex items-center gap-[3px] px-[7px] py-[7px] bg-black rounded-[1000px] backdrop-blur-[12.5px] font-epilogue">
								<span className="[font-family:'Inter',Helvetica] font-medium text-white text-[13.6px] tracking-[-0.14px] leading-[16.8px]">
									{isMuted ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="30px"
											viewBox="0 -960 960 960"
											width="30px"
											fill="#e3e3e3">
											<path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z" />
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="30px"
											viewBox="0 -960 960 960"
											width="30px"
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
		</section>
	);
};

export default AboutObuzo;
