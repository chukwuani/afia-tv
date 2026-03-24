"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Icons } from "@/components/icons";
import { ThemeSwitcher } from "@/components/theme-switcher";
import DonateDialog from "@/components/donate-dialog";

import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

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
									className="w-[70px] h-10 max-w-none block dark:hidden"
									width={100}
									height={40}
									src="/images/afia_logo.svg"
									alt="Afia Logo"
								/>

								<Image
									className="w-[70px] h-10 max-w-none hidden dark:block"
									width={100}
									height={40}
									src="/images/afia_logo_white.svg"
									alt="Afia Logo"
								/>
							</div>
						</Link>
					</section>

					<NavigationMenu className="hidden md:flex">
						<NavigationMenuList>
							{siteConfig.mainNav.map(
								(navItems, index) =>
									navItems.href && (
										<NavLink
											key={index}
											href={navItems.href}
											pathname={pathname}
											disabled={navItems.disabled}
											className="inline-flex h-10 w-max items-center justify-center px-4 py-2 transition-colors focus:text-brand focus:outline-none">
											{navItems.title}
										</NavLink>
									),
							)}
						</NavigationMenuList>
					</NavigationMenu>

					<section className="hidden lg:flex items-center justify-center gap-2">
						<ThemeSwitcher />

						{/* <div className="flex items-center gap-4">
							<DonateDialog />
						</div> */}

						<div className="flex items-center gap-4">
							<Link
								href="/live"
								target="_blank"
								className={cn(
									buttonVariants({ variant: "outline" }),
									"inline-flex text-base font-normal",
								)}>
								<Icons.live />
								Live
							</Link>
						</div>
					</section>

					<MobileNav />
				</header>
			</nav>
		</>
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
				"text-foreground/60 transition-colors hover:text-foreground text-[0.775rem] font-medium capitalize py-4 flex items-center gap-2",
				href === pathname && "text-brand hover:text-brand font-medium",
				disabled && "pointer-events-none opacity-60",
				className,
			)}
			{...props}>
			{children}
		</a>
	);
}
