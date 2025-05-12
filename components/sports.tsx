import React from "react";
import { Clock } from "lucide-react";

interface Article {
	id: number;
	title: string;
	category: string;
	timeAgo: string;
	imageUrl: string;
	description?: string;
	isMain?: boolean;
}

const articles: Article[] = [
	{
		id: 1,
		title: "Celtic make 'little bit of history' with Champions League progress",
		category: "Football",
		timeAgo: "7 hours ago",
		description:
			"Celtic secured a place in the Champions League knockout stage for the first time in 12 years as Loris Benito's late own goal earned a dramatic 1-0 win over Young Boys.",
		imageUrl:
			"https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1200",
		isMain: true,
	},
	{
		id: 2,
		title: "Six Nations to feature 20-minute red cards for first time",
		category: "Rugby",
		timeAgo: "28 minutes ago",
		imageUrl:
			"https://images.unsplash.com/photo-1544213456-bc37cb97df74?auto=format&fit=crop&q=80&w=600",
	},
	{
		id: 3,
		title: "Girona coach proud despite Champions League disappointment",
		category: "Football",
		timeAgo: "34 minutes ago",
		imageUrl:
			"https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=600",
	},
	{
		id: 4,
		title: "Pochettino happy after 'amazing' USA beat Costa Rica",
		category: "Football",
		timeAgo: "1 hour ago",
		imageUrl:
			"https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600",
	},
];

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
	const cardClass = article.isMain ? "col-span-full" : "col-span-full md:col-span-1";

	return (
		<div className={`group ${cardClass}`}>
			<div className="relative overflow-hidden">
				<img
					src={article.imageUrl}
					alt={article.title}
					className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
						article.isMain ? "h-[500px]" : "h-[220px]"
					}`}
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
					<div className="absolute bottom-0 p-6 text-white">
						<div className="flex items-center space-x-3 mb-3">
							<span className="text-sm font-bold bg-[#ff0000] px-3 py-1 rounded">
								{article.category}
							</span>
							<div className="flex items-center text-sm text-gray-300">
								<Clock
									size={14}
									className="mr-1"
								/>
								{article.timeAgo}
							</div>
						</div>
						<h2 className={`font-bold mb-2 ${article.isMain ? "text-3xl" : "text-xl"}`}>
							{article.title}
						</h2>
						{article.description && (
							<p className="text-gray-300 text-sm leading-relaxed max-w-3xl">
								{article.description}
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

function Sports() {
	return (
		<div className="min-h-screen ">
			<h2 className="text-2xl font-bold uppercase tracking-wide">Sports</h2>

			<main className="container mx-auto py-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{articles.map((article) => (
						<ArticleCard
							key={article.id}
							article={article}
						/>
					))}
				</div>
			</main>
		</div>
	);
}

export default Sports;
