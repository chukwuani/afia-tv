"use client";

import { PlusIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const questions = [
	{
		id: "1",
		title: "What is Afia TV?",
		content:
			"Afia TV is the first regional television channel dedicated to telling the stories of Southeastern Nigeria. We broadcast news, culture, entertainment, and original documentries 24/7 on DStv 254 and GOtv 17.",
	},
	{
		id: "2",
		title: "Is Afia TV only for Igbo speakers?",
		content:
			"Not at all! While we promote Igbo heritage, our content is broadcast in English, Pidgin, and Igbo to ensure inclusivity and accessibility.",
	},
	{
		id: "3",
		title: "Can I stream Afia TV online?",
		content:
			"Yes, Afia TV is accessible internationally through DStv and GOtv services in select countries. Online viewers can also access content globally through our digital platforms. Select shows, news clips, and special features are available for streaming on our website and YouTube channel. A full live stream is available through DStv and GOtv subscriptions.",
	},
	{
		id: "4",
		title: "How can I get featured on Afia TV?",
		content:
			"If you're an entrepreneur, artist, or community leader with a story to share, reach out to us via our contact page. We love showcasing local talent and initiatives.",
	},
	// {
	// 	id: "5",
	// 	title: "How do I advertise on Afia TV?",
	// 	content:
	// 		"We offer custom advertising solutions for brands and businesses. Please visit our Advertise page or reach out to our sales team via email or phone.",
	// },
	// {
	// 	id: "6",
	// 	title: "Can I volunteer or intern with Afia TV?",
	// 	content:
	// 		"Absolutely! We welcome passionate individuals interested in media, culture, and storytelling. Check our Careers page for current opportunities and application details.",
	// },
];

export default function Faq() {
	return (
		<section className="flex flex-col items-center justify-center py-20 px-6 md:px-10 lg:px-12 w-full">
			<div className="grid grid-cols-1 items-center md:grid-cols-2 gap-4 w-full">
				{/* Section header */}
				<CardHeader className="px-0 pt-0">
					<CardTitle className="text-brand font-anton text-[36px] md:text-[80px] leading-[1.1em] font-normal tracking-[.5px] mb-3 uppercase">
						Everything
						<br />
						you need
						<br />
						to know
					</CardTitle>
					<CardDescription className="font-dm-sans text-muted-foreground text-sm md:text-base max-w-[412px]">
						Everything you need to know about Afia. Learn more about our platform, content, and how
						to engage with us.
					</CardDescription>
				</CardHeader>

				<Accordion type="single" collapsible className="w-full space-y-3" defaultValue="1">
					{questions.map((item) => (
						<AccordionItem
							value={item.id}
							key={item.id}
							className="bg-transparent border-0 has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md py-5 outline-none has-focus-visible:ring-[3px]">
							<AccordionPrimitive.Header className="flex">
								<AccordionPrimitive.Trigger className="focus-visible:ring-0 flex flex-1 items-center justify-between rounded-md py-2 text-left font-anton text-[24px] leading-[140%] tracking-normal transition-all outline-none [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>span>svg]:rotate-180 [&[data-state=open]>span>svg>path:last-child]:rotate-180 [&[data-state=open]>span>svg>path:last-child]:opacity-0 uppercase">
									{item.title}

									<span className="bg-brand cursor-pointer rounded-full p-1.5 flex items-center justify-center ml-2">
										<PlusIcon
											size={16}
											className="pointer-events-none shrink-0 transition-transform duration-200"
											aria-hidden="true"
										/>
									</span>
								</AccordionPrimitive.Trigger>
							</AccordionPrimitive.Header>

							<AccordionContent className="text-muted-foreground pb-2 font-dm-sans text-sm tracking-normal pt-2">
								{item.content}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
