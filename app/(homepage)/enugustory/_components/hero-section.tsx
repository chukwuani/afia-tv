"use client";

import { Heading } from "@/components/heading";
import { motion } from "motion/react";

import SubmissionCTA from "./submission-cta";
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


const HeroSection = () => {
	return (
		<section className="flex flex-col">
			<div className="relative flex md:min-h-[calc(100dvh-104px)] flex-col-reverse overflow-hidden md:p-6">
				<div className="z-10 mt-auto flex max-w-87.5 min-w-0 flex-col gap-4 bg-white max-md:pb-8 max-md:px-6 p-4">
					<div>
						<h1 className="text-sm uppercase font-azeret-mono font-medium">
							Golibe: Celebration of Igbo Culture
						</h1>
						<p className="mt-4 text-[.875rem] leading-[1.225rem] text-muted-foreground">
							Preserving the history, symbolism, and legacy of Ndi Igbo. One authentic story at a
							time.
						</p>

						<Suspense fallback={<Button className={
								"relative z-10 text-xs text-[10px]! p-2 lg:px-4! lg:py-3 h-auto lg:text-[0.75rem]! tracking-[2.4px] uppercase mt-4"
							}>Submit your Story</Button>}>
							<SubmissionCTA />
						</Suspense>
					</div>
				</div>

				<div className="md:absolute top-0 right-0 bottom-0 w-full grayscale-60">
					<img alt="banner_img" loading="lazy" width="3264" height="2448" src="/images/mes-3.jpg" />
				</div>
			</div>

			<section className="mx-auto flex flex-col items-center justify-center py-10 lg:py-20 px-6 md:px-10 lg:px-12 relative overflow-hidden">
			<section className="max-w-250">
				<h3 className="font-anton text-center text-[35px] tracking-[1px] lg:text-[68px] lg:tracking-[-1.5px] leading-[104%] uppercase text-balance">
					Reclaiming our narrative, celebrating local excellence, and preserving cultural identity.
				</h3>
			</section>
		</section>
		</section>
	);
};

export default HeroSection;
