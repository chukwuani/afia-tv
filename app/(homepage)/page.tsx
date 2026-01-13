import HeroSection from "@/components/hero-section";
import BrandSection from "@/components/brand-section";
import Events from "@/components/events";

import TopStories from "@/components/top-stories";
import Faq from "@/components/faq";
import RateCard from "@/components/rate-card";

export default function HomePage() {
	return (
		<main className="relative w-full">
			<HeroSection />

			<BrandSection />

			<TopStories />

			<RateCard />

			<Events />

			<Faq />
		</main>
	);
}
