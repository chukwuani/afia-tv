import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "./ui/button";
import { Heading } from "./heading";

import { cn } from "@/lib/utils";
import { Icons } from "./icons";

const Hero2 = () => {
  return (
    <section>
      <section className="flex flex-col md:flex-col gap-24 overflow-hidden border-none bg-transparent shadow-none md:items-center w-full py-24 relative">
        {/* Gradient */}
        <div className="absolute w-[900px] h-[700px] block blur-[72px] bg-[#ff652d] overflow-hidden opacity-15 z-10 rounded-full top-[412px]"></div>

        <section className="flex item-center justify-center w-full relative px-4 lg:px-12">
          <div className="flex flex-col items-start justify-center text-center max-w-4xl">
            <Heading className="text-[8vw] leading-none lg:text-4xl xl:text-7xl text-balance font-eb font-normal">
              The New Voice of the East - Culture. Stories. Connection.
            </Heading>

            <p className="mt-6 text-base font-normal lg:text-lg text-muted-foreground text-pretty max-w-xl mx-auto">
              Get the latest news and in-depth analysis from Southeast Nigeria.
              Delivering today's stories with our unique perspective.
            </p>

            <div
              className="flex items-center gap-4 animate-fade-up mt-7 w-full justify-center"
              style={{ animationDelay: "0.40s", animationFillMode: "both" }}
            >
              <div className="w-auto max-w-80">
                <Link
                  href="/products"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "relative rounded-full z-10 h-14 text-base px-5 font-inter text-[0.75rem] tracking-[2.4px] uppercase"
                  )}
                >
                  Get Started
                </Link>

                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "ml-4 inline-flex text-base font-normal rounded-full relative z-10 h-14 px-5 font-inter text-[0.75rem] tracking-[2.4px] uppercase"
                  )}
                >
                  <Icons.live />
                  Live
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 w-full gap-2 sm:gap-6 lg:mx-12 z-10">
          <div
            className="flex justify-end animate-fade-up"
            style={{ animationDelay: "0.10s", animationFillMode: "both" }}
          >
            <video
              className="object-cover rounded-[1.75rem] lg:rounded-[10rem] bg-cover w-full h-full max-h-[650px]"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/video-sample.mp4" />
            </video>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Hero2;
