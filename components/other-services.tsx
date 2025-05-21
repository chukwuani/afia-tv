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
  },
  {
    id: 4,
    title: "Live streaming services",
    description:
      "We offer live streaming services for events, enabling our clients to reach a wider audience.",
    iconSrc: "/55zqjfkhabkzybuijbpbjjkonxs-svg.svg",
  },
];

const OtherServices = () => {
  return (
    <section className="flex flex-col items-center justify-center py-32 px-6 md:px-10 lg:px-20 pb-0 w-full pt-12">
      {/* Service cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
        {serviceCards.map((service) => (
          <Card
            key={service.id}
            className="h-[280px] bg-[#ffffff0b] rounded-[28px] overflow-hidden shadow-none border-none"
          >
            <CardContent className="flex flex-col justify-between h-full p-6">
              <div className="w-[34px] h-[34px]">
                <img
                  className="w-[34px] h-[34px]"
                  alt={`${service.title} icon`}
                  src={service.iconSrc}
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="[font-family:'Inter',Helvetica] font-medium text-white text-[26px] tracking-[-0.98px] leading-[42px]">
                  {service.title}
                </h3>
                <p className="font-imaginative-timing-328979-framer-app-semantic-button font-[number:var(--imaginative-timing-328979-framer-app-semantic-button-font-weight)] text-imaginative-timing-328979framerappboulder text-[length:var(--imaginative-timing-328979-framer-app-semantic-button-font-size)] tracking-[var(--imaginative-timing-328979-framer-app-semantic-button-letter-spacing)] leading-[var(--imaginative-timing-328979-framer-app-semantic-button-line-height)] [font-style:var(--imaginative-timing-328979-framer-app-semantic-button-font-style)]">
                  {service.description}
                </p>
              </div>

              {/* <div className="flex items-center justify-center w-full">
                  <button
                    className={cn(
                      "h-11 w-full bg-imaginative-timing-328979framerappmine-shaft text-white rounded-[1000px] px-4 py-2"
                    )}
                  >
                    Discover
                  </button>
                </div> */}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default OtherServices;
