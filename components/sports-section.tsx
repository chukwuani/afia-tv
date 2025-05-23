"use client";

import Link from "next/link";

import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";

import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

const SportsSection = () => {
  return (
    <section className="flex flex-col px-6 lg:px-12 py-16 pt-0">
      <h1 className="text-3xl font-sans tracking-tight mb-5 uppercase">
        Sports
      </h1>
      <Separator className="mb-8 h-0.5 bg-[#d0d0d0]" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Blog Post 1 */}
        <div>
          <img
            src="https://ichef.bbci.co.uk/ace/standard/1536/cpsprodpb/244f/live/a124c0b0-28fe-11f0-b26b-ab62c890638b.jpg.webp"
            alt="Skincare Blog"
            className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
          />
          <p className="text-gray-500 text-sm mb-2">Jan 16, 2023</p>
          <h4 className="text-2xl font-sans mb-3">
            How to Get Rid of a Double Chin & Turkey Neck
          </h4>
          <p className="text-gray-600 mb-4 line-clamp-2">
            With timeless designs and high-quality materials, a wooden bed frame
            is a solid investment into coziness.
          </p>
        </div>

        {/* Blog Post 2 */}
        <div>
          <img
            src="https://www.reuters.com/resizer/v2/QLXWV2KRLRMDJFFPCM7STZ26ZU.jpg?auth=72b44f15cf3cf2e3a0e3930c93edb812d18919dacf354bfeea5c2c7688411c2f&width=960&quality=80"
            alt="Skincare Blog"
            className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
          />
          <p className="text-gray-500 text-sm mb-2">Jan 5, 2023</p>
          <h4 className="text-2xl font-sans mb-3">
            Why Microchaneling Outdoes Microneedling Every Time
          </h4>
          <p className="text-gray-600 mb-4 line-clamp-2">
            Much more cost-effective than renovating, freshen up your space by
            swapping out your counter stools.
          </p>
        </div>

        {/* Blog Post 3 */}
        <div>
          <img
            src="https://www.reuters.com/resizer/v2/26NN3MU6AFM6VACJH5QAIXDLQQ.jpg?auth=caf3b5a2a5792763183d5f0a00ccd1dc1a673d5eaee660e36872a23e1221b7cd&width=480&quality=80"
            alt="Skincare Blog"
            className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
          />
          <p className="text-gray-500 text-sm mb-2">Dec 11, 2022</p>
          <h4 className="text-2xl font-sans mb-3">
            Sunlighten Full Spectrum Infrared Sauna Explained by Inventor
          </h4>
          <p className="text-gray-600 mb-4 line-clamp-2">
            A wicker chair outside is a comfortable sight to see, but
            there&apos;s a natural warmth that the look brings inside.
          </p>
        </div>
      </div>

      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "inline-flex gap-2 text-sm font-normal rounded-full h-12 !pr-4 !pl-5 w-fit mt-8 mx-auto"
        )}
      >
        See All
        <Icons.chevron className="size-5" />
      </Link>
    </section>
  );
};

export default SportsSection;
