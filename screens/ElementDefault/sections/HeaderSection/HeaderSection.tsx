import React from "react";
import Link from "next/link";
import Image from "next/image";

import { PlusIcon } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

export const HeaderSection = () => {
  // Data for the header components
  const profileImageUrl =
    "/aidro-l1jw0l3ihab2jb-bofpjmre8tkbisu3r7zlvfzp0d1etw-s48-c-k-c0x0.png";

  return (
    <div className="w-full h-16 bg-black shadow-[0px_1px_4px_1px_#00000033] sticky top-0">
      <header className="relative w-full h-16 flex items-center justify-between px-4">
        {/* Left Side */}
        <section className="flex items-center gap-4">
          {/* Hamburger MenuIcon */}
          <Button
            variant="ghost"
            className="rounded-full w-fit relative size-[3rem] items-center justify-center mr-4"
          >
            <div className="animated-menu-icon"></div>
          </Button>

          {/* Afia Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-normal font-san"
          >
            <div className="flex items-center justify-center rounded-full">
              <span className="sr-only">Afia</span>
              <Image
                className="w-[70px] h-10 max-w-none"
                width={100}
                height={40}
                src="/images/afia_logo.svg"
                alt="Afia Logo"
              />
            </div>
          </Link>
        </section>

        {/* SearchBar */}
        <div className="relative w-[546px] mx-auto">
          <div className="relative">
            <Input
              className="font-haffer font-medium  text-base leading-[28px] tracking-[.009rem] h-10 pl-12 bg-[#161616] text-[#aaaaaa] rounded-[20px] w-full border-none"
              placeholder="Search across the studio"
            />
            <Icons.search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 fill-[#aaaaaa]" />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Create Button */}
          <Button
            variant="outline"
            className="h-9 px-4 rounded-[18px] flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5 text-white" />
            <span className="text-white font-medium">Create</span>
          </Button>

          {/* Profile Avatar */}
          <Avatar className="w-8 h-8 rounded-2xl">
            <AvatarImage
              src={profileImageUrl}
              alt="Profile"
              className="object-cover"
            />
          </Avatar>
        </div>
      </header>
    </div>
  );
};
