import Link from "next/link";
import React from "react";

import { siteConfig } from "@/config";

export const ContainerByAnima = () => {
  // Data for social media section
  const socialMedia = [
    {
      title: "Twitter",
      icon: "/xfq0rd6wvtvcd8sha4hrdqa5r0-svg.svg",
    },
    {
      title: "Linkedin",
      icon: "/zyabjj2o4rwyuvzeyhow7fdsi3c-svg.svg",
    },
    {
      title: "Facebook",
      icon: "/h9gqhyuscgf1vsvn5eywrg5n59a-svg.svg",
    },
  ];

  return (
    <div className="flex flex-col w-full items-start font-inter">
      <footer className="flex flex-col items-center justify-center w-full bg-transparent">
        <div className="flex flex-col w-full items-start gap-11 p-6 sm:p-12 sm:pb-4 bg-imaginative-timing-328979framerappoutrageous-orange">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-10 w-full">
            {siteConfig.footerNav.map((item) => (
              <div key={item.title} className="flex flex-col items-start gap-4">
                <h3 className="font-medium text-white text-xl tracking-[-0.90px] leading-[33px] font-inter">
                  {item.title}
                </h3>

                {item.items.map((link) => (
                  <div key={link.title}>
                    {link.href ? (
                      <Link
                        href={link.href}
                        target={link?.external ? "_blank" : undefined}
                        rel={link?.external ? "noreferrer" : undefined}
                        className="w-full font-medium text-white text-base tracking-[-0.72px] leading-[27px] font-inter hover:underline hover:text-brand-700"
                      >
                        {link.title}
                        <span className="sr-only">{link.title}</span>
                      </Link>
                    ) : (
                      <p className="w-full font-medium text-white text-base tracking-[-0.72px] leading-[27px] font-inter hover:underline">
                        {link.title}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* Follow us section */}
            <div className="flex flex-col items-start gap-4">
              <h3 className="font-medium text-white text-xl tracking-[-0.90px] leading-[33px] font-inter">
                Follow us
              </h3>

              {socialMedia.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center gap-2 w-full hover:underline"
                >
                  <div className="w-4 h-4">
                    <img
                      className="w-full h-full"
                      alt={social.title}
                      src={social.icon}
                    />
                  </div>
                  <span className="font-medium text-white text-base tracking-[-0.48px] leading-6 font-inter">
                    {social.title}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="container mx-auto py-4 flex flex-col md:flex-row-reverse justify-between">
            <div className="flex flex-col md:flex-row flex-wrap gap-4 text-sm mb-4">
              <Link
                href="#"
                className="font-medium text-white text-base tracking-[-0.72px] leading-[27px] font-inter hover:underline"
              >
                Advertise With Us
              </Link>
              <Link
                href="#"
                className="font-medium text-white text-base tracking-[-0.72px] leading-[27px] font-inter hover:underline"
              >
                Cookies
              </Link>
              <Link
                href="#"
                className="font-medium text-white text-base tracking-[-0.72px] leading-[27px] font-inter hover:underline"
              >
                Terms of Use
              </Link>
              <Link
                href="#"
                className="font-medium text-white text-base tracking-[-0.72px] leading-[27px] font-inter hover:underline"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="font-medium text-white text-base tracking-[-0.72px] leading-[27px] font-inter hover:underline"
              >
                Digital Accessibility
              </Link>
              <Link
                href="#"
                className="font-medium text-white text-base tracking-[-0.72px] leading-[27px] font-inter hover:underline"
              >
                Site Feedback
              </Link>
            </div>

            <p className="font-medium text-white text-base tracking-[-0.72px] leading-[27px] font-inter hover:underline">
              © 2025 Afia. All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
