"use client";

import Link from "next/link";

import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";

import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

const newsFeed = [
  {
    id: 1,
    imgSrc:
      "https://www.reuters.com/resizer/v2/26NN3MU6AFM6VACJH5QAIXDLQQ.jpg?auth=caf3b5a2a5792763183d5f0a00ccd1dc1a673d5eaee660e36872a23e1221b7cd&width=480&quality=80",
    title: "How to Get Rid of a Double Chin & Turkey Neck",
    description:
      "With timeless designs and high-quality materials, a wooden bed frame is a solid investment into coziness.",
  },
  {
    id: 2,
    imgSrc:
      "https://ichef.bbci.co.uk/ace/standard/1536/cpsprodpb/244f/live/a124c0b0-28fe-11f0-b26b-ab62c890638b.jpg.webp",
    title: "Why Microchaneling Outdoes Microneedling Every Time",
    description:
      "Much more cost-effective than renovating, freshen up your space by swapping out your counter stools.",
  },
  {
    id: 3,
    imgSrc:
      "https://www.reuters.com/resizer/v2/QLXWV2KRLRMDJFFPCM7STZ26ZU.jpg?auth=72b44f15cf3cf2e3a0e3930c93edb812d18919dacf354bfeea5c2c7688411c2f&width=960&quality=80",
    title: "Sunlighten Full Spectrum Infrared Sauna Explained by Inventor",
    description:
      "A wicker chair outside is a comfortable sight to see, but there's a natural warmth that the look brings inside.",
  },
];

const SportsSection = () => {
  return (
    <section className="flex flex-col sm:px-12 py-16">
      <h1 className="text-3xl font-epilogue mb-5 max-sm:px-6 uppercase tracking-[.009rem]">
        Sports
      </h1>
      <Separator className="mb-8 h-0.5 bg-border" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {newsFeed.map((item) => (
          <div key={item.id} className="flex flex-col-reverse lg:flex-col">
            <img
              src={item.imgSrc}
              alt="Skincare Blog"
              className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
            />

            <section className="max-sm:px-6">
              <p className="text-muted-foreground font-epilogue text-sm mb-2">
                Jan 16, 2023
              </p>
              <h4 className="text-2xl font-haffer mb-3">{item.title}</h4>
              <p className="text-sm leading-7 tracking-wide font-epilogue text-muted-foreground mb-4 line-clamp-3">
                {item.description}
              </p>
            </section>
          </div>
        ))}
      </div>

      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "inline-flex gap-2 text-sm font-normal rounded-full h-12 !pr-4 !pl-5 w-fit mt-8 mx-auto"
        )}
      >
        See All
        <Icons.chevron className="size-5 text-white" />
      </Link>
    </section>
  );
};

export default SportsSection;
