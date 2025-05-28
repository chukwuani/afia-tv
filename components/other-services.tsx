import React from "react";
import { Card, CardContent } from "@/components/ui/card";

// Define service card data for mapping
const serviceCards = [
  {
    id: 1,
    title: "Multi- Camera Event Coverage",
    description:
      "We provide full audio and ISO camera recording for sports, e-gaming, music concerts, awards ceremonies, corporate events, and television shows.",
    iconSrc: "/xo0oezdjfm9kcn4wsgltnqxngu-svg.svg",
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
    <section className="flex flex-col items-center justify-center py-32 px-6 md:px-10 lg:px-20 pb-0 w-full pt-12">
      {/* Service cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {serviceCards.map((service) => (
          <Card
            key={service.id}
            className="h-[280px] bg-[#ffffff0b] rounded-[28px] overflow-hidden shadow-none border-none"
          >
            <CardContent className="flex flex-col justify-between h-full p-6">
              <div className={`${service.size}`}>
                <img
                  className={`${service.size}`}
                  alt={`${service.title} icon`}
                  src={service.iconSrc}
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-epilogue font-medium text-white text-[26px] -tracking-[.053rem] leading-[42px]">
                  {service.title}
                </h3>
                <p className="font-epilogue font-medium text-imaginative-timing-328979framerappboulder text-sm leading-[28px] tracking-[.009rem]">
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
