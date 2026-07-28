import HeroSection from "@/app/(homepage)/enugustory/_components/hero-section";
import VideoCard from "./_components/video-card";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "My Enugu Story",
};

export default function EnuguStoryPage() {
	return (
		<main className="relative w-full">
			<HeroSection />

			<VideoCard />
		</main>
	);
}
