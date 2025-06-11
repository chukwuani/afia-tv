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
      "https://cdn.theatlantic.com/thumbor/uP2XLI1AOm5lph5qqd95-BVS0-g=/156x1:1842x1125/624x416/media/img/mt/2025/05/reddit_1/original.jpg",
    title: "How to Get Rid of a Double Chin & Turkey Neck",
    description:
      "With timeless designs and high-quality materials, a wooden bed frame is a solid investment into coziness.",
  },
  {
    id: 2,
    imgSrc:
      "https://cdn.theatlantic.com/thumbor/NNmQ0LrycaxAYHPn6zQceFiVzKE=/123x1:1158x690/296x197/media/img/mt/2025/04/2025_4_23_The_David_Frum_Show_EP3_V1/original.jpg",
    title: "Why Microchaneling Outdoes Microneedling Every Time",
    description:
      "Much more cost-effective than renovating, freshen up your space by swapping out your counter stools.",
  },
  {
    id: 3,
    imgSrc:
      "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=500",
    title: "Sunlighten Full Spectrum Infrared Sauna Explained by Inventor",
    description:
      "A wicker chair outside is a comfortable sight to see, but there's a natural warmth that the look brings inside.",
  },
  {
    id: 4,
    imgSrc:
      "https://cdn.theatlantic.com/thumbor/3P7Uny9GrpmeZl3NK4DgBb-XS8Q=/155x1:1842x1124/296x197/media/img/mt/2025/04/2025_4_22_Laws_Are_Just_Culture_JA/original.jpg",
    title: "Sunlighten Full Spectrum Infrared Sauna Explained by Inventor",
    description:
      "A wicker chair outside is a comfortable sight to see, but there's a natural warmth that the look brings inside.",
  },
  {
    id: 5,
    imgSrc:
      "https://cdn.theatlantic.com/thumbor/ZM6R-a21LKy8QsbboKyZ7mhhse8=/227x2:2657x1619/296x197/media/img/mt/2025/05/maga_press_7_BK/original.jpg",
    title: "How to Get Rid of a Double Chin & Turkey Neck",
    description:
      " With timeless designs and high-quality materials, a wooden bed frame is a solid investment into coziness.",
  },
  {
    id: 6,
    imgSrc:
      "https://cdn.theatlantic.com/thumbor/uqzGeNB2lxwBXXe3tOqLrac02SM=/237x2:2769x1687/296x197/media/img/mt/2025/04/HowToBuildALife239/original.jpg",
    title: "Why Microchaneling Outdoes Microneedling Every Time",
    description:
      "Much more cost-effective than renovating, freshen up your space by swapping out your counter stools.",
  },
];

const BlogSection = () => {
  return (
    <section className="flex flex-col sm:px-12 py-16">
      <h1 className="text-3xl font-epilogue mb-5 max-sm:px-6 uppercase tracking-[.009rem]">
        More Stories
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

export default BlogSection;
