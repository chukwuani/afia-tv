import { PlayIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const ContainerWrapperByAnima = (): JSX.Element => {
  // Video data for the carousel
  const videos = [
    {
      id: 1,
      thumbnail: "/cmal5sv88pt8hgbwkrw3dfwsbm-mp4.png",
      opacity: 1,
      width: 360,
      height: 600,
    },
    {
      id: 2,
      thumbnail: "/ylmwilqoiii0wuvdezw9ppwp2c-mp4-1.png",
      opacity: 0.5,
      width: 292,
      height: 510,
    },
    {
      id: 3,
      thumbnail: "/izdai9of4pgk1zbstyej7n4gpzc-mp4-1.png",
      opacity: 0.5,
      width: 282,
      height: 510,
    },
    {
      id: 4,
      thumbnail: "/ylmwilqoiii0wuvdezw9ppwp2c-mp4.png",
      opacity: 0.5,
      width: 282,
      height: 497,
    },
    {
      id: 5,
      thumbnail: "/izdai9of4pgk1zbstyej7n4gpzc-mp4.png",
      opacity: 0.5,
      width: 292,
      height: 497,
    },
  ];

  return (
    <section className="w-full py-[52px] flex justify-center">
      <div className="flex flex-col items-center gap-[58px] max-w-[1200px]">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-[18px] max-w-[600px] px-[25px]">
          <div className="flex items-center gap-2.5">
            <div className="w-[9px] h-[9px] bg-imaginative-timing-328979framerappoutrageous-orange rounded-[1000px]" />
            <span className="text-imaginative-timing-328979framerappblack text-lg tracking-[-0.72px] leading-[27px] font-medium [font-family:'Inter',Helvetica]">
              Work
            </span>
          </div>

          <div className="text-center">
            <h2 className="[font-family:'Inter',Helvetica] font-medium text-imaginative-timing-328979framerappmine-shaft text-[47.3px] tracking-[-1.50px] leading-[64px]">
              Explore our video editing
              <br />
              work and projects
            </h2>
          </div>
        </div>

        {/* Video Carousel */}
        <div className="w-full">
          <Carousel className="w-full">
            <CarouselContent className="h-[600px] items-center">
              {videos.map((video) => (
                <CarouselItem
                  key={video.id}
                  className="flex justify-center items-center"
                  style={{ opacity: video.opacity }}
                >
                  <Card
                    className="rounded-[22px] overflow-hidden border-0"
                    style={{
                      width: video.width,
                      height: video.height,
                      backgroundImage: `url(${video.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="h-full w-full flex items-end p-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 bg-imaginative-timing-328979framerappwhite-7 text-white rounded-full backdrop-blur-[12.5px] hover:bg-imaginative-timing-328979framerappwhite-10"
                      >
                        <PlayIcon className="h-4 w-4" />
                        <span className="[font-family:'Inter',Helvetica] font-medium text-[13.6px] tracking-[-0.14px]">
                          Play
                        </span>
                      </Button>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-imaginative-timing-328979framerappoutrageous-orange text-white border-0 hover:bg-imaginative-timing-328979framerappoutrageous-orange/90" />
            <CarouselNext className="right-4 bg-imaginative-timing-328979framerappoutrageous-orange text-white border-0 hover:bg-imaginative-timing-328979framerappoutrageous-orange/90" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
