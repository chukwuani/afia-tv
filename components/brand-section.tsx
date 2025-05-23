import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function BrandSection() {
  return (
    <div className="py-32 pb-0 px-6 md:px-10 lg:px-20">
      <div className="text-center mb-16 max-w-[650px] mx-auto">
        <h1
          className="text-4xl sm:text-5xl text-pretty font-sans font-normal text-primary text-center max-w-[450px] tracking-[-2px] mx-auto
        "
        >
          Meet Our Family of Brands
        </h1>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-8">
        <div className="max-w-xl w-full bg-accent rounded-3xl p-8 pb-0 shadow-sm">
          <h1 className="text-4xl sm:text-5xl font-normal tracking-[-2px] font-sans mb-6">
            Afia TV
          </h1>

          <p className="text-imaginative-timing-328979framerappboulder mb-8">
            We are Afia TV, Southeastern Nigeria&apos;s first regional
            television channel on DSTV ch.254 and GOTV ch.17. We are dedicated
            to promoting the business, lifestyle and cultural stories of the
            region across the world.
          </p>

          <Link
            href="https://afiatv.net/about"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default" }),
              "inline-block bg-black text-white px-8 !py-3 rounded-full font-medium uppercase tracking-wide !text-sm h-auto"
            )}
          >
            Learn more
          </Link>

          <div className="mt-12 h-[300px] w-full rounded-2xl rounded-b-none overflow-hidden relative">
            <img
              className="size-full rounded-[12px] rounded-b-none object-cover"
              alt=""
              src={"/images/AFIA_LOGO_BLACK_ORANGE.jpg"}
            />
          </div>
        </div>

        <div className="max-w-xl w-full bg-accent rounded-3xl p-8 pb-0 shadow-sm">
          <h1 className="text-4xl sm:text-5xl font-normal tracking-[-2px] font-sans mb-6">
            Afia 99.3
          </h1>

          <p className="text-imaginative-timing-328979framerappboulder mb-8">
            Afia 99.3FM, Enugu. Your Number One Voice Of Enterprise! Discover
            the latest music tracks, explore captivating podcasts, or tune in to
            radio shows.
          </p>

          <Link
            href="https://afia993.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default" }),
              "inline-block bg-black text-white px-8 !py-3 rounded-full font-medium uppercase tracking-wide !text-sm h-auto"
            )}
          >
            Learn more
          </Link>

          <div className="mt-12 h-[300px] w-full rounded-2xl rounded-b-none overflow-hidden relative">
            <img
              className="size-full rounded-[12px] rounded-b-none object-cover"
              alt=""
              src={"/images/afia993.webp"}
            />
          </div>
        </div>
      </section>

      <div className="w-full flex max-md:flex-col bg-accent rounded-3xl p-8 pb-0 shadow-sm mt-12 gap-12">
        <section>
          <h1 className="text-4xl sm:text-5xl font-normal tracking-[-2px] font-sans mb-6">
            Afia Cinema
          </h1>

          <p className="text-imaginative-timing-328979framerappboulder mb-8">
            Afia Cinema is a Film and Television series division, founded under
            AfiaTV to create and project stories of Igbo origin for the global
            Igbo audience.
          </p>

          <Link
            href="https://www.youtube.com/@AfiaCinema"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default" }),
              "inline-block bg-black text-white px-8 !py-3 rounded-full font-medium uppercase tracking-wide !text-sm h-auto"
            )}
          >
            Learn more
          </Link>
        </section>

        <div className="mt-12 h-[300px] w-full rounded-2xl rounded-b-none overflow-hidden relative">
          <img
            className="size-full rounded-[12px] rounded-b-none object-cover"
            alt=""
            src={"/images/afia_cinema.png"}
          />
        </div>
      </div>
    </div>
  );
}
