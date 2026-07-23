"use client";

import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import JoinNewsletterForm from "@/components/join-newsletter-form";
import { Icons } from "@/components/icons";
import { Facebook } from "lucide-react";

export default function Footer() {
	return (
		<footer className="w-full bg-black relative overflow-hidden">
			<div className="relative w-full min-h-[150px] bg-cover bg-center bg-no-repeat bg-[url('/images/pattern.png')]" />
			<section className="px-6 sm:px-12 md:pt-[60px] z-10 relative mx-0 grid items-center gap-8 pb-8 pt-6">
				<section
					id="footer-content"
					aria-labelledby="footer-content-heading"
					className="flex flex-col gap-10 lg:flex-row mb-0">
						<section className="xl:mr-10">
						<JoinNewsletterForm />	
						</section>
					

					<section
						id="footer-links"
						aria-labelledby="footer-links-heading"
						className="grid flex-1 grid-cols-1 gap-10 xxs:grid-cols-2 sm:grid-cols-3">
						{siteConfig.footerNav.map((item) => (
							<div key={item.title} className="space-y-3">
								<h4 className="text-xs font-medium uppercase font-azeret-mono mb-4 text-white">
									{item.title}
								</h4>
								<ul className="space-y-2">
									{item.items.map((link) => (
										<li key={link.title}>
											<Link
												href={link.href}
												target={link?.external ? "_blank" : undefined}
												rel={link?.external ? "noreferrer" : undefined}
												className={cn(
													"text-xs font-medium text-muted-foreground transition-colors hover:text-background",
													link.disabled && "pointer-events-none opacity-60",
												)}>
												{link.title}
												<span className="sr-only">{link.title}</span>
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</section>

					<div className="FooterLarge_right__Tsov5 md:!col-span-1">
						<div className="">
							<p className="text-[12px] leading-[14px] uppercase font-azeret-mono mb-4 text-white">
								Follow us
							</p>
							<div className="Follow_buttons__wm2FF text-white">
								<Link className="Follow_button__5rd4x" href={siteConfig.links.x} target="_blank">
									<span className="sr-only">Follow Origin on X (opens in new window)</span>
									<svg
										className="Follow_icon__XNozr Follow_x__CI_E0"
										viewBox="0 0 20 18"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="m11.93 7.58 6.85-7.4h-2.03l-5.73 6.19L6.43.23 6.39.17H.5l7.26 9.71-7.35 7.94h2.03l6.23-6.73 4.99 6.67.04.06h5.89L11.93 7.58zM5.64 1.67l10.97 14.66h-2.16L3.48 1.67h2.16z"
											fill="currentcolor"></path>
									</svg>
								</Link>

								<Link
									className="Follow_button__5rd4x"
									href={siteConfig.links.linkedin}
									target="_blank">
									<span className="sr-only">Follow Afia on LinkedIn (opens in new window)</span>
									<svg
										className="Follow_icon__XNozr Follow_linkedin__SV9zB"
										viewBox="0 0 18 18"
										xmlns="http://www.w3.org/2000/svg">
										<path
											clipRule="evenodd"
											d="M.32 6.02h3.82v11.49H.32zM2.25.48C.94.48.09 1.34.09 2.47c0 1.1.83 1.99 2.11 1.99h.02c1.33 0 2.16-.88 2.16-1.99C4.36 1.34 3.56.48 2.25.48zM13.51 5.75c-2.03 0-2.94 1.12-3.44 1.9v.04h-.03c.01-.01.02-.03.03-.04V6.02H6.25c.05 1.08 0 11.49 0 11.49h3.82V11.1c0-.34.02-.69.13-.93.28-.69.9-1.4 1.96-1.4 1.38 0 1.94 1.05 1.94 2.6v6.15h3.82v-6.59c-.01-3.53-1.89-5.18-4.41-5.18z"
											fillRule="evenodd"
											fill="currentcolor"></path>
									</svg>
								</Link>

								<Link
									className="Follow_button__5rd4x"
									href={siteConfig.links.instagram}
									target="_blank">
									<span className="sr-only">Follow Origin on Instagram (opens in new window)</span>
									<svg
										className="Follow_icon__XNozr Follow_instagram__0XHpW"
										viewBox="0 0 26 26"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M13 7c-1.2 0-2.3.4-3.3 1s-1.8 1.6-2.2 2.7c-.5 1.1-.6 2.3-.4 3.5.2 1.2.8 2.2 1.6 3.1.8.8 1.9 1.4 3.1 1.6 1.2.2 2.4.1 3.5-.3 1.1-.5 2-1.2 2.7-2.2s1-2.1 1-3.3c0-1.6-.6-3.1-1.8-4.2C16.1 7.6 14.6 7 13 7zm0 10c-.8 0-1.6-.2-2.2-.7-.7-.4-1.2-1.1-1.5-1.8-.3-.7-.4-1.5-.2-2.3.2-.8.5-1.5 1.1-2 .6-.6 1.3-.9 2-1.1.8-.2 1.6-.1 2.3.2.7.3 1.4.8 1.8 1.5.4.7.7 1.4.7 2.2 0 1.1-.4 2.1-1.2 2.8-.7.8-1.7 1.2-2.8 1.2zm6-17H7C5.1 0 3.4.7 2.1 2.1.7 3.4 0 5.1 0 7v12c0 1.9.7 3.6 2.1 4.9C3.4 25.3 5.1 26 7 26h12c1.9 0 3.6-.7 4.9-2.1 1.3-1.3 2.1-3.1 2.1-4.9V7c0-1.9-.7-3.6-2.1-4.9C22.6.7 20.9 0 19 0zm5 19c0 1.3-.5 2.6-1.5 3.5-.9 1-2.2 1.5-3.5 1.5H7c-1.3 0-2.6-.5-3.5-1.5-1-.9-1.5-2.2-1.5-3.5V7c0-1.3.5-2.6 1.5-3.5C4.4 2.5 5.7 2 7 2h12c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5v12zM21 6.5c0 .3-.1.6-.3.8-.2.2-.4.4-.7.6-.2.1-.5.1-.8.1-.3-.1-.6-.2-.8-.4-.2-.2-.4-.5-.4-.8-.1-.3 0-.6.1-.9.1-.3.3-.5.6-.7.2-.1.5-.2.8-.2.4 0 .8.2 1.1.4.2.3.4.7.4 1.1z"
											fill="currentcolor"></path>
									</svg>
								</Link>

								<Link
									className="Follow_button__5rd4x"
									href={siteConfig.links.facebook}
									target="_blank">
									<span className="sr-only">Follow Origin on Facebook (opens in new window)</span>
									<Facebook className="Follow_icon__XNozr Follow_reddit__MsnuJ" />
								</Link>

								<Link
									className="Follow_button__5rd4x"
									href={siteConfig.links.youtube}
									target="_blank">
									<span className="sr-only">
										Subscribe to Afia on YouTube (opens in new window)
									</span>
									<svg
										className="Follow_icon__XNozr Follow_youtube__dy2IG"
										viewBox="0 0 22 16"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="m13 8.001-3.5 2v-4z"
											fill="currentcolor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="1.5"
											stroke="currentcolor"></path>
										<path
											d="M1 8.708V7.293c0-2.895 0-4.343.905-5.274S4.236 1.047 7.087.967C8.438.929 9.818.901 10.999.901s2.561.027 3.912.066c2.851.081 4.277.121 5.182 1.052s.905 2.379.905 5.274v1.415c0 2.895 0 4.343-.905 5.274-.906.932-2.331.972-5.182 1.052-1.351.038-2.731.066-3.912.066s-2.561-.027-3.912-.066c-2.851-.081-4.277-.121-5.182-1.052S1 11.603 1 8.708Z"
											fill="none"
											strokeWidth="1.5"
											stroke="currentcolor"></path>
									</svg>
								</Link>

								<Link
									className="Follow_button__5rd4x"
									href={siteConfig.links.whatsapp}
									target="_blank">
									<span className="sr-only">Follow Origin on WhatsApp (opens in new window)</span>

									<Icons.whatsapp className="size-5" aria-hidden="true" />
									<span className="sr-only">WhatsApp</span>
								</Link>
							</div>
						</div>
					</div>
				</section>

				<section
					id="footer-bottom"
					aria-labelledby="footer-bottom-heading"
					className="flex flex-col items-start space-x-4 max-sm:mt-1">
					<section>
						<Link href="/" className="flex w-full h-auto max-w-[200px] items-center space-x-2">
							<Image
								width={100}
								height={92}
								src={"/images/afia_logo_white.svg"}
								alt="Afia Radio"
								title="Afia Radio"
							/>

							<span className="sr-only">Home</span>
						</Link>

						<div className="flex-1 text-left text-[10px] leading-[14px] font-medium text-muted-foreground min-w-[100px] uppercase font-azeret-mono">
							© 2026 Afia Network. All Rights Reserved.
						</div>
					</section>
				</section>
			</section>
		</footer>
	);
}
