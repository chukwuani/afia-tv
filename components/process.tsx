import React from "react";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const SectionProcess = () => {
  // Process steps data for mapping
  const processSteps = [
    {
      number: "01",
      title: "Submit Request",
      description: "Share your video needs and project details to get started.",
    },
    {
      number: "02",
      title: "Video Editing",
      description:
        "Our team edits and you can request revisions to perfect it.",
    },
    {
      number: "03",
      title: "Final Delivery",
      description: "Receive the final video with all necessary adjustments.",
    },
  ];

  return (
    <div className="py-32 pb-0 px-6 md:px-10 lg:px-20">
      <div className="mx-auto">
        <section className="flex flex-col lg:flex-row mx-auto gap-11">
          {/* Left side image */}
          <div className="min-w-[492px] h-[625px] rounded-[28px] bg-[url(/images/obuzo_thumb.png)] bg-cover bg-center" />

          {/* Right side content */}
          <div className="flex flex-col justify-between py-6">
            {/* Header section */}

            <h2 className="text-4xl sm:text-5xl font-normal -tracking-[.053rem] font-epilogue leading-[64px] mb-16 text-pretty">
              Obuzo Advertising Subsidy Support Scheme.
            </h2>

            {/* Process steps */}
            <Card className="border-none shadow-none bg-transparent">
              <CardContent className="p-0 space-y-[35px]">
                {processSteps.map((step, index) => (
                  <React.Fragment key={step.number}>
                    <div className="flex">
                      {/* Step number circle */}
                      <div className="w-[78px] flex-shrink-0">
                        <div className="w-8 h-8 rounded-full border border-solid border-accent flex items-center justify-center">
                          <span className="font-epilogue font-normal text-white text-xs tracking-[-0.30px]">
                            {step.number}
                          </span>
                        </div>
                      </div>

                      {/* Step content */}
                      <div className="flex-1 flex max-lg:flex-col">
                        <h3 className="w-[230px] font-epilogue font-medium text-white text-[20.6px] tracking-[-0.66px] leading-[30.8px]">
                          {step.title}
                        </h3>
                        <p className="flex-1 font-haffer font-medium text-muted-foreground text-base tracking-[-0.48px] leading-6">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Separator (except after the last item) */}
                    {index < processSteps.length - 1 && (
                      <Separator className="bg-black opacity-10" />
                    )}
                  </React.Fragment>
                ))}
              </CardContent>
            </Card>

            <div className="flex w-full mt-12">
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
        </section>
      </div>
    </div>
  );
};

export default SectionProcess;
