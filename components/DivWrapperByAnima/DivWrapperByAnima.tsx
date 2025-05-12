import React from "react";
import { Card, CardContent } from "@/components/ui/card";

// Feature data for mapping
const features = [
  {
    id: 1,
    title: "Video Editing",
    description:
      "Edit videos with a range of effects, transitions, and color grading",
    iconSrc: "/kfrt2xcibbhj3alxtdcu3ztyt4-svg.svg",
    isImage: false,
  },
  {
    id: 2,
    title: "Project Management",
    description:
      "Streamline workflows, assign tasks, and track progress easily",
    iconSrc: "/r0zlnz0ntyfuiilhrn7umeiktc-svg.svg",
    isImage: true,
  },
  {
    id: 3,
    title: "Video Production",
    description:
      "Deliver tailor-made video content that aligns with your client vision",
    iconSrc: "/tgeyrqgc3rsp3wrzrjcqecz7zle-svg.svg",
    isImage: true,
  },
  {
    id: 4,
    title: "Client Reporting",
    description:
      "Provide detailed performance reports and analytics to clients project",
    iconSrc: "/group.png",
    isImage: true,
  },
  {
    id: 5,
    title: "Content Strategy",
    description:
      "Develop effective content to boost engagement and drive results",
    iconSrc: "/group-1.png",
    isImage: true,
  },
  {
    id: 6,
    title: "Social Media",
    description: "Manage and schedule video posts across multiple platforms",
    iconSrc: "/group-2.png",
    isImage: true,
  },
];

export const DivWrapperByAnima = (): JSX.Element => {
  return (
    <section className="flex items-center justify-center px-[60px] py-[72px] w-full">
      <div className="flex flex-col max-w-[1080px] items-center gap-[78px] px-[25px]">
        {/* Section Header */}
        <div className="flex flex-col max-w-[600px] items-center justify-center gap-[18px]">
          <div className="flex items-center justify-center gap-2.5">
            <div className="w-[9px] h-[9px] bg-imaginative-timing-328979framerappoutrageous-orange rounded-[1000px]" />
            <div className="[font-family:'Inter',Helvetica] font-medium text-imaginative-timing-328979framerappblack text-[17.7px] tracking-[-0.72px] leading-[27px]">
              Features
            </div>
          </div>

          <div className="text-center">
            <h2 className="[font-family:'Inter',Helvetica] font-medium text-imaginative-timing-328979framerappmine-shaft text-[47.3px] tracking-[-1.50px] leading-[64px]">
              Key features of our video
              <br />
              editing process
            </h2>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-9 gap-y-12 w-full">
          {features.map((feature) => (
            <Card key={feature.id} className="border-none shadow-none">
              <CardContent className="flex flex-col items-center gap-7 p-0">
                {/* Icon Container */}
                <div className="inline-flex items-center justify-center p-px rounded-[14px] overflow-hidden shadow-[0px_1px_20px_#00000026] [background:linear-gradient(137deg,rgba(255,244,237,1)_0%,rgba(255,101,45,1)_44%,rgba(255,101,45,1)_100%)]">
                  <div className="flex w-12 h-12 items-center justify-center rounded-[14px] overflow-hidden backdrop-blur-[4.5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(4.5px)_brightness(100%)]">
                    <div className="w-6 h-6">
                      {feature.isImage ? (
                        <img
                          className="w-6 h-6"
                          alt={feature.title}
                          src={feature.iconSrc}
                        />
                      ) : (
                        <div className="w-6 h-6 bg-[url('/kfrt2xcibbhj3alxtdcu3ztyt4-svg.svg')] bg-[100%_100%]" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Feature Title and Description */}
                <div className="flex flex-col items-center justify-center gap-3 w-full">
                  <h3 className="[font-family:'Inter',Helvetica] font-medium text-imaginative-timing-328979framerappblack text-[22px] text-center tracking-[-0.60px] leading-9">
                    {feature.title}
                  </h3>
                  <p className="[font-family:'Inter',Helvetica] font-medium text-imaginative-timing-328979framerappboulder text-[17.7px] text-center tracking-[-0.72px] leading-[27px]">
                    {feature.description}
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
