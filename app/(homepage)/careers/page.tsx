"use client";

import React from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/heading";

import { cn } from "@/lib/utils";

const CareerPage = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(true);

  // --- Mute/Unmute Handler ---
  const handleMuteUnmute = (): void => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted; // Toggle the muted property of the video element
      setIsMuted(videoRef.current.muted); // Update our state to reflect the actual mute status
    }
  };

  const ourValues = [
    {
      id: 1,
      title: "Multi- Camera Event Coverage",
      description:
        "We provide full audio and ISO camera recording for sports, e-gaming, music concerts, awards ceremonies, corporate events, and television shows.",
      iconSrc: "/images/multi-media.svg",
      size: "w-[34px] h-[34px]",
    },
    {
      id: 4,
      title: "Live streaming services",
      description:
        "We offer live streaming services for events, enabling our clients to reach a wider audience.",
      iconSrc: "/images/live_streaming.svg",
      size: "w-[44px] h-[44px]",
    },
    {
      id: 2,
      title: "Multi- Camera Event Coverage",
      description:
        "We provide full audio and ISO camera recording for sports, e-gaming, music concerts, awards ceremonies, corporate events, and television shows.",
      iconSrc: "/images/multi-media.svg",
      size: "w-[34px] h-[34px]",
    },
  ];

  const leadershipTeam = [
    {
      id: 1,
      name: "Alex Mercer",
      position: "Chief Executive Officer",
      imageSrc:
        "https://cdn.prod.website-files.com/669145221abe140e6380fdb0/66c4b35f8107881ef188a1d2_alexander-hipp-iEEBWgY_6lA-unsplash-p-500.webp",
    },
    {
      id: 2,
      name: "Jordan Lee",
      position: "Chief Technology Officer",
      imageSrc:
        "https://cdn.prod.website-files.com/669145221abe140e6380fdb0/66c4b3b4324137d15f5ab593_ryan-hoffman-Ft4p5E9HjTQ-unsplash-p-800.webp",
    },
    {
      id: 3,
      name: "Taylor Smith",
      position: "Chief Marketing Officer",
      imageSrc:
        "https://cdn.prod.website-files.com/669145221abe140e6380fdb0/66c4b3979f806b5bb6928928_ronny-sison-4lnzxFIgTmg-unsplash-p-500.webp",
    },
    {
      id: 4,
      name: "Jamie Johnson",
      position: "Chief Financial Officer",
      imageSrc:
        "https://cdn.prod.website-files.com/669145221abe140e6380fdb0/66c4b3db5452961edb353fa7_meg-wagener-M7fbJyBuAag-unsplash.webp",
    },
    {
      id: 5,
      name: "Morgan Brown",
      position: "Chief Operations Officer",
      imageSrc:
        "https://cdn.prod.website-files.com/669145221abe140e6380fdb0/66c4b3fd9d79e4e952b3f1bb_darshan-patel-QJEVpydulGs-unsplash-p-800.webp",
    },
    {
      id: 6,
      name: "Casey Taylor",
      position: "Chief Content Officer",
      imageSrc:
        "https://cdn.prod.website-files.com/669145221abe140e6380fdb0/66c4b4753a52a401697c88a3_zoran-borojevic-4BG2yKyCaWg-unsplash-p-800.webp",
    },
  ];

  return (
    <section className="flex flex-col items-center pt-28 relative w-full">
      <div className="flex flex-col max-w-[1200px] items-center gap-[50px]  py-0 relative w-full">
        <div className="flex flex-col w-full max-w-[1000px] items-center justify-center gap-8 px-[32px]">
          <div className="mx-auto sm:text-center">
            <Heading className="text-[3rem] leading-[4rem] -tracking-[.053rem] lg:text-[4.6rem] lg:leading-[6.4rem] lg:-tracking-[.078rem] text-center font-epilogue font-normal">
              Join Us in Shaping the Future of Media.
            </Heading>

            {/* Subheading text */}
            <div className="flex flex-col max-w-[480px] w-full items-center relative text-center mt-6 mx-auto">
              <p className="font-haffer font-medium text-muted-foreground  text-base leading-[28px] tracking-[.009rem]">
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
                  "relative rounded-full z-10 h-14 text-base px-5 font-haffer text-[0.75rem] tracking-[2.4px] uppercase"
                )}
              >
                Open Positions
              </Link>
            </div>
          </div>
        </div>

        {/* Video/image preview card */}
        <Card className="w-full max-w-[1150px] max-h-[650px] rounded-[28px] max-lg:rounded-none overflow-hidden border-0 p-0 z-10 aspect-[4/3]">
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="object-cover bg-cover size-full max-h-[650px]"
              loop
              playsInline
              autoPlay
              muted
              poster="/images/hero_thumbnail.png"
            >
              <source src="https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL4ENDgMAtEAkupNRIDY2jC6ULsoz1M37VwebW4" />
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

      <div className="py-32 pb-0 px-6 md:px-10 lg:px-20">
        <div className="text-center mb-16 max-w-[650px] mx-auto">
          <h1
            className="text-pretty text-[2.5rem] leading-[4rem] -tracking-[.053rem] lg:text-[4rem] lg:leading-[5rem] lg:-tracking-[.078rem] text-center font-epilogue font-normal mx-auto
              "
          >
            Our Values
          </h1>
        </div>

        {/* Our Values */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          {ourValues.map((value) => (
            <Card
              key={value.id}
              className="min-h-[280px] bg-[#ffffff0b] rounded-[28px] overflow-hidden shadow-none border-none"
            >
              <CardContent className="flex flex-col justify-between h-full p-6 gap-10">
                <div className={`${value.size}`}>
                  <img
                    className={`${value.size}`}
                    alt={`${value.title} icon`}
                    src={value.iconSrc}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-epilogue font-medium text-white text-[26px] -tracking-[.053rem] leading-[42px]">
                    {value.title}
                  </h3>
                  <p className="font-haffer font-medium text-muted-foreground text-sm leading-[28px] tracking-[.009rem]">
                    {value.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="py-32 px-6 md:px-10 lg:px-20">
        <div className="text-center mb-16 max-w-[650px] mx-auto">
          <h1
            className="text-pretty text-[2.5rem] leading-[4rem] -tracking-[.053rem] lg:text-[4rem] lg:leading-[5rem] lg:-tracking-[.078rem] text-center font-epilogue font-normal mx-auto
              "
          >
            Meet our leadership team
          </h1>

          {/* Subheading text */}
          <div className="flex flex-col max-w-[480px] w-full items-center relative text-center mt-6 mx-auto">
            <p className="font-haffer font-medium text-muted-foreground  text-base leading-[28px] tracking-[.009rem]">
              Connecting you to the Heart of the Southeast. Discover the
              Richness and Diversity of Our Region&apos;s Stories.
            </p>
          </div>
        </div>

        {/* Leadership team */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full">
          {leadershipTeam.map((memeber) => (
            <Card
              key={memeber.id}
              className="min-h-[280px] bg-transparent overflow-hidden shadow-none border-none"
            >
              <CardContent className="flex flex-col justify-between h-full gap-10 pt-6">
                <img
                  alt={memeber.name}
                  className="w-full h-auto object-cover rounded-[2rem]"
                  src={memeber.imageSrc}
                />

                <div className="flex flex-col">
                  <h3 className="font-epilogue font-medium text-white text-[26px] -tracking-[.053rem] leading-[42px]">
                    {memeber.name}
                  </h3>
                  <p className="font-haffer text-[0.75rem] tracking-[2.4px] uppercase font-medium text-muted-foreground">
                    {memeber.position}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerPage;
