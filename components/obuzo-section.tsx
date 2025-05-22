import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const ObuzoSection = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayPause = () => {
    if (!videoRef.current) return; // Ensure videoRef is not null
    if (isPlaying) {
      videoRef.current.pause(); // Pause the video
    } else {
      videoRef.current.play(); // Play the video
    }
    setIsPlaying(!isPlaying); // Toggle the play/pause state
  };

  return (
    <div className="py-32 pb-0 px-6 md:px-10 lg:px-20">
      <div className="mx-auto max-w-2xl sm:text-center mb-16">
        <h1 className="text-pretty text-primary text-center text-4xl sm:text-5xl font-garamond font-normal">
          Catalyze economic growth in the Southeast
        </h1>
        <p className="mt-6 text-base leading-7 font-inter text-imaginative-timing-328979framerappboulder text-center text-pretty">
          Afia TV and in collaboration with our production partner, MarketStudio
          Ltd have both established the Obuzo advertising subsidy support scheme
          worth 1 Billion Naira to enable MSMEs across the south east region
          grow their market reach.
        </p>
        <div className="flex items-center justify-center w-full mt-12">
          <Link
            href="https://afiatv.net/obuzo"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-11 w-auto bg-imaginative-timing-328979framerappmine-shaft text-white text-sm rounded-[1000px] px-10 py-2"
            )}
          >
            Learn more
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 mb-12">
        <Card className="w-full max-w-[1150px] rounded-[28px] overflow-hidden border-0 p-0 z-10">
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="object-cover bg-cover size-full max-h-[650px]"
              loop
              playsInline
              poster="/images/obuzo_thumb.png"
            >
              <source src="https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL4ONfzOrBwPvE6BD4Jtl9i7gzYnUkWeF3fKbS2" />
            </video>

            {/* Pause button */}
            <button
              onClick={handlePlayPause}
              className="absolute bottom-6 left-6"
            >
              <Badge className="flex items-center gap-[3px] pl-2 pr-[15px] py-[7px] bg-imaginative-timing-328979framerappwhite-7 rounded-[1000px] backdrop-blur-[12.5px]">
                {isPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    focusable="false"
                    viewBox="0 0 24 24"
                    className="select-none size-4 inline-block fill-white flex-shrink-0 overflow-hidden z-10 rounded-full"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    focusable="false"
                    viewBox="0 0 24 24"
                    className="select-none size-4 inline-block fill-white flex-shrink-0 overflow-hidden z-10 rounded-full"
                  >
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                )}

                <span className="[font-family:'Inter',Helvetica] font-medium text-white text-[13.6px] tracking-[-0.14px] leading-[16.8px]">
                  {isPlaying ? "Pause" : "Play"}
                </span>
              </Badge>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ObuzoSection;
