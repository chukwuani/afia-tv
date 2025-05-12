"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

const breakingNews = [
	"International Migrants Day: 280 million people leave home for a better life",
	"FIFA World Cup 2022: A Night To Remember",
	"Johnny Depp reprises Jack Sparrow",
];

export function BreakingNews() {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
		}, 5000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className="bg-gray-100 py-3">
			<div className="container mx-auto px-4">
				<div className="flex items-center space-x-4">
					<span className="bg-red-600 text-white px-2 py-1 text-sm font-bold w-auto">
						Breaking News
					</span>
					<div className="flex items-center space-x-2 overflow-hidden">
						<ChevronRight className="w-4 h-4 text-gray-500" />
						<p className="text-sm">{breakingNews[currentIndex]}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
