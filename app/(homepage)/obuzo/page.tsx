import { Metadata } from "next";

import HeroSection from "./_components/hero-section";
import AboutObuzo from "./_components/about-obuzo";
// import HowObuzoWorks from "./_components/how-obuzo";

export const metadata: Metadata = {
    title: "Obuzo",
};

export default function EnuguStoryPage() {
    return (
        <main className="relative w-full">
            <HeroSection />

            <AboutObuzo />

            {/* <HowObuzoWorks /> */}
        </main>
    );
}
