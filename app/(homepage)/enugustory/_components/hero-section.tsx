"use client";

import { Heading } from "@/components/heading";
import { motion } from "motion/react";

import SubmissionDialog from "./submission-dialog";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

const PARTNERS = [
	{
		alt: "Juhel",
		src: "/images/juhel-logo.png",
	},
	{
		alt: "Box 55",
		src: "/images/box55.png",
	},
	{
		alt: "MTN",
		src: "/images/mtn.svg",
	},
	{
		alt: "Voice of the east",
		src: "/images/voice-of-the-east.svg",
	},
];

const PartnerLogo = ({ alt, src }: { alt: string; src: string }) => (
	<img alt={alt} loading="lazy" decoding="async" className="shrink-0 h-14 w-auto" src={src} />
);

const PartnerLogos = ({ className }: { className?: string }) => (
	<div className={className}>
		{PARTNERS.map(({ alt, src }) => (
			<PartnerLogo key={alt} alt={alt} src={src} />
		))}
	</div>
);

const images = [
	{
		src: "/images/mes-1.jpg",
		alt: "",
		name: "My Enugu Story",
	},
	{
		src: "/images/mes-2.jpg",
		alt: "",
		name: "My Enugu Story",
	},
	{
		src: "/images/mes-3.jpg",
		alt: "",
		name: "My Enugu Story",
	},
	{
		src: "/images/mes-4.jpg",
		alt: "",
		name: "My Enugu Story",
	},
	{
		src: "/images/mes-5.jpg",
		alt: "",
		name: "My Enugu Story",
	},
	{
		src: "/images/mes-6.jpg",
		alt: "",
		name: "My Enugu Story",
	},
	{
		src: "/images/mes-7.jpg",
		alt: "",
		name: "My Enugu Story",
	},
	{
		src: "/images/mes-8.jpg",
		alt: "",
		name: "My Enugu Story",
	},
	{
		src: "/images/mes-9.jpg",
		alt: "",
		name: "My Enugu Story",
	},
	{
		src: "/images/mes-10.jpg",
		alt: "",
		name: "My Enugu Story",
	},
	{
		src: "/images/mes-11.jpg",
		alt: "",
		name: "My Enugu Story",
	},
	{
		src: "/images/mes-12.jpg",
		alt: "",
		name: "My Enugu Story",
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

const CarouselRow = ({ imageSet, direction }: { imageSet: typeof images; direction: number }) => {
	// For right scrolling (positive direction), start from -100%
	// For left scrolling (negative direction), start from 0
	const initial = direction > 0 ? { x: "-100%" } : {};
	const animateX = direction > 0 ? ["-100%", "0%"] : ["0%", `${direction}%`];

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

const HeroSection = () => {
	return (
		<section className="flex flex-col items-center pt-50 pb-12 relative w-full overflow-hidden">
			<section
				className="absolute top-[-280px] sm:top-[-320px] right-[-240px] left-[-80px]"
				style={{
					willChange: "transform",
					opacity: 1,
					transform: "rotate(20deg) skewX(-20deg) skewY(-10deg)",
					mask: "linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 60%) add",
				}}>
				<div className="space-y-1">
					<CarouselRow imageSet={row1Images} direction={-100} />
					<CarouselRow imageSet={row2Images} direction={-100} />
					<CarouselRow imageSet={row3Images} direction={100} />
				</div>
			</section>

			<div className="flex flex-col text-start items-start w-full justify-center px-6 md:px-14 gap-[30px] py-0 relative">
				<div className="flex flex-col">
					<Heading className="text-[48px] leading-[104%] -tracking-[1.5px] lg:text-[80px] lg:leading-[104%] lg:-tracking-[1.5px] font-anton font-normal max-w-[500px] uppercase">
						Celebration of Igbo Culture
					</Heading>

					{/* Subheading text */}
					<div className="flex flex-col max-w-[400px] w-full items-center relative mt-6">
						<p className="font-normal text-muted-foreground text-sm">
							Preserving the history, symbolism, and legacy of Ndi Igbo. One authentic story at a
							time.
						</p>
					</div>
				</div>

				<Suspense
					fallback={
						<Button
							variant={"default"}
							className={
								"relative z-10 text-xs text-[10px]! p-2 lg:px-4! lg:py-3 h-auto lg:text-[0.75rem]! tracking-[2.4px] uppercase"
							}>
							Submit your Story
						</Button>
					}>
					{/* Call to action buttons */}
					<div
						className="flex items-center gap-4 animate-fade-up w-auto justify-center"
						style={{ animationDelay: "0.40s", animationFillMode: "both" }}>
						<SubmissionDialog />
					</div>
				</Suspense>
			</div>

			{/* Partner logos */}
			{/* <div className="w-full my-8 mt-15">
				<div className="relative -mx-5 w-[calc(100%+1.25rem*2)] sm:hidden">
					<div className="scroll-in">
						<PartnerLogos className="box-border flex h-14 w-max shrink-0 items-center gap-x-[33.55px] pl-10 pr-10" />
					</div>
				</div>

				<div className="relative mx-auto hidden w-fit px-10 sm:block">
					<PartnerLogos className="flex h-14 shrink-0 items-center justify-center gap-x-[33.55px]" />
				</div>
			</div> */}
		</section>
	);
};

export default HeroSection;
