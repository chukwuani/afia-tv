import { PlusIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";

const items = [
	{
		id: "1",
		title: "What is Afia TV?",
		content:
			"Afia TV is the first regional television channel dedicated to telling the stories of Southeastern Nigeria. We broadcast news, culture, entertainment, and original documentries 24/7 on DStv 254 and GOtv 17.",
	},
	{
		id: "2",
		title: "How can I watch Afia TV?",
		content:
			"You can watch Afia TV live on DStv channel 254 and GOtv channel 17. Some content is also available on our website and social media platforms.",
	},
	{
		id: "3",
		title: "Is Afia TV only for Igbo speakers?",
		content:
			"Not at all! While we promote Igbo heritage, our content is broadcast in English, Pidgin, and Igbo to ensure inclusivity and accessibility.",
	},
	{
		id: "4",
		title: "Can I stream Afia TV online?",
		content:
			"Yes. Select shows, news clips, and special features are available for streaming on our website and YouTube channel. A full live stream is available through DStv and GOtv subscriptions.",
	},
  {
		id: "5",
		title: "How can I get featured on Afia TV?",
		content:
			"If you're an entrepreneur, artist, or community leader with a story to share, reach out to us via our contact page. We love showcasing local talent and initiatives.",
	},
	{
		id: "6",
		title: "How do I advertise on Afia TV?",
		content:
			"We offer custom advertising solutions for brands and businesses. Please visit our Advertise page or reach out to our sales team via email or phone.",
	},
	{
		id: "7",
		title: "Is Afia TV available outside Nigeria?",
		content:
			"Yes, Afia TV is accessible internationally through DStv and GOtv services in select countries. Online viewers can also access content globally through our digital platforms.",
	},
	{
		id: "8",
		title: "Can I volunteer or intern with Afia TV?",
		content:
			"Absolutely! We welcome passionate individuals interested in media, culture, and storytelling. Check our Careers page for current opportunities and application details.",
	},
];

export default function Component() {
	return (
		<section className="flex flex-col items-center justify-center py-32 px-6 md:px-10 lg:px-20 w-full pt-0">
			<div className="flex flex-col items-center w-full">
				{/* Section header */}
				<header className="flex flex-col items-center justify-center gap-[18px] max-w-[650px] w-full mb-18">
					<h1
						className="text-pretty text-[2.5rem] leading-[4rem] -tracking-[.053rem] lg:text-[4rem] lg:leading-[5rem] lg:-tracking-[.078rem] text-center font-epilogue font-normal mx-auto
            ">
						Everything you need to know
					</h1>
				</header>

				<Accordion type="single" collapsible className="w-full space-y-3 px-6" defaultValue="3">
					{items.map((item) => (
						<AccordionItem
							value={item.id}
							key={item.id}
							className="bg-accent border-0 has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md px-6 py-5 outline-none has-focus-visible:ring-[3px]">
							<AccordionPrimitive.Header className="flex">
								<AccordionPrimitive.Trigger className="ocus-visible:ring-0 flex flex-1 items-center justify-between rounded-md py-2 text-left text-[16px] leading-6 font-semibold transition-all outline-none [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
									{item.title}
									<PlusIcon
										size={16}
										className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
										aria-hidden="true"
									/>
								</AccordionPrimitive.Trigger>
							</AccordionPrimitive.Header>
							<AccordionContent className="text-muted-foreground pb-2 font-dm-sans">
								{item.content}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
