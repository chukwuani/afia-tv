import React from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/heading";

import { cn } from "@/lib/utils";

const HeroSection = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(false);

  // --- Mute/Unmute Handler ---
  const handleMuteUnmute = (): void => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted; // Toggle the muted property of the video element
      setIsMuted(videoRef.current.muted); // Update our state to reflect the actual mute status
    }
  };

  return (
    <section className="flex flex-col items-center pt-28 relative w-full">
      {/* Background glow effect */}
      {/* <svg
        className="absolute -bottom-10 right-0 -z-10 opacity-60 max-lg:h-[700px]"
        width="501"
        height="892"
        viewBox="0 0 501 892"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_2_82523)">
          <path
            d="M790.24 473.774C790.24 644.699 629.468 787.701 457.697 787.701C285.925 787.701 104 644.699 104 473.774C104 302.003 285.925 104 457.697 104C629.468 104 790.24 302.003 790.24 473.774Z"
            fill="#FFFBDB"
          />
        </g>
        <g filter="url(#filter1_f_2_82523)">
          <path
            d="M105.106 508.099C143.357 408.242 251.992 190.893 380.517 120.349C285.895 156.587 98.3414 284.871 105.106 508.099Z"
            fill="#FFE55F"
          />
        </g>
        <g filter="url(#filter2_f_2_82523)">
          <path
            d="M807.298 489.993C744.505 576.547 583.318 758.373 440.914 793.249C541.692 782.735 756.057 707.365 807.298 489.993Z"
            fill="#FFE55F"
          />
        </g>
        <g filter="url(#filter3_f_2_82523)">
          <path
            d="M632.977 351.283C632.977 422.854 565.624 482.732 493.663 482.732C421.701 482.732 345.486 422.854 345.486 351.283C345.486 279.358 421.701 196.449 493.663 196.449C565.624 196.449 632.977 279.358 632.977 351.283Z"
            fill="#FF9E57"
          />
        </g>
        <g filter="url(#filter4_f_2_82523)">
          <path
            d="M359.982 334.155C324.227 305.164 317.704 337.376 318.912 357.106C382.128 416.295 518.706 540.955 559.293 566.08C610.026 597.487 630.562 562.456 622.106 544.337C613.65 526.218 404.676 370.393 359.982 334.155Z"
            fill="white"
          />
        </g>
        <g filter="url(#filter5_f_2_82523)">
          <path
            d="M227.109 413.879C175.892 461.231 174.362 535.882 179.999 567.288C199.326 598.695 316.497 697.746 379.31 707.41C442.123 717.073 529.095 634.933 530.303 601.111C531.511 567.288 471.113 584.199 416.756 567.288C362.398 550.377 291.13 354.69 227.109 413.879Z"
            fill="#FFE55F"
          />
        </g>
        <g filter="url(#filter6_f_2_82523)">
          <path
            d="M523.054 533.466C501.795 576.952 350.721 632.92 277.842 655.468L221.068 689.291C239.993 716.268 301.517 772.155 396.22 779.886C514.599 789.55 589.491 729.153 654.72 655.468C719.949 581.783 549.629 479.108 523.054 533.466Z"
            fill="#98BBFF"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_2_82523"
            x="0"
            y="0"
            width="894.24"
            height="891.701"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="52"
              result="effect1_foregroundBlur_2_82523"
            />
          </filter>
          <filter
            id="filter1_f_2_82523"
            x="50.9277"
            y="66.3489"
            width="383.59"
            height="495.75"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="27"
              result="effect1_foregroundBlur_2_82523"
            />
          </filter>
          <filter
            id="filter2_f_2_82523"
            x="386.914"
            y="435.993"
            width="474.385"
            height="411.256"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="27"
              result="effect1_foregroundBlur_2_82523"
            />
          </filter>
          <filter
            id="filter3_f_2_82523"
            x="241.486"
            y="92.4495"
            width="495.49"
            height="494.283"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="52"
              result="effect1_foregroundBlur_2_82523"
            />
          </filter>
          <filter
            id="filter4_f_2_82523"
            x="214.779"
            y="218.576"
            width="513.172"
            height="464.099"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="52"
              result="effect1_foregroundBlur_2_82523"
            />
          </filter>
          <filter
            id="filter5_f_2_82523"
            x="73.7637"
            y="298.765"
            width="560.557"
            height="513.43"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="52"
              result="effect1_foregroundBlur_2_82523"
            />
          </filter>
          <filter
            id="filter6_f_2_82523"
            x="117.068"
            y="414.201"
            width="656.426"
            height="470.705"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="52"
              result="effect1_foregroundBlur_2_82523"
            />
          </filter>
        </defs>
      </svg> */}

      <div className="flex flex-col max-w-[1200px] items-center gap-[100px]  py-0 relative w-full">
        <div className="flex flex-col w-full max-w-[1150px] items-center justify-center gap-8 px-[32px]">
          <div className="flex flex-col w-full max-w-[1150px] items-center justify-center gap-7">
            {/* Headline text */}
            <Heading className="text-[8vw] leading-none lg:text-4xl xl:text-[80px] text-balance font-sans font-bold text-center">
              Telling the Stories That Matter to You - Culture. Stories.
              Connection.
            </Heading>

            {/* Subheading text */}
            <div className="flex flex-col max-w-[480px] w-full items-center relative text-center">
              <p className="font-Inter font-meFum text-imaginative-timing-328979framerappboulder tracking-[-.3px] leading-[1.3] text-[1.125rem]">
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
