"use client";

import React from "react";

import HeroSection from "@/components/hero-section";
import BrandSection from "@/components/brand-section";
import OtherServices from "@/components/other-services";
import Events from "@/components/events";

import ContactForm from "@/components/contact-form";

import { ContainerByAnima } from "@/components/ContainerByAnima";

const HomePage = () => {
  return (
    <main className="relative w-full">
      <HeroSection />

      <BrandSection />

      <OtherServices />

      {/* <section className="pb-0 flex flex-col-reverse md:flex-row-reverse overflow-hidden border-none bg-transparent shadow-none px-6 md:px-12 md:items-center gap-[3rem] sm:gap-[4.5rem] w-full py-12">
        <section className="flex flex-col md:w-[44%] gap-8 relative">
          <h1 className="text-5xl leading-[52px] font-san tracking-[-3.6px]  font-normal mt-3 mb-auto animate-fade-up max-w-[500px]">
            Redefining the Cloud, Together
          </h1>
          <p className="text-lg sm:text-[1.25rem] sm:!leading-8 font-san font-light text-muted-foreground animate-fade-up">
            We are committed to empowering our customers with the tools they
            need to scale and succeed in today's digital landscape by offering
            high-quality, cost-effective solutions that don't compromise on
            performance or security.
          </p>
          <div className="flex animate-fade-up font-san">
            <div className="w-auto max-w-80">
              <a
                className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 relative rounded-full z-10 h-14 text-base"
                href="/about/"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        <div className="flex justify-end animate-fade-up m-auto md:w-[50%]">
          <img
            alt="Hero Image"
            loading="lazy"
            width="900"
            height="900"
            decoding="async"
            data-nimg="1"
            className="rounded-[2rem] sm:rounded-[4.5rem] object-cover w-full"
            src="/images/product-cover-ios.webp"
          />
        </div>
      </section> */}

      <Events />

      <ContactForm />

      <ContainerByAnima />
    </main>
  );
};

export default HomePage;
