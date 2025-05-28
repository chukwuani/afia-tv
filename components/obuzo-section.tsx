import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Heading } from "./heading";

const ObuzoSection = () => {
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
    <div className="py-32 pb-0 px-6 md:px-10 lg:px-20">
      <div className="mx-auto sm:text-center mb-16">
        <Heading className="text-[3rem] leading-[4rem] -tracking-[.053rem] md:text-[4rem] md:leading-[5rem] md:-tracking-[.078rem] text-center font-epilogue font-normal max-w-4xl mx-auto">
          Obuzo Advertising Subsidy Support Scheme.
        </Heading>

        {/* Subheading text */}
        <div className="flex flex-col max-w-3xl w-full items-center relative text-center mt-6 mx-auto">
          <p className="font-epilogue font-medium text-imaginative-timing-328979framerappboulder text-base leading-[28px] tracking-[.009rem]">
            Afia TV and in collaboration with our production partner,
            MarketStudio Ltd have both established the Obuzo advertising subsidy
            support scheme worth 1 Billion Naira to enable MSMEs across the
            south east region grow their market reach.
          </p>
        </div>

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
        {/* Video/image preview card */}
        <Card className="w-full max-w-[1150px] max-h-[650px] rounded-[28px] max-md:rounded-none overflow-hidden border-0 p-0 z-10 aspect-[4/3]">
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="object-cover bg-cover size-full max-h-[650px]"
              loop
              muted
              autoPlay
              playsInline
              poster="/images/obuzo_thumb.png"
            >
              <source src="https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL4ONfzOrBwPvE6BD4Jtl9i7gzYnUkWeF3fKbS2" />
            </video>

            {/* Mute/Unmute button */}
            <button
              onClick={handleMuteUnmute}
              className="absolute bottom-6 left-6"
            >
              <Badge className="flex items-center gap-[3px] px-[7px] py-[7px] bg-imaginative-timing-328979framerappwhite-7 rounded-[1000px] backdrop-blur-[12.5px] font-epilogue">
                <span className="[font-family:'Inter',Helvetica] font-medium text-white text-[13.6px] tracking-[-0.14px] leading-[16.8px]">
                  {isMuted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#e3e3e3"
                    >
                      <path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#e3e3e3"
                    >
                      <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" />
                    </svg>
                  )}
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
