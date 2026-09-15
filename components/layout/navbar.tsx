"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Icons } from "@/components/icons";
import SearchButton from "@/components/layout/search-btn";

import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

export const Navbar = () => {
	const pathname = usePathname();
	const today = new Date();

	function getIgboMarketDay() {
		const days = ["Orie", "Afo", "Nkwo", "Eke"];

		const parts = new Intl.DateTimeFormat("en-CA", {
			timeZone: "Africa/Lagos",
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		}).formatToParts(new Date());

		const y = +(parts.find((p) => p.type === "year")?.value ?? 0);
		const m = +(parts.find((p) => p.type === "month")?.value ?? 0);
		const d = +(parts.find((p) => p.type === "day")?.value ?? 0);

		const current = Date.UTC(y, m - 1, d);
		const start = Date.UTC(y, 0, 1);
		const n = Math.round((current - start) / 86400000) + 1;

		return days[(n - 1) % 4];
	}

	return (
		<header className="sticky top-0 z-50">
			<nav className="font-san h-16 content-center w-full bg-background backdrop-blur-xl transition-all px-4 md:px-12 border-b border-border">
				<header className="sticky top-0 flex h-16 items-center justify-between">
					{/* Today's Date */}
					<div className="text-left hidden lg:block">
						<div>
							<p className="text-xs font-medium uppercase font-azeret-mono">
								{today.toLocaleDateString("en-US", {
									weekday: "long",
									month: "long",
									day: "numeric",
									year: "numeric",
								})}
							</p>
						</div>

						<div>
							<p className="text-xs text-muted-foreground font-medium uppercase font-azeret-mono">
								{getIgboMarketDay()} Market Day
							</p>
						</div>
					</div>

					{/* Logo */}
					<section className="flex items-center">
						<Link href="/" className="flex items-center gap-2 font-normal font-san">
							<div className="flex items-center justify-center rounded-full">
								<span className="sr-only">Afia</span>
								<Image
									className="w-[60px] lg:w-[70px] max-w-none block dark:hidden"
									width={100}
									height={40}
									src="/images/afia_logo.svg"
									alt="Afia Logo"
								/>

								<Image
									className="w-[60px] lg:w-[70px] max-w-none hidden dark:block"
									width={100}
									height={40}
									src="/images/afia_logo_white.svg"
									alt="Afia Logo"
								/>

								{pathname === "/enugustory" && (
									<Image
										className="w-[60px] lg:w-[70px] max-w-none ml-2"
										width={100}
										height={40}
										src="/images/my-enugu-story-logo.png"
										alt="My Enugu Story Logo"
									/>
								)}

								{pathname === "/obuzo" && (
									<Image
										className="w-[60px] lg:w-[80px] max-w-none ml-2"
										width={100}
										height={40}
										src="/images/obuzo-logo.png"
										alt="Obuzo Logo"
									/>
								)}
							</div>
						</Link>
					</section>

					{/* Secondary Navigation Links */}
					<section className="hidden lg:flex items-center justify-center gap-2">
						<SearchButton />

						{/* <ThemeSwitcher /> */}

						<div className="flex items-center gap-4">
							<Link
								href="/live"
								target="_blank"
								className={cn(
									buttonVariants({ variant: "outline" }),
									"inline-flex text-xs font-normal has-[>svg]:!px-2",
								)}>
								<Icons.live className="!size-3 lg:!size-4" />
								Live
							</Link>
						</div>
					</section>

					<MobileNav />
				</header>
			</nav>

			{/* Main Navigation */}
			<section className="hidden lg:flex items-center justify-center w-full px-4 md:px-12 bg-background">
				<NavigationMenu>
					<NavigationMenuList>
						{siteConfig.mainNav
							?.filter((item) => item.title !== siteConfig.mainNav[0]?.title)
							.map((item) =>
								item?.items ? (
									<NavigationMenuItem key={item.title}>
										<NavigationMenuTrigger
											className={cn(
												"text-foreground hover:underline underline-offset-2 text-[12px] font-normal uppercase font-azeret-mono py-4 flex items-center gap-2 !bg-background",
												item.disabled && "pointer-events-none opacity-50",
											)}>
											{item.title}
										</NavigationMenuTrigger>

										<NavigationMenuContent className="bg-accent">
											<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background">
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
										<NavLink
											key={item.href}
											href={item.href}
											pathname={pathname}
											disabled={item.disabled}
											className="inline-flex h-10 w-max items-center justify-center px-4 py-2">
											{item.title}
										</NavLink>
									)
								),
							)}
					</NavigationMenuList>
				</NavigationMenu>
			</section>

			<div className="flex flex-col gap-1 text-left bg-accent px-4 md:px-12 py-2 lg:hidden">
				<p className="text-xs text-[11px] font-medium uppercase font-azeret-mono">
					{today.toLocaleDateString("en-US", {
						weekday: "long",
						month: "long",
						day: "numeric",
						year: "numeric",
					})}
				</p>

				<p className="text-xs text-[11px] text-muted-foreground font-medium uppercase font-azeret-mono">
					{getIgboMarketDay()} Market Day
				</p>
			</div>
		</header>
	);
};

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	disabled?: boolean;
	pathname: string;
}

function NavLink({ children, href, disabled, pathname, className, ...props }: NavLinkProps) {
	return (
		<a
			href={href}
			className={cn(
				"text-foreground hover:underline underline-offset-2 text-[12px] font-medium uppercase font-azeret-mono py-4 flex items-center gap-2",
				href === pathname && "hover:underline underline-offset-2 font-normal",
				disabled && "pointer-events-none opacity-50",
				className,
			)}
			{...props}>
			{children}
		</a>
	);
}

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
							className,
						)}
						{...props}>
						<div className="text-sm font-medium leading-none">{title}</div>
						<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
					</Link>
				</NavigationMenuLink>
			</li>
		);
	},
);
ListItem.displayName = "ListItem";
