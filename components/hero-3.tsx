import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const Hero3 = () => {
  return (
    <section className="pb-14">
      <section className="flex flex-col md:flex-row overflow-hidden border-none bg-transparent shadow-none px-6 md:px-12 md:items-center gap-[3rem] sm:gap-[4.5rem] w-full py-12">
        <section className="flex flex-col md:w-[44%] gap-8 relative">
          <h1
            className="font-sans text-5xl leading-[52px] sm:text-[4.5rem] sm:leading-[4.5rem] font-san tracking-[-3.6px]  font-normal mt-3 mb-auto animate-fade-up"
            style={{ animationDelay: "0.20s", animationFillMode: "both" }}
          >
            Cloud That Scale Your Business, Not Your Costs
          </h1>

          <p
            className="text-lg sm:text-[1.25rem] sm:!leading-7 font-san font-light text-muted-foreground animate-fade-up"
            style={{ animationDelay: "0.30s", animationFillMode: "both" }}
          >
            Get enterprise-grade cloud infrastructure without breaking the
            budget. Our optimized solutions help you maximize performance while
            reducing costs.
          </p>

          <div
            className="flex items-center gap-4 animate-fade-up font-san"
            style={{ animationDelay: "0.40s", animationFillMode: "both" }}
          >
            <div className="w-auto max-w-80">
              <Button className="relative rounded-full z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
                Get Started
              </Button>
            </div>

            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "inline-flex text-lg font-normal rounded-full h-14"
              )}
            >
              Contact Sales
            </Link>
          </div>
        </section>

        <div
          className="flex justify-end animate-fade-up m-auto max-h-[550px] md:w-[50%]"
          style={{ animationDelay: "0.10s", animationFillMode: "both" }}
        >
          <Image
            alt="Hero Image"
            className="rounded-[2rem] sm:h-[450px] sm:rounded-[4.5rem] object-cover w-full grayscale-[40%]"
            height={900}
            width={900}
            quality={100}
            src="/images/hero_image.png"
          />
        </div>
      </section>

      {/* <p
        className="text-[1.5rem] sm:text-[2rem] text-center !leading-7 font-san font-light text-primary animate-fade-up h-11 mt-8"
        style={{ animationDelay: "0.30s", animationFillMode: "both" }}
      >
        Trusted by 200+ customers
      </p> */}

      <section className="grid grid-cols-1 w-full gap-2 sm:gap-6 px-4 lg:px-24 lg:mx-12 aspect-[1.0] min-[720]:aspect-[1.14] min-[1280]:aspect-[1.9]">
        <div
          className="flex justify-end animate-fade-up"
          style={{ animationDelay: "0.10s", animationFillMode: "both" }}
        >
          <img
            alt="Preview image of the product interface"
            fetchPriority="high"
            width={4320}
            height={2745}
            decoding="async"
            className="size-full select-none rounded-2xl object-cover object-center"
            src="/images/hero-img-cover.png"
          />

          {/* <video
              className="object-cover rounded-[2rem] lg:rounded-[10rem] bg-cover w-full h-full"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/video-sample.mp4" />
            </video> */}
        </div>
      </section>
    </section>
  );
};
export default Hero3;
