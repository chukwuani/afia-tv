import React from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/heading";

import { cn } from "@/lib/utils";

const HeroSection = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(true);

  // --- Mute/Unmute Handler ---
  const handleMuteUnmute = (): void => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted; // Toggle the muted property of the video element
      setIsMuted(videoRef.current.muted); // Update our state to reflect the actual mute status
    }
  };

  return (
    <section className="flex flex-col items-center pt-28 relative w-full">
      <div className="flex flex-col max-w-[1200px] items-center gap-[100px]  py-0 relative w-full">
        <div className="flex flex-col w-full max-w-[1150px] items-center justify-center gap-8 px-[32px]">
          <div className="mx-auto max-w-2xl sm:text-center">
            <Heading className="text-5xl text-center leading-[52px] sm:text-[4.5rem] sm:leading-[4.5rem] font-sans tracking-[-3.6px] font-normal animate-fade-up">
              Telling the stories, Shaping the Culture.
            </Heading>

            {/* Subheading text */}
            <div className="flex flex-col max-w-[480px] w-full items-center relative text-center mt-6 mx-auto">
              <p className="font-Inter font-medium text-imaginative-timing-328979framerappboulder tracking-[-.3px] leading-[1.3] mx-auto text-[1.125rem]">
                Connecting you to the Heart of the Southeast. Discover the
                Richness and Diversity of Our Region&apos;s Stories.
              </p>
            </div>
          </div>

          {/* Call to action buttons */}
          <div
            className="flex items-center gap-4 animate-fade-up mt-3 w-full justify-center"
            style={{ animationDelay: "0.40s", animationFillMode: "both" }}
          >
            <div className="w-auto max-w-80">
              <Link
                href="/news"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "relative rounded-full z-10 h-14 text-base px-5 font-inter text-[0.75rem] tracking-[2.4px] uppercase"
                )}
              >
                Read our Stories
              </Link>
            </div>
          </div>
        </div>

        {/* Video/image preview card */}
        <Card className="w-full max-w-[1150px] max-h-[650px] rounded-[28px] max-md:rounded-none rounded-bl-none rounded-br-none overflow-hidden border-0 p-0 z-10">
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="object-cover bg-cover size-full max-h-[650px]"
              loop
              playsInline
              autoPlay
              muted
              poster="/images/hero_thumbnail.jpg"
            >
              <source src="https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL4vxwHSP8DDBPdWyeYsSAVJ6GiLj4hFrO89xgl" />
            </video>

            {/* Pause button */}
            <button
              onClick={handleMuteUnmute}
              className="absolute bottom-6 left-6"
            >
              <Badge className="flex items-center gap-[3px] px-[15px] py-[7px] bg-imaginative-timing-328979framerappwhite-7 rounded-[1000px] backdrop-blur-[12.5px]">
                <span className="[font-family:'Inter',Helvetica] font-medium text-white text-[13.6px] tracking-[-0.14px] leading-[16.8px]">
                  {isMuted ? "Unmute" : "Mute"}
                </span>
              </Badge>
            </button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default HeroSection;
