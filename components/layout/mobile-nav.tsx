"use client";

import * as React from "react";
import Link from "next/link";

import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Icons } from "@/components/icons";

export function MobileNav() {
	const { isDesktop } = useMediaQuery();

	const [open, setOpen] = React.useState(false);

	if (isDesktop) return null;

	return (
		<section className="flex lg:hidden gap-3 items-center justify-between">
			<Link
				href="/live"
				target="_blank"
				className={cn(
					buttonVariants({ variant: "outline" }),
					"inline-flex text-base font-normal rounded-full"
				)}>
				<Icons.live />
				Live
			</Link>
			<section className="flex items-center">
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							className="rounded-full w-fit relative size-[2.5rem] items-center justify-center">
							<div className="animated-menu-icon"></div>
						</Button>
					</SheetTrigger>

					<SheetContent
						aria-description="Navigation menu"
						side="right"
						className="pl-6 pr-7 py-9 overflow-auto">
						<SheetTitle className="sr-only">Mobile navigation menu</SheetTitle>
						<section className="w-full flex flex-col h-full">
							<section className="flex flex-col h-full justify-between gap-4">
								<section className="flex flex-col gap-5">
									<section className="-mx-2 flex flex-1 flex-col">
										{siteConfig.mainNav.map((item, index) => (
											<section key={item.title + index} className="w-full">
												{item.items ? (
													<Accordion key={item.title + index} type="multiple" className="w-full">
														<AccordionItem
															className="border-b-0"
															value={item.title}
															key={item.title}>
															<AccordionTrigger className="font-dm-sans text-[0.75rem] uppercase tracking-[2.4px] px-2">
																{item.title}
															</AccordionTrigger>

															<AccordionContent>
																<div className="flex flex-col space-y-2">
																	{item.items?.map((subItem) => (
																		<Link
																			key={subItem.title}
																			href={subItem.href}
																			className="w-full justify-start group items-center gap-x-2.5 group inline-flex rounded-md bg-background px-2 py-4 font-dm-sans text-[0.75rem] uppercase tracking-[2.4px] font-normal hover:text-brand focus:text-brand focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:underline data-[state=open]:underline transition ml-3">
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
														className="group inline-flex w-full rounded-md bg-background px-2 py-4 font-dm-sans text-[0.75rem] uppercase tracking-[2.4px] font-normal transition-colors hover:text-brand focus:text-brand focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:underline data-[state=open]:underline">
														{item.title}
													</Link>
												)}
											</section>
										))}
									</section>
								</section>

								<div className="flex flex-wrap items-center gap-4 w-full">
									<div className="w-auto max-w-80">
										<Link
											href="/signin"
											className={cn(
												buttonVariants({ variant: "default" }),
												"relative rounded-full z-10 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
											)}>
											Sign In
										</Link>
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
