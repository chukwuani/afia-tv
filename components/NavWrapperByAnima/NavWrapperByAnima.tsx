import React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const NavWrapperByAnima = (): JSX.Element => {
  // Navigation menu items
  const navItems = [
    { label: "Services", href: "#" },
    { label: "Work", href: "#" },
    { label: "Testimonial", href: "#" },
    { label: "Pricing", href: "#" },
  ];

  return (
    <header className="sticky top-0 w-full bg-imaginative-timing-328979framerappalabaster z-10">
      <div className="flex items-center justify-center py-[18px]">
        <div className="container flex items-center justify-between max-w-[1150px]">
          {/* Logo */}
          <div className="flex items-start">
            <div className="inline-flex items-center gap-[7px]">
              <div className="w-[30px] h-[30px]">
                <img
                  className="w-[30px] h-[30px]"
                  alt="Videoship logo"
                  src="/gaagrt6echab8ovhxmowraprnw-svg.svg"
                />
              </div>

              <div className="flex items-start">
                <span className="tracking-[-0.13px] leading-6 [font-family:'Inter',Helvetica] font-normal text-imaginative-timing-328979framerappblack text-[22.3px]">
                  Video
                </span>
                <span className="italic tracking-[-0.14px] [font-family:'Instrument_Serif',Helvetica] font-normal text-imaginative-timing-328979framerappblack text-2xl leading-6">
                  ship
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex gap-6">
              {navItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={item.href}
                    className="text-imaginative-timing-328979framerappmine-shaft text-base tracking-[-0.48px] leading-6 [font-family:'Inter',Helvetica] font-medium"
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Contact Button */}
          <div className="flex items-center justify-end">
            <Button className="px-5 py-2.5 bg-imaginative-timing-328979framerappoutrageous-orange rounded-[1000px] shadow-[inset_0px_2px_4.4px_#ffffff4c,inset_0px_0.24px_0.53px_#ffffff09,0px_2px_5px_#00000026] text-white text-base tracking-[-0.48px] leading-6 [font-family:'Inter',Helvetica] font-medium">
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
