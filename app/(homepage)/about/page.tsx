import HeroSection from "@/components/about-hero-section";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "About Us",
};

export default function AboutPage() {
	return <HeroSection />;
}
