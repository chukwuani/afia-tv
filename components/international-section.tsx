import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const internationalNews = [
	{
		image:
			"https://media-cldnry.s-nbcnews.com/image/upload/t_focal-762x508,f_auto,q_auto:best/rockcms/2025-01/250122-elon-musk-ch-1132-9b8ec2.jpg",
		title: "China Covid: Everyone know is getting a fever in Chaina.",
		description:
			"In the past two weeks, the Chinese internet has been flooded with posts of how people were pulling through...",
		imageAlt: "People wearing protective gear during Covid",
	},
	{
		image:
			"https://media-cldnry.s-nbcnews.com/image/upload/t_focal-762x508,f_auto,q_auto:best/rockcms/2025-01/250122-elon-musk-ch-1132-9b8ec2.jpg",
		title: "Zelensky invokes World War II, says 'no compromises'.",
		description:
			"Invoking memories of the United State's victory over a Nazi Germany in a key World War II battle...",
		imageAlt: "Zelensky speaking at podium",
	},
	{
		image:
			"https://media-cldnry.s-nbcnews.com/image/upload/t_focal-762x508,f_auto,q_auto:best/rockcms/2025-01/250122-elon-musk-ch-1132-9b8ec2.jpg",
		title: "Biden congratulates Israel's Netanyahu in phone call.",
		description:
			"Joe Biden has congratulated Israel's Benjamin on his election victory as the incoming Israeli prime minister...",
		imageAlt: "Netanyahu speaking at podium with flags",
	},
];

export function InternationalSection() {
	return (
		<section className="container mx-auto py-8">
			<h2 className="text-2xl font-bold mb-6 uppercase tracking-wide">International</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{internationalNews.map((news, index) => (
					<Card
						key={index}
						className="border-0 shadow-none">
						<CardContent className="p-0">
							<div className="aspect-video relative mb-4">
								<Image
									src={news.image || "/placeholder.svg"}
									alt={news.imageAlt}
									fill
									className="object-cover"
								/>
							</div>
							<h3 className="text-lg font-bold mb-2 hover:text-blue-600 cursor-pointer">
								{news.title}
							</h3>
							<p className="text-sm text-gray-600">{news.description}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
