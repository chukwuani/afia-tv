"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import { ThemeSwitcher } from "@/components/theme-switcher";
import DonateDialog from "@/components/donate-dialog";

export function MobileNav() {
	const pathname = usePathname();
	const { isDesktop } = useMediaQuery();

	const [open, setOpen] = React.useState(false);

	if (isDesktop) return null;

	return (
		<section className="flex lg:hidden gap-3 items-center justify-between">
			{/* <DonateDialog /> */}

			<ThemeSwitcher />

			<Link
				href="/live"
				target="_blank"
				className={cn(
					buttonVariants({ variant: "outline" }),
					"inline-flex text-base font-normal rounded",
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
												<Link
													key={item.title + index}
													href={item.href}
													onClick={() => setOpen(false)}
													className={cn(
														"group w-full rounded-md bg-background px-2 font-outfit focus:text-brand focus:outline-none text-foreground/60 transition-colors hover:text-foreground text-[0.775rem] font-medium capitalize py-4 flex items-center gap-2",
														item.href === pathname && "text-brand hover:text-brand font-medium",
														item.disabled && "pointer-events-none opacity-60",
													)}>
													{item.title}
												</Link>
											</section>
										))}
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
