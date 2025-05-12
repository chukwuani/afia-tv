"use client";

import Link from "next/link";

import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";

import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

const BlogSection = () => {
  return (
    <section className="flex flex-col px-6 lg:px-12 py-16 pt-0">
      <h1 className="text-3xl font-garamond tracking-tight mb-5 uppercase">
        The Headlines
      </h1>
      <Separator className="mb-8 h-0.5 bg-[#d0d0d0]" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Blog Post 1 */}
        <div>
          <img
            src="https://cdn.theatlantic.com/thumbor/uP2XLI1AOm5lph5qqd95-BVS0-g=/156x1:1842x1125/624x416/media/img/mt/2025/05/reddit_1/original.jpg"
            alt="Skincare Blog"
            className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
          />
          <p className="text-gray-500 text-sm mb-2">Jan 16, 2023</p>
          <h4 className="text-2xl font-garamond mb-3">
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
            src="https://cdn.theatlantic.com/thumbor/NNmQ0LrycaxAYHPn6zQceFiVzKE=/123x1:1158x690/296x197/media/img/mt/2025/04/2025_4_23_The_David_Frum_Show_EP3_V1/original.jpg"
            alt="Skincare Blog"
            className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
          />
          <p className="text-gray-500 text-sm mb-2">Jan 5, 2023</p>
          <h4 className="text-2xl font-garamond mb-3">
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
            src="https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=500"
            alt="Skincare Blog"
            className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
          />
          <p className="text-gray-500 text-sm mb-2">Dec 11, 2022</p>
          <h4 className="text-2xl font-garamond mb-3">
            Sunlighten Full Spectrum Infrared Sauna Explained by Inventor
          </h4>
          <p className="text-gray-600 mb-4 line-clamp-2">
            A wicker chair outside is a comfortable sight to see, but there's a
            natural warmth that the look brings inside.
          </p>
        </div>

        {/* Blog Post 4 */}
        <div>
          <img
            src="https://cdn.theatlantic.com/thumbor/TVkV10QhRLyrIiYps8z0TlF4fOE=/179x394:4213x3079/296x197/media/img/mt/2025/05/GettyImages_169816088/original.jpg"
            alt="Skincare Blog"
            className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
          />
          <p className="text-gray-500 text-sm mb-2">Dec 11, 2022</p>
          <h4 className="text-xl font-garamond mb-3">
            Sunlighten Full Spectrum Infrared Sauna Explained by Inventor
          </h4>
          <p className="text-gray-600 mb-4 line-clamp-2">
            A wicker chair outside is a comfortable sight to see, but there's a
            natural warmth that the look brings inside.
          </p>
        </div>

        {/* Blog Post 1 */}
        <div>
          <img
            src="https://cdn.theatlantic.com/thumbor/ZM6R-a21LKy8QsbboKyZ7mhhse8=/227x2:2657x1619/296x197/media/img/mt/2025/05/maga_press_7_BK/original.jpg"
            alt="Skincare Blog"
            className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
          />
          <p className="text-gray-500 text-sm mb-2">Jan 16, 2023</p>
          <h4 className="text-2xl font-garamond mb-3">
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
            src="https://cdn.theatlantic.com/thumbor/uqzGeNB2lxwBXXe3tOqLrac02SM=/237x2:2769x1687/296x197/media/img/mt/2025/04/HowToBuildALife239/original.jpg"
            alt="Skincare Blog"
            className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
          />
          <p className="text-gray-500 text-sm mb-2">Jan 5, 2023</p>
          <h4 className="text-2xl font-garamond mb-3">
            Why Microchaneling Outdoes Microneedling Every Time
          </h4>
          <p className="text-gray-600 mb-4 line-clamp-2">
            Much more cost-effective than renovating, freshen up your space by
            swapping out your counter stools.
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

export default BlogSection;
