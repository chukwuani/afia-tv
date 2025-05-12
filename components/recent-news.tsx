import { Card, CardContent } from "@/components/ui/card";

const recentNews = [
	{
		title:
			"Twitter users vote to oust Musk as CEO, So Twitter users voted to call for Elon Musk to step down as chief executive of media.",
		author: "Cristian Romero",
		date: "10 Janu, 2023",
	},
	{
		title:
			"The Perseverance rover set to make store of rocks that can be brought home by as a future mission.",
		author: "De Paul",
		date: "10 Janu, 2023",
	},
	{
		title:
			"Argentina defeat France o penalties to win the World Cup in a tournament that saw more goals and shocks record numbers...",
		author: "Paulo Dybala",
		date: "10 Janu, 2023",
	},
	{
		title:
			"China has developed and produced its own vaccines, which have been shown to less effective at protecting people against.",
		author: "Juan Foyth",
		date: "10 Janu, 2023",
	},
];

export function RecentNews() {
	return (
		<div className="space-y-4">
			<h2 className="text-xl font-bold underline">Recent News</h2>
			{recentNews.map((news, index) => (
				<Card
					key={index}
					className="border-0 shadow-none">
					<CardContent className="px-0">
						<h3 className="font-medium mb-2">{news.title}</h3>
						<div className="flex items-center text-sm text-gray-500 space-x-2">
							<span>{news.author}</span>
							<span>•</span>
							<span>{news.date}</span>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
