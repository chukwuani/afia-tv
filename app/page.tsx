"use client";

import HeroSection from "@/components/hero-section";
import BrandSection from "@/components/brand-section";
import OtherServices from "@/components/other-services";
import Events from "@/components/events";

import ContactForm from "@/components/contact-form";

import FooterSection from "@/components/footer-section";
import ObuzoSection from "@/components/obuzo-section";
import { Navbar } from "@/components/layout/navbar";

const HomePage = () => {
  return (
    <main className="relative w-full">
      <Navbar />

      <HeroSection />

      <BrandSection />

      <OtherServices />

      <ObuzoSection />

      <Events />

      <ContactForm />

      <FooterSection />
    </main>
  );
};

export default HomePage;
