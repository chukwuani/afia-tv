"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HowObuzoWorks = () => {
	return (
		<Card className="flex flex-col overflow-hidden border-none bg-background rounded-none shadow-none pt-20 px-6 md:px-10 lg:px-12 pb-10">
			{/* Section header */}
			<section className="flex justify-between items-center gap-10">
				<CardHeader className="px-0">
					<CardTitle className="text-brand font-anton text-[36px] md:text-[50px] leading-[1.1em] font-normal tracking-[.5px] mb-2 uppercase max-w-[500px]">
						How Does Obuzo Work?
					</CardTitle>
					<CardDescription className="font-outfit text-muted-foreground text-sm md:text-base max-w-[480px]">
						Experience growth through effective advertising strategies designed to reach, inspire,
						and deliver results.
					</CardDescription>
				</CardHeader>
			</section>

			{/* Main Section for duplication */}
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-auto gap-20 items-center mt-10">
				<li className="flex flex-col gap-8">
					<h2 className="text-brand font-anton text-[36px] md:text-[50px] leading-[1.1em] font-normal tracking-[.5px] mb-2 uppercase max-w-[500px]">
						1.
					</h2>
					<section className="flex flex-col gap-5 font-san max-w-[300px] md:max-w-[500px]">
						<h3 className="text-2xl font-normal">Search Engine Optimization</h3>
						<p className="font-outfit text-muted-foreground text-sm md:text-base">
							Boost your website's visibility and attract organic traffic with SEO tailored to your
							business goals.
						</p>
					</section>
				</li>

				<li className="flex flex-col gap-8">
					<h2 className="text-brand font-anton text-[36px] md:text-[50px] leading-[1.1em] font-normal tracking-[.5px] mb-2 uppercase max-w-[500px]">
						2.
					</h2>
					<section className="flex flex-col gap-5 font-san max-w-[300px] md:max-w-[500px]">
						<h3 className="text-2xl font-normal">Content Marketing</h3>
						<p className="font-outfit text-muted-foreground text-sm md:text-base">
							Accurate reporting that represents every voice and community.
						</p>
					</section>
				</li>

				<li className="flex flex-col gap-8">
					<h2 className="text-brand font-anton text-[36px] md:text-[50px] leading-[1.1em] font-normal tracking-[.5px] mb-2 uppercase max-w-[500px]">
						3.
					</h2>
					<section className="flex flex-col gap-5 font-san max-w-[300px] md:max-w-[500px]">
						<h3 className="text-2xl font-normal">Social Media Marketing</h3>
						<p className="font-outfit text-muted-foreground text-sm md:text-base">
							Grow your audience and increase conversions with targeted digital marketing solutions.
						</p>
					</section>
				</li>

				<li className="flex flex-col gap-8">
					<h2 className="text-brand font-anton text-[36px] md:text-[50px] leading-[1.1em] font-normal tracking-[.5px] mb-2 uppercase max-w-[500px]">
						4.
					</h2>
					<section className="flex flex-col gap-5 font-san max-w-[300px] md:max-w-[500px]">
						<h3 className="text-2xl font-normal">Email Marketing</h3>
						<p className="font-outfit text-muted-foreground text-sm md:text-base">
							Maximize your online reach and generate leads with content tailored to your audience.
						</p>
					</section>
				</li>

				<li className="flex flex-col gap-8">
					<h2 className="text-brand font-anton text-[36px] md:text-[50px] leading-[1.1em] font-normal tracking-[.5px] mb-2 uppercase max-w-[500px]">
						5.
					</h2>
					<section className="flex flex-col gap-5 font-san max-w-[300px] md:max-w-[500px]">
						<h3 className="text-2xl font-normal">Influencer Marketing</h3>
						<p className="font-outfit text-muted-foreground text-sm md:text-base">
							Elevate your business with a social media strategy designed for your growth
							objectives.
						</p>
					</section>
				</li>
			</ul>
		</Card>
	);
};

export default HowObuzoWorks;
