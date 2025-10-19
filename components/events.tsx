import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import Link from "next/link";
import MyImage from "./my-image";
// Define event card data for mapping
const eventsCard = [
	{
		id: 1,
		title: "Mike Ejeagha Day 2024",
		description:
			"Mike Ejeagha Day is set aside to Honour the Legend. MIKE EJEAGHA. The event features the screening",
		iconSrc: "/images/mike.jpg",
		link: "https://afiahomecoming.com/event.php?ka=66",
	},
	{
		id: 2,
		title: "Golibe Festival",
		description:
			"Golibe Festival is an annual Festival of Culture and contemporary music, dance and art specially designed to showcase the rich cultural heritage of the people of Enugu State, Nigeria.",
		iconSrc: "/images/golibe-festival.jpg",
		link: "https://afiahomecoming.com/event.php?ka=31",
	},
	{
		id: 5,
		title: "25 Days of Christmas Festival in Enugu AfroBeat Lockdown",
		description:
			"Afrobeat Concert also known as ROADBLOCK, is a vibrant celebration of Nigeria's music industry, featuring top artists and a diverse lineup of performers.",
		iconSrc: "/images/abl.jpg",
		link: "https://afiahomecoming.com/event.php?ka=62",
	},
];

const Events = () => {
	return (
		<section className="flex flex-col items-center justify-center py-20 pb-0 px-6 md:px-10 lg:px-12 w-full">
			<div className="flex flex-col items-center w-full">
				{/* Section header */}

				<section className="flex justify-between items-center gap-10 w-full">
					<CardHeader className="px-0 w-full">
						<CardTitle className="text-brand font-anton text-[36px] md:text-[50px] leading-[1.1em] font-normal tracking-[.5px] mb-2 uppercase">
							Afia Homecoming
						</CardTitle>
						<CardDescription className="font-dm-sans text-muted-foreground text-sm md:text-base max-w-[480px] mb-5">
							Experience the Pulse of the East. See our past and upcoming events, festivals, and
							community showcases
						</CardDescription>
					</CardHeader>

					<Link
						href="https://afiahomecoming.com"
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
							buttonVariants({ variant: "outline" }),
							"hidden md:flex h-11 w-auto text-sm rounded-[1000px] px-10 py-2"
						)}>
						View all events
					</Link>
				</section>

				{/* event cards grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
					{eventsCard.map((event) => (
						<Card
							key={event.id}
							className="bg-[#ffffff0b] rounded-[28px] overflow-hidden shadow-none border-none">
							<CardContent className="flex flex-col justify-between h-full p-6">
								<div className="w-full h-[250px] mb-4">
									<MyImage
										className="w-full h-[250px] rounded-[12px] object-cover object-top"
										alt={event.title}
										src={event.iconSrc}
									/>
								</div>

								<div className="flex flex-col gap-2 mb-4">
									<h3 className="font-anton text-[24px] leading-[140%] tracking-normal mt-1 mb-2 line-clamp-2 uppercase">
										{event.title}
									</h3>
									<p className="text-sm font-dm-sans text-muted-foreground line-clamp-2">
										{event.description}
									</p>
								</div>

								<div className="flex items-center justify-start w-auto">
									<Link
										href={event.link}
										target="_blank"
										rel="noopener noreferrer"
										className={cn(
											buttonVariants({ variant: "default" }),
											"h-11 w-auto bg-imaginative-timing-328979framerappmine-shaft text-white text-sm rounded-[1000px] px-10 py-2"
										)}>
										View event
									</Link>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<Link
					href="https://afiahomecoming.com"
					target="_blank"
					rel="noopener noreferrer"
					className={cn(
						buttonVariants({ variant: "outline" }),
						"flex md:hidden h-11 w-auto text-sm rounded-[1000px] px-10 py-2 mt-12"
					)}>
					View all events
				</Link>
			</div>
		</section>
	);
};

export default Events;
