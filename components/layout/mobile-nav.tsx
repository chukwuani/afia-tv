"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

import { Button, buttonVariants } from "@/components/ui/button"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AlignJustify } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function MobileNav() {
  const pathname = usePathname()
  const { isDesktop } = useMediaQuery()

  const [open, setOpen] = React.useState(false)

  if (isDesktop) return null

  return (
    <section className="flex lg:hidden gap-3 items-center justify-between">
      <section className="flex items-center">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="flex justify-end hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
            >
              <AlignJustify size={24} />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="pl-6 pr-7 pt-9 overflow-auto">
            <section className="w-full flex flex-col h-full">
              <section className="flex flex-col h-full justify-between gap-4">
                <section className="flex flex-col gap-5">
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-normal font-san"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full">
                      <span className="sr-only">Sinphox</span>
                      <Image
                        src="/Sinphox-Logo-Small.png"
                        width={50}
                        height={50}
                        alt=""
                      />
                    </div>
                    <span className="text-[28px] font-medium tracking-[-1.6px]">
                      Sinphox
                    </span>
                  </Link>

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
                                  {item.items?.map((subItem, index) => (
                                    <Link
                                      key={subItem.title}
                                      href={subItem.href}
                                      className="w-full justify-start group items-center gap-x-2.5 group inline-flex rounded-md bg-background px-2 py-4 text-sm font-normal hover:underline hover:text-accent-foreground focus:underline focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:underline data-[state=open]:underline transition ml-3"
                                    >
                                      <subItem.icon
                                        color="#007D2E"
                                        size={20}
                                        className="size-5"
                                      />
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
                      "inline-flex text-sm font-normal rounded-full w-fit"
                    )}
                  >
                    Contact Sales
                  </Link>

                  <div className="w-full">
                    <Button
                      className="relative rounded-full z-10 h-11 w-fit text-sm shadow-lg transition-shadow duration-300 hover:shadow-xl"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </section>
            </section>
          </SheetContent>
        </Sheet>
      </section>
    </section>
  )
}

interface MobileLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  disabled?: boolean
  pathname: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function MobileLink({
  children,
  href,
  disabled,
  pathname,
  setOpen,
  className,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/60 transition-colors hover:text-foreground text-lg leading-tight capitalize py-3",
        href === pathname && "text-brand hover:text-brand font-bold",
        disabled && "pointer-events-none hover:no-underline opacity-60",
        className
      )}
      onClick={() => setOpen(false)}
      {...props}
    >
      {children}
    </Link>
  )
}
