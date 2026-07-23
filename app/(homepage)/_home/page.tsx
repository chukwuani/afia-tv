"use client";

import Events from "@/components/events";
import Faq from "@/components/faq";
import RateCard from "@/components/rate-card";

import HeroSection from "@/components/hero-section";
import BrandSection from "@/components/brand-section";
import TopStories from "@/components/top-stories";
import AboutSection from "@/components/about";
import VideoFeedSection from "@/components/layout/video-feed-section";

export default function HomePage() {
    return (
        <main className="relative w-full">
            <HeroSection />

            <AboutSection />

            <TopStories />

            <VideoFeedSection />

            <BrandSection />

            {/* <Faq /> */}

            {/* <RateCard /> */}

            {/* <Events /> */}
        </main>
    );
}
