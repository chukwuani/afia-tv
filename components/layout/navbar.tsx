"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MobileNav } from "@/components/layout/mobile-nav";

import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

export const Navbar = () => {
	const pathname = usePathname();

	return (
		<>
			<nav className="font-san sticky top-0 z-50 h-16 content-center w-full bg-background backdrop-blur-xl transition-all px-4 md:px-12">
				<header className="sticky top-0 flex h-16 items-center justify-between">
					<section className="flex items-center">
						<Link href="/" className="flex items-center gap-2 font-normal font-san">
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

					<NavigationMenu className="hidden md:flex">
						<NavigationMenuList>
							{siteConfig.mainNav.map((item) =>
								item?.items ? (
									<NavigationMenuItem key={item.title}>
										<NavigationMenuTrigger className="font-dm-sans text-[0.75rem] tracking-[2.4px] uppercase group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 font-normal transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
											{item.title}
										</NavigationMenuTrigger>

										<NavigationMenuContent className="!bg-black">
											<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-accent">
												{item.items.map((item) => (
													<ListItem key={item.title} title={item.title} href={item.href}>
														{item.description}
													</ListItem>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								) : (
									item.href && (
										<NavigationMenuItem key={item.title} className="text-lg font-normal">
											<NavigationMenuLink
												href={item.href}
												className="font-dm-sans text-[0.75rem] uppercase tracking-[2.4px] group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 font-normal transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
												{item.title}
											</NavigationMenuLink>
										</NavigationMenuItem>
									)
								)
							)}
						</NavigationMenuList>
					</NavigationMenu>

					<div className="hidden lg:flex items-center gap-4">
						{pathname !== "/" && <Icons.search className="size-[18px] fill-white" />}

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

					<MobileNav />
				</header>
			</nav>
		</>
	);
};

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
	({ className, title, children, href, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<Link
						ref={ref}
						href={String(href)}
						className={cn(
							"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
							className
						)}
						{...props}>
						<div className="text-sm font-medium leading-none">{title}</div>
						<p className="line-clamp-2 text-sm leading-snug text-muted-foreground ">{children}</p>
					</Link>
				</NavigationMenuLink>
			</li>
		);
	}
);
ListItem.displayName = "ListItem";
