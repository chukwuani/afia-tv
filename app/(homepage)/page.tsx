"use client";
import AnniversaryConfetti from "@/components/anniversary-confetti";
// import AnniversaryModal from '@/components/anniversary-modal'
import AnniversaryBanner from "@/components/anniversary-banner";
// import AnniversaryBadge from '@/components/anniversary-badge'
// import AnniversaryStars from "@/components/anniversary-stars";
import HeroSection from "@/components/hero-section";
import BrandSection from "@/components/brand-section";
// import Events from "@/components/events";

import TopStories from "@/components/top-stories";
import Faq from "@/components/faq";
import RateCard from "@/components/rate-card";
import AboutSection from "@/components/about";
import VideoFeed from "@/components/video-feed";

export default function HomePage() {
	return (
		<>
			<AnniversaryConfetti />
			<AnniversaryBanner />
			<main className="relative w-full">
				<HeroSection />

				<AboutSection />

				<TopStories />

				<VideoFeed />

				<BrandSection />

				<Faq />

				{/* <RateCard /> */}

				{/* <Events /> */}
			</main>
		</>
	);
}
