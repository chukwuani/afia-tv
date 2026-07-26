"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Button, buttonVariants } from "@/components/ui/button";
import SearchButton from "@/components/layout/search-btn";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export function MobileNav() {
	const pathname = usePathname();
	const { isDesktop } = useMediaQuery();

	const [open, setOpen] = React.useState(false);

	if (isDesktop) return null;

	return (
		<section className="flex lg:hidden gap-2 items-center justify-between">
			<SearchButton />

			{/* <ThemeSwitcher /> */}

			<Link
				href="/live"
				target="_blank"
				className={cn(
					buttonVariants({ variant: "outline" }),
					"inline-flex text-xs !text-[10px] font-normal has-[>svg]:!px-2 h-7",
				)}>
				<Icons.live className="!size-3 lg:!size-4" />
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
										{siteConfig.mainNav
											?.filter((item) => item.title !== siteConfig.mainNav[0]?.title)
											.map((item) =>
												item?.items ? (
													<Accordion key={item.title} type="multiple" className="w-full">
														<AccordionItem value={item.title} className="border-t !border-b-0">
															<AccordionTrigger className="group w-full rounded-md bg-background hover:underline underline-offset-2 text-foreground text-[12px] font-normal uppercase font-azeret-mono py-4 flex items-center gap-2">
																{item.title}
															</AccordionTrigger>
															<AccordionContent>
																<div className="flex flex-col space-y-1 px-4">
																	{item.items.map((item) => (
																		<section key={item.title} className="w-full">
																			<Link
																				key={item.title}
																				href={item.href}
																				onClick={() => setOpen(false)}
																				className={cn(
																					"group w-full bg-background hover:underline underline-offset-2 focus:outline-none text-foreground text-[12px] font-normal uppercase font-azeret-mono py-4 flex items-center gap-2 border-t",
																					item.href === pathname &&
																						"hover:underline underline-offset-2 font-normal",
																					item.disabled && "pointer-events-none opacity-50",
																				)}>
																				{item.title}
																			</Link>
																		</section>
																	))}
																</div>
															</AccordionContent>
														</AccordionItem>
													</Accordion>
												) : (
													item.href && (
														<section key={item.title} className="w-full border-t first:!border-t-0">
															<Link
																key={item.title}
																href={item.href}
																onClick={() => setOpen(false)}
																className={cn(
																	"group w-full bg-background hover:underline underline-offset-2 focus:outline-none text-foreground text-[12px] font-normal uppercase font-azeret-mono py-4 flex items-center gap-2",
																	item.href === pathname &&
																		"hover:underline underline-offset-2 font-normal",
																	item.disabled && "pointer-events-none opacity-50",
																)}>
																{item.title}
															</Link>
														</section>
													)
												),
											)}
									</section>
								</section>
							</section>
						</section>
					</SheetContent>
				</Sheet>
			</section>
		</section>
	);
}
