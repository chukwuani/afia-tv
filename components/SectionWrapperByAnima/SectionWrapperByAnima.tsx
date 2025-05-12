import React from "react";
import { Card, CardContent } from "@/components/ui/card";

// Define service card data for mapping
const serviceCards = [
  {
    id: 1,
    title: "Instagram Reels",
    description:
      "Create and track budgets for various categories like transportation",
    iconSrc: "/xo0oezdjfm9kcn4wsgltnqxngu-svg.svg",
  },
  {
    id: 2,
    title: "YouTube Videos",
    description:
      "Edit high-quality videos with customized effects and transitions.",
    iconSrc: "/bqfhpcmart00ui3b7l5vj1d3ka-svg.svg",
  },
  {
    id: 3,
    title: "TikTok Clips",
    description:
      "Design engaging short videos tailored for TikTok's algorithm.",
    iconSrc: "/jrjujhukqtmhzpgbzkf1lcy9ns-svg.svg",
  },
  {
    id: 4,
    title: "Youtube Shorts",
    description: "Create short, engaging videos for quick viewer engagement.",
    iconSrc: "/55zqjfkhabkzybuijbpbjjkonxs-svg.svg",
  },
  {
    id: 5,
    title: "Facebook Ads",
    description:
      "Create and optimize video ads for better engagement and reach.",
    iconSrc: "/24mcupjifkpek8idcnra5cia3o-svg.svg",
  },
  {
    id: 6,
    title: "LinkedIn Videos",
    description:
      "Craft professional videos for business growth and networking.",
    iconSrc: "/yq7g49jhkahnehqtsziqinvurs-svg.svg",
  },
];

export const SectionWrapperByAnima = () => {
  return (
    <section className="flex flex-col items-center justify-center py-32 px-6 md:px-10 lg:px-20 w-full">
      <div className="flex flex-col items-center w-full">
        {/* Section header */}
        <header className="flex flex-col items-center justify-center gap-[18px] max-w-[650px] w-full mb-18">
          <h1 className="text-4xl sm:text-5xl text-pretty font-garamond font-normal text-primary text-center">
            Explore our professional video editing services
          </h1>
        </header>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {serviceCards.map((service) => (
            <Card
              key={service.id}
              className="h-[280px] bg-white rounded-[28px] overflow-hidden shadow-none border-none"
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
                  <h3 className="[font-family:'Inter',Helvetica] font-medium text-imaginative-timing-328979framerappmine-shaft text-[26px] tracking-[-0.98px] leading-[42px]">
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
      </div>
    </section>
  );
};
