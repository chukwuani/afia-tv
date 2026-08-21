import HeroSection from "./_components/hero-section";
import SubmissionsGallery from "./_components/submission-gallery";
// import VideoCard from "./_components/video-card";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "My Enugu Story",
};

export default function EnuguStoryPage() {
	return (
		<main className="relative w-full">
			<HeroSection />

			{process.env.NEXT_PUBLIC_NODE_ENV === "development" && <SubmissionsGallery />}
		</main>
	);
}
