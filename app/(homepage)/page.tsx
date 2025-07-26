"use client";

import HeroSection from "@/components/hero-section";
import BrandSection from "@/components/brand-section";
import OtherServices from "@/components/other-services";
import Events from "@/components/events";

import ContactForm from "@/components/contact-form";

const HomePage = () => {
  return (
    <main className="relative w-full">
      <HeroSection />

      <BrandSection />

      <OtherServices />

      {/* <SectionProcess /> */}

      {/* <ObuzoSection /> */}

      <Events />

      <ContactForm />
    </main>
  );
};

export default HomePage;
