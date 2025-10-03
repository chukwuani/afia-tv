"use client"

import { Card, CardContent } from "@/components/ui/card";
import MyImage from "./my-image";

// Define event card data for mapping
const eventsCard = [
  {
    id: 1,
    title: "Market Talk Mondays",
    description:
      "Hot takes on trending issues in Ala Igbo—from fuel prices to family matters.",
    iconSrc: "/images/market.png",
    link: "https://afiahomecoming.com/event.php?ka=66",
  },
  {
    id: 2,
    title: "Voices from Nsukka",
    description:
      "A raw, community-led series featuring elders, students, and storytellers from Enugu North.",
    iconSrc:
      "/images/voice.png",
    link: "https://afiahomecoming.com/event.php?ka=31",
  },
  {
    id: 5,
    title: "Igbo Amaka - The Heritage Series",
    description:
      "A deep dive into the myths, music, and meaning of Igbo culture.",
    iconSrc: "/images/igbo.png",
    link: "https://afiahomecoming.com/event.php?ka=62",
  },
];

const PodcastCard = () => {
  return (
    <section className="flex flex-col items-center justify-center py-32 px-6 md:px-10 lg:px-12 w-full">
      <div className="flex flex-col items-center w-full">
        {/* Section header */}
        <header className="flex flex-col items-center justify-center gap-[18px] max-w-[650px] w-full mb-18">
          <h1
            className="text-pretty text-[2.5rem] leading-[4rem] -tracking-[.053rem] lg:text-[4rem] lg:leading-[5rem] lg:-tracking-[.078rem] text-center font-epilogue font-normal mx-auto
        "
          >
            Featured Podcasts
          </h1>
        </header>

        {/* event cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {eventsCard.map((event) => (
            <Card
              key={event.id}
              className="bg-transparent overflow-hidden shadow-none border-none"
            >
              <CardContent className="flex flex-col justify-between h-full gap-7 p-0">
                <div className="w-full h-[250px] mb-3">
                  <MyImage
                    className="w-full h-[250px] aspect-square rounded-[12px] object-cover"
                    alt={event.title}
                    src={event.iconSrc}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-epilogue font-medium text-white text-[26px] -tracking-[.053rem] leading-[42px] line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="font-dm-sans font-medium text-muted-foreground text-sm leading-[28px] tracking-[.009rem] line-clamp-2">
                    {event.description}
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

export default PodcastCard;
