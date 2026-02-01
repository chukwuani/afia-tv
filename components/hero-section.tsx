"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MoveUpRightIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/heading";

import { cn } from "@/lib/utils";


const HeroSection = () => {
	const images = [
		{
			src: "https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL4CkpLTN8CiTB2WDzNJq7ZnjtA64HKcQy5eU0G",
			alt: "",
			name: "Weather Update",
		},
		{
			src: "https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL45MXKdniwayn8tM2jkJqHVSIRrW9oYbhNs43x",
			alt: "",
			name: "Afia news",
		},
		{
			src: "https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL4QZOo7pLKGzmE2Zc5HXF1lsY8OA04RoMajiBb",
			alt: "",
			name: "AM weekend",
		},
		{
			src: "https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL4abpJv1P3v0U6lWMgXR1drzP7kDpTh5ycOtZu",
			alt: "",
			name: "Nka Lounge",
		},
		{
			src: "https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL48RmFP8cBkW3ej6hyHd0mRwrzV2GaXf4JP9S5",
			alt: "",
			name: "Nollywood show",
		},
		{
			src: "https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL4zRKGG7Xa5QDg6GpcRmPwq903UuHsYEoyBATM",
			alt: "",
			name: "Enugu Kwenu",
		},
		{
			src: "https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL4Mi5m6UagAqr7QVURiEx5WOICkcbPzh4lHYTL",
			alt: "",
			name: "Nka",
		},
		{
			src: "https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL4zCzO5AXa5QDg6GpcRmPwq903UuHsYEoyBATM",
			alt: "",
			name: "Lunch Break",
		},
		{
			src: "https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL4fVUYfabptUVLwaS2JuyPjWnC31m5OExI0cgb",
			alt: "",
			name: "Eastern Eye",
		},
		{
			src: "https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL4a24TwmP3v0U6lWMgXR1drzP7kDpTh5ycOtZu",
			alt: "",
			name: "Business Morning",
		},
		{
			src: "https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL4mqHdSTMix0GmRC9TcXnIU6odtqVLu2wb7JPa",
			alt: "",
			name: "Sports",
		},
		{
			src: "https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL42qPELSYx7IqzladLfyNHZnt4Kb1JoMgmV6Ap",
			alt: "",
			name: "AM",
		},
	];

	const ImageItem = ({ src, alt, name }: { src: string; alt: string; name: string }) => (
		<li className="flex-shrink-0">
			<div className="relative w-80 h-48 overflow-hidden">
				<img
					width={2400}
					height={1350}
					title={name}
					src={src}
					alt={alt}
					className="block w-full h-full object-cover object-center"
				/>
			</div>
		</li>
	);

	const CarouselRow = ({
		imageSet,
		direction,
	}: {
		imageSet: typeof images;
		direction: number;
	}) => {
		// For right scrolling (positive direction), start from -100%
		// For left scrolling (negative direction), start from 0
		const initial = direction > 0 ? { x: '-100%' } : {};
		const animateX = direction > 0 ? ['-100%', '0%'] : ['0%', `${direction}%`];

		return (
			<div className="relative overflow-hidden">
				<section className="flex gap-1 w-full h-full max-w-full max-h-full place-items-center m-0 p-0 list-none opacity-100 overflow-hidden">
					<motion.ul
						className={`flex place-items-center m-0 p-0 list-none gap-1 relative flex-row`}
						initial={initial}
						animate={{
							x: animateX,
						}}
						transition={{
							x: {
								repeat: Infinity,
								repeatType: "loop",
								duration: 30,
								ease: "linear",
							},
						}}>
						{imageSet.map((img, index) => (
							<ImageItem key={index} {...img} />
						))}
					</motion.ul>
					<motion.ul
						className={`flex place-items-center m-0 p-0 list-none gap-1 relative flex-row`}
						initial={initial}
						animate={{
							x: animateX,
						}}
						transition={{
							x: {
								repeat: Infinity,
								repeatType: "loop",
								duration: 30,
								ease: "linear",
							},
						}}>
						{/* Duplicate items for seamless scrolling */}
						{imageSet.map((img, index) => (
							<ImageItem key={`duplicate-${index}`} {...img} aria-hidden="true" />
						))}
					</motion.ul>
				</section>
			</div>
		);
	};

	// Define different image sets for each row
	const row1Images = images.slice(0, 6);
	const row2Images = images.slice(6, 12);
	const row3Images = images.slice(0, 6);

	return (
		<section className="flex flex-col items-center pt-[180px] pb-6 lg:pb-12 relative w-full overflow-hidden">
			<section
				className="absolute top-[-280px] sm:top-[-320px] right-[-240px] left-[-80px]"
				style={{
					willChange: "transform",
					opacity: 1,
					transform: "rotate(20deg) skewX(-20deg) skewY(-10deg)",
					mask: "linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%) add",
				}}>
				<div className="space-y-1">
					<CarouselRow imageSet={row1Images}  direction={-100} />
					<CarouselRow imageSet={row2Images} direction={-100} />
					<CarouselRow imageSet={row3Images} direction={100} />
				</div>
			</section>

			<div className="flex flex-col text-start items-start w-full justify-center px-6 md:px-14 gap-[30px] py-0 relative">
				<div className="flex flex-col">
					<Heading className="text-[44px] leading-[4rem] -tracking-[.053rem] lg:text-[70px] lg:leading-[1.2em] lg:-tracking-[1.5px] font-anton font-normal max-w-[600px] uppercase">
						Stories That
						<br />
						Shape Ala Igbo
					</Heading>

					{/* Subheading text */}
					<div className="flex flex-col max-w-[480px] w-full items-center relative mt-6">
						<p className="font-dm-sans font-normal text-muted-foreground text-sm md:text-base leading-[28px]">
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
							"relative rounded-full z-10 text-base !px-4 py-3 h-auto font-dm-sans text-[0.75rem] tracking-[2.4px] uppercase",
						)}>
						Read our Stories
						<MoveUpRightIcon data-icon="inline-rnd" />
					</Link>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;