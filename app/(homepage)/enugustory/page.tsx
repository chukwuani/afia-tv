import HeroSection from "@/app/(homepage)/enugustory/_components/hero-section";
import VideoCard from "./_components/video-card";

import { Metadata } from "next";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
	title: "My Enugu Story",
	description: "Preserving the history, symbolism, and legacy of Ndi Igbo. One authentic story at a time.",
};

export default function HomePage() {
	return (
		<main className="relative w-full">
			<HeroSection />

			<VideoCard />
		</main>
	);
}
