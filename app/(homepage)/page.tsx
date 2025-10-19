"use client";

import HeroSection from "@/components/hero-section";
import BrandSection from "@/components/brand-section";
// import OtherServices from "@/components/other-services";
import Events from "@/components/events";

import MainArticleSection from "@/components/main-article-section";
// import RateCard from "@/components/rate-card";
import Component from "@/components/comp-345";
import JoinCommunity from "@/components/join-community";

const HomePage = () => {
	return (
		<main className="relative w-full">
			<HeroSection />

			<BrandSection />

			{/* <OtherServices /> */}

			<MainArticleSection />

			<JoinCommunity />

			<Events />

			{/* <RateCard /> */}

			<Component />
		</main>
	);
};

export default HomePage;
