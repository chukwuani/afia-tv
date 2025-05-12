import React from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/icons";

import { cn } from "@/lib/utils";
import { Heading } from "../heading";

export const HeaderByAnima = () => {
  // Data for the headline words to enable mapping
  const headlineFirstRow = [
    { text: "Make", left: "13px" },
    { text: "every", left: "174px" },
    { text: "second", left: "333px" },
    { text: "count", left: "540px" },
  ];

  const headlineSecondRow = [
    { text: "with", left: "122px" },
    { text: "Pro+", left: "311px" },
    { text: "edits", left: "452px" },
  ];

  return (
    <header className="flex flex-col items-center pt-32 relative w-full">
      {/* Background glow effect */}
      <div className="bg-gradient-to-b from-[#f400] from-[3.065%] to-[#ffbaa180] to-[45.1%] absolute inset-0 bottom-0 opacity-60 overflow-hidden z-10 flex-none" />

      <div className="flex flex-col max-w-[1200px] items-center gap-[100px] px-[25px] py-0 relative w-full">
        <div className="flex flex-col w-full max-w-[1150px] items-center justify-center gap-8">
          <div className="flex flex-col w-full max-w-[1150px] items-center justify-center gap-7">
            {/* Headline text */}
            <Heading className="text-[8vw] leading-none lg:text-4xl xl:text-6xl xl:text-[64px] text-balance font-garamond font-normal text-center">
              Telling the Stories That Matter to You - Culture. Stories.
              Connection.
            </Heading>

            {/* Subheading text */}
            <div className="flex flex-col max-w-[480px] w-full items-center">
              <div className="relative w-full text-center">
                <p className="text-lg font-inter font-medium text-muted-foreground sm:text-xl tracking-[-0.90px] leading-[33px]">
                  Connecting you to the Heart of the Southeast. Discover the
                  Richness and Diversity of Our Region's Stories.
                </p>
              </div>
            </div>
          </div>

          {/* Call to action buttons */}
          <div
            className="flex items-center gap-4 animate-fade-up mt-3 w-full justify-center"
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

        {/* Video/image preview card */}
        <Card className="w-full max-w-[1150px] h-[650px] rounded-[28px] rounded-bl-none rounded-br-none overflow-hidden border-0 p-0 z-10">
          <div className="relative w-full h-full">
            <video
              className="object-cover bg-cover size-full max-h-[650px]"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/video-sample.mp4" />
            </video>

            {/* Pause button */}
            <div className="absolute bottom-6 left-6">
              <Badge className="flex items-center gap-[3px] pl-2 pr-[15px] py-[7px] bg-imaginative-timing-328979framerappwhite-7 rounded-[1000px] backdrop-blur-[12.5px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false"
                  viewBox="0 0 24 24"
                  className="select-none size-4 inline-block fill-white flex-shrink-0 overflow-hidden z-10 rounded-full"
                >
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                </svg>
                <span className="[font-family:'Inter',Helvetica] font-medium text-white text-[13.6px] tracking-[-0.14px] leading-[16.8px]">
                  Pause
                </span>
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </header>
  );
};
