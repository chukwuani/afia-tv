import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "./ui/button";

import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="h-dvh relative grid place-content-center mx-auto w-[90%] rounded-[2.5rem] overflow-hidden">
      <span className="z-2 opacity-40 absolute inset-0 bg-background"></span>;
      <section className="flex flex-col gap-8 relative text-center items-center justify-center z-10">
        <h1
          className="w-[50%] text-5xl leading-[52px] sm:text-[80px] sm:leading-[4.5rem] font-garamond tracking-[-3.6px]  font-normal mt-3 mb-auto animate-fade-up"
          style={{ animationDelay: "0.20s", animationFillMode: "both" }}
        >
          Do your best work, supported by your subscribers
        </h1>

        <p
          className="w-[44%] text-base font-inter font-light text-[#fffc] animate-fade-up"
          style={{ animationDelay: "0.30s", animationFillMode: "both" }}
        >
          Substack lets independent writers and podcasters publish directly to
          their audience and get paid through subscriptions.
        </p>

        <div
          className="flex items-center gap-4 animate-fade-up font-san"
          style={{ animationDelay: "0.40s", animationFillMode: "both" }}
        >
          <div className="w-auto max-w-80">
            <Link
              href="/products"
              className={cn(
                buttonVariants({ variant: "default" }),
                "relative rounded-full z-10 h-12 px-8 w-full text-sm shadow-lg transition-shadow duration-300 hover:shadow-xl"
              )}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <video
        className="object-cover z-[-100] bg-center bg-cover w-full h-full m-auto absolute inset-[-100%]"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video-sample.mp4" data-wf-ignore="true" />
      </video>
    </section>
  );
};
export default Hero;
