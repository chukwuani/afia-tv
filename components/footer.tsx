"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  ExternalLink,
} from "lucide-react";

import { siteConfig } from "@/config";

import { Shell } from "@/components/shell";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center p-6 sm:p-12 sm:pb-4 bg-brand-25 z-20 relative">
      <Shell className="!p-0">
        <section
          id="footer-content"
          aria-labelledby="footer-content-heading"
          className="flex flex-col gap-10 lg:flex-row lg:gap-20 mb-4"
        >
          <section
            id="footer-links"
            aria-labelledby="footer-links-heading"
            className="grid flex-1 grid-cols-1 gap-10 xxs:grid-cols-2 sm:grid-cols-3"
          >
            {/* Brand Section */}
            {/* <div className="space-y-6 max-w-[350px] col-span-1">
              <Link
                href="/"
                className="flex items-center gap-2 font-normal font-san"
              >
                <div className="flex items-center justify-center rounded-full">
                  <span className="sr-only">Afia</span>
                  <Image
                    className="w-[100px] max-w-none"
                    width={100}
                    height={60}
                    src="/images/afia_logo.png"
                    alt="Afia Logo"
                  />
                </div>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {siteConfig.description}
              </p>

              <div className="flex items-center space-x-1">
                <Link
                  href={siteConfig.links.x}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({
                      size: "icon",
                      variant: "ghost",
                    })
                  )}
                >
                  <Icons.x className="size-6" aria-hidden="true" />
                  <span className="sr-only">Twitter</span>
                </Link>

                <Link
                  href={siteConfig.links.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({
                      size: "icon",
                      variant: "ghost",
                    })
                  )}
                >
                  <Icons.facebook className="size-6" aria-hidden="true" />
                  <span className="sr-only">Facebook</span>
                </Link>

                <Link
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({
                      size: "icon",
                      variant: "ghost",
                    })
                  )}
                >
                  <Icons.instagram className="size-6" aria-hidden="true" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div> */}

            <section className="col-span-2">
              <section className="grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-4 w-full gap-10">
                {siteConfig.footerNav.map((item) => (
                  <div key={item.title} className="space-y-3">
                    <h4 className="text-base font-san font-medium">
                      {item.title}
                    </h4>
                    <ul className="space-y-2.5 font-san">
                      {item.items.map((link) => (
                        <li key={link.title}>
                          {link.href ? (
                            <Link
                              href={link.href}
                              target={link?.external ? "_blank" : undefined}
                              rel={link?.external ? "noreferrer" : undefined}
                              className="text-sm text-balance text-muted-foreground transition-colors hover:text-brand-700"
                            >
                              {link.title}
                              <span className="sr-only">{link.title}</span>
                            </Link>
                          ) : (
                            <p className="text-sm text-balance text-muted-foreground transition-colors">
                              {link.title}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </section>
          </section>
        </section>

        {/* Main footer content */}
        <div className="border-t border-gray-200">
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Information section */}
              <div>
                <h3 className="text-xl font-medium mb-4">
                  Information you can trust
                </h3>
                <p className="text-sm text-muted-foreground">
                  We are Afia TV, Southeastern Nigeria&apos;s first regional
                  television channel on DSTV & GOTV. We are dedicated to telling
                  and promoting the business, good governance, lifestyle and
                  cultural stories of the southeasterners across the world. We
                  aspire to go above and beyond stereotypes in order to honor
                  what it means to be Igbo. We broadcast live from Enugu on DSTV
                  ch.254 and GOTV ch.17
                </p>
              </div>

              {/* Social media section */}
              <div>
                <h3 className="text-xl font-medium mb-4">Follow Us</h3>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="#"
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
                  >
                    <Twitter className="w-5 h-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
                  >
                    <Facebook className="w-5 h-5" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
                  >
                    <Youtube className="w-5 h-5" />
                    <span className="sr-only">YouTube</span>
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer links */}
        <div className="border-t border-gray-200">
          <div className="container mx-auto py-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-4">
              <Link
                href="#"
                className="flex font-bold items-center gap-1 hover:underline"
              >
                Advertise With Us
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link
                href="#"
                className="flex font-bold items-center gap-1 hover:underline"
              >
                Cookies
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link href="#" className="font-bold hover:underline">
                Terms of Use
              </Link>
              <Link
                href="#"
                className="flex font-bold items-center gap-1 hover:underline"
              >
                Privacy
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link
                href="#"
                className="flex font-bold items-center gap-1 hover:underline"
              >
                Digital Accessibility
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link
                href="#"
                className="flex font-bold items-center gap-1 hover:underline"
              >
                Site Feedback
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="flex flex-col md:flex-row justify-between text-sm text-muted-foreground">
              <p>© 2025 Afia. All rights reserved</p>
            </div>
          </div>
        </div>
      </Shell>
    </footer>
  );
}
