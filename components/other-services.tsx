import React from "react";
import { Card, CardContent } from "@/components/ui/card";

// Define service card data for mapping
const serviceCards = [
  {
    id: 1,
    title: "Multi-Camera Event Coverage",
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
];

const OtherServices = () => {
  return (
    <section className="flex flex-col items-center justify-center py-32 px-6 md:px-10 lg:px-12 pb-0 w-full pt-12">
      {/* Service cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {serviceCards.map((service) => (
          <Card
            key={service.id}
            className="min-h-[280px] bg-accent rounded-none overflow-hidden shadow-none border-none"
          >
            <CardContent className="flex flex-col justify-between h-full p-6 gap-10">
              <div className={`${service.size}`}>
                <img
                  className={`${service.size}`}
                  alt={`${service.title} icon`}
                  src={service.iconSrc}
                />
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="text-4xl sm:text-[32px] leading-[140%] tracking-normal font-normal font-anton">
                  {service.title}
                </h3>
                <p className="font-outfit text-muted-foreground text-sm leading-[28px] tracking-[.009rem]">
                  {service.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default OtherServices;
