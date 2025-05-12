import React from "react";
import { Phone, Facebook, Twitter, Youtube, Instagram } from "lucide-react";

interface NewsItem {
	id: number;
	title: string;
	author: string;
	date: string;
	imageUrl?: string;
	likes?: number;
	comments?: number;
}

const breakingNews = [
	"International Migrants Day: 280 million people leave home for a better life",
	"FIFA World Cup 2022: A Night To Remember",
];

const recentNews: NewsItem[] = [
	{
		id: 1,
		title:
			"Twitter users vote to oust Musk as CEO, So Twitter users voted to call for Elon Musk to step down as chief executive of media.",
		author: "Cristian Romero",
		date: "10 Janu, 2023",
	},
	{
		id: 2,
		title:
			"The Perseverance rover set to make store of rocks that can be brought home by as a future mission.",
		author: "De Paul",
		date: "10 Janu, 2023",
	},
	{
		id: 3,
		title:
			"Argentina defeat France penalties to win the World Cup in a tournament that saw more goals and shocks record numbers...",
		author: "Paulo Dybala",
		date: "10 Janu, 2023",
	},
	{
		id: 4,
		title:
			"China has developed and produced its own vaccines, which have been shown to less effective at protecting people against.",
		author: "Joan Fayth",
		date: "10 Janu, 2023",
	},
];

const featuredArticle: NewsItem = {
	id: 5,
	title: "In Focus : War in Ukraine is going to crisis for women and girls",
	author: "Alexia Mac",
	date: "10-01-23",
	imageUrl:
		"https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=2000",
	likes: 25,
	comments: 39,
};

const sideNews: NewsItem[] = [
	{
		id: 6,
		title: "Argentina won the Fifa World Cup",
		author: "Sports Desk",
		date: "10 Janu, 2023",
		imageUrl:
			"https://images.unsplash.com/photo-1671726203638-83742a2721a1?auto=format&fit=crop&q=80&w=800",
	},
	{
		id: 7,
		title: "Twitter users vote to oust Musk, CEO",
		author: "Tech Desk",
		date: "10 Janu, 2023",
		imageUrl:
			"https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&q=80&w=800",
	},
];

function Top() {
	return (
		<div className="min-h-screen bg-white">
			{/* Top Bar */}
			<div className="bg-white border-b">
				<div className="container mx-auto px-4 py-2 flex justify-between items-center">
					<div className="flex space-x-4">
						<Facebook
							size={16}
							className="text-gray-600"
						/>
						<Twitter
							size={16}
							className="text-gray-600"
						/>
						<Youtube
							size={16}
							className="text-gray-600"
						/>
						<Instagram
							size={16}
							className="text-gray-600"
						/>
					</div>
					<h1 className="text-2xl font-serif font-bold">News For Today</h1>
					<div className="flex items-center space-x-2">
						<Phone
							size={16}
							className="text-gray-600"
						/>
						<span className="text-sm">0890717-515</span>
					</div>
				</div>
			</div>

			{/* Navigation */}
			<nav className="bg-black text-white">
				<div className="container mx-auto px-4">
					<div className="flex items-center space-x-8 py-3">
						<button className="p-1">☰</button>
						<a
							href="#"
							className="hover:text-gray-300">
							Home
						</a>
						<a
							href="#"
							className="hover:text-gray-300">
							International
						</a>
						<a
							href="#"
							className="hover:text-gray-300">
							Business
						</a>
						<a
							href="#"
							className="hover:text-gray-300">
							Politics
						</a>
						<a
							href="#"
							className="hover:text-gray-300">
							Technology
						</a>
						<a
							href="#"
							className="hover:text-gray-300">
							Fashion
						</a>
						<a
							href="#"
							className="hover:text-gray-300">
							Corona
						</a>
						<a
							href="#"
							className="hover:text-gray-300">
							Sports
						</a>
						<a
							href="#"
							className="hover:text-gray-300">
							Video
						</a>
					</div>
				</div>
			</nav>

			{/* Breaking News Ticker */}
			<div className="bg-white border-b">
				<div className="container mx-auto px-4 py-2">
					<div className="flex items-center space-x-4 overflow-x-auto whitespace-nowrap">
						<span className="bg-black text-white px-3 py-1 text-sm font-bold">Breaking News</span>
						{breakingNews.map((news, index) => (
							<React.Fragment key={index}>
								<span className="text-sm">{news}</span>
								{index < breakingNews.length - 1 && <span className="text-gray-400">→</span>}
							</React.Fragment>
						))}
					</div>
				</div>
			</div>

			{/* Main Content */}
			<main className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-12 gap-8">
					{/* Recent News Sidebar */}
					<div className="col-span-12 md:col-span-3">
						<h2 className="text-xl font-bold mb-4">Recent News</h2>
						<div className="space-y-6">
							{recentNews.map((news) => (
								<div
									key={news.id}
									className="border-b pb-4">
									<h3 className="font-medium mb-2 hover:text-blue-600 cursor-pointer">
										{news.title}
									</h3>
									<div className="flex items-center text-sm text-gray-500 space-x-4">
										<span>{news.author}</span>
										<span>{news.date}</span>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Featured Article */}
					<div className="col-span-12 md:col-span-6">
						<div className="bg-white">
							<img
								src={featuredArticle.imageUrl}
								alt={featuredArticle.title}
								className="w-full h-[400px] object-cover mb-4"
							/>
							<h2 className="text-2xl font-bold mb-2">{featuredArticle.title}</h2>
							<p className="text-gray-600 mb-4">
								The war has severely impacted social cohesion, community security and resilience of
								local communities, especially women and girls. Lack of access to social services
								including schools & trained community resources has increased the care burden of
								local women who responsible for the care for children.
							</p>
							<div className="flex items-center space-x-4 text-sm text-gray-500">
								<div className="flex items-center space-x-2">
									<img
										src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=50"
										alt="Author"
										className="w-6 h-6 rounded-full"
									/>
									<span>By {featuredArticle.author}</span>
								</div>
							</div>
						</div>
					</div>

					{/* Side News */}
					<div className="col-span-12 md:col-span-3">
						{sideNews.map((news) => (
							<div
								key={news.id}
								className="mb-6">
								<img
									src={news.imageUrl}
									alt={news.title}
									className="w-full h-48 object-cover mb-2"
								/>
								<h3 className="font-bold mb-2 hover:text-blue-600 cursor-pointer">{news.title}</h3>
								<p className="text-sm text-gray-600">
									Argentina vs France, FIFA World Cup 2022: Argentina bested France 4-2 penalties to
									win their third World Cup, after 36 years.
								</p>
							</div>
						))}
					</div>
				</div>
			</main>

			{/* Date Display */}
			<div className="fixed top-0 right-4 bg-white px-4 py-2 text-sm">Monday, 02 February 2023</div>
		</div>
	);
}

export default Top;
