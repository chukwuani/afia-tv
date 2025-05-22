"use client";

import * as React from "react";
import Link from "next/link";

import { siteConfig } from "@/config";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Button, buttonVariants } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Icons } from "../icons";

export function MobileNav() {
  const { isDesktop } = useMediaQuery();

  const [open, setOpen] = React.useState(false);

  if (isDesktop) return null;

  return (
    <section className="flex lg:hidden gap-3 items-center justify-between">
      <section className="flex items-center">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-full w-fit relative size-[2.5rem] items-center justify-center bg-accent"
            >
              <div className="animated-menu-icon"></div>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="pl-6 pr-7 pt-9 overflow-auto">
            <section className="w-full flex flex-col h-full">
              <section className="flex flex-col h-full justify-between gap-4">
                <section className="flex flex-col gap-5">
                  {/* <Link
                    href="/"
                    className="flex items-center gap-2 font-normal font-san"
                  >
                    <div className="flex items-center justify-center rounded-full">
                      <span className="sr-only">Afia</span>
                      <Image
                        className="w-[100px] h-10 max-w-none"
                        width={100}
                        height={40}
                        src="/images/afia_logo.svg"
                        alt="Afia Logo"
                      />
                    </div>
                  </Link> */}

                  <section className="-mx-2 flex flex-1 flex-col">
                    {siteConfig.mainNav.map((item, index) => (
                      <section key={item.title + index} className="w-full">
                        {item.items ? (
                          <Accordion
                            key={item.title + index}
                            type="multiple"
                            className="w-full"
                          >
                            <AccordionItem
                              className="border-b-0"
                              value={item.title}
                              key={item.title}
                            >
                              <AccordionTrigger className="text-sm capitalize px-2">
                                {item.title}
                              </AccordionTrigger>

                              <AccordionContent>
                                <div className="flex flex-col space-y-2">
                                  {item.items?.map((subItem) => (
                                    <Link
                                      key={subItem.title}
                                      href={subItem.href}
                                      className="w-full justify-start group items-center gap-x-2.5 group inline-flex rounded-md bg-background px-2 py-4 text-sm font-normal hover:underline hover:text-accent-foreground focus:underline focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:underline data-[state=open]:underline transition ml-3"
                                    >
                                      {subItem.title}
                                    </Link>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ) : (
                          <Link
                            key={item.title + index}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="group inline-flex w-full rounded-md bg-background px-2 py-4 text-sm font-normal transition-colors hover:underline hover:text-accent-foreground focus:underline focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:underline data-[state=open]:underline"
                          >
                            {item.title}
                          </Link>
                        )}
                      </section>
                    ))}
                  </section>
                </section>

                <div className="flex flex-wrap items-center gap-4 w-full">
                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "inline-flex text-base font-normal rounded-full"
                    )}
                  >
                    <Icons.live />
                    Live
                  </Link>

                  <div className="w-auto max-w-80">
                    <Button className="relative rounded-full z-10 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
                      Sign In
                    </Button>
                  </div>
                </div>
              </section>
            </section>
          </SheetContent>
        </Sheet>
      </section>
    </section>
  );
}

// interface MobileLinkProps
//   extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
//   href: string
//   disabled?: boolean
//   pathname: string
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>
// }

// function MobileLink({
//   children,
//   href,
//   disabled,
//   pathname,
//   setOpen,
//   className,
//   ...props
// }: MobileLinkProps) {
//   return (
//     <Link
//       href={href}
//       className={cn(
//         "text-foreground/60 transition-colors hover:text-foreground text-lg leading-tight capitalize py-3",
//         href === pathname && "text-brand hover:text-brand font-bold",
//         disabled && "pointer-events-none hover:no-underline opacity-60",
//         className
//       )}
//       onClick={() => setOpen(false)}
//       {...props}
//     >
//       {children}
//     </Link>
//   )
// }
