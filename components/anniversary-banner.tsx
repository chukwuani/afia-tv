"use client";
import { useState } from "react";

export default function AnniversaryBanner() {
	const [visible, setVisible] = useState(true);

	if (!visible) return null;

	return (
		<div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-white relative">
			<div className="container mx-auto px-4 py-3 text-center">
				<p className="text-sm md:text-lg font-bold flex items-center justify-center gap-2 flex-wrap">
					<span>Celebrating 3 Years of Trusted News Coverage!</span>
				</p>
			</div>
			<button
				onClick={() => setVisible(false)}
				className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-1 transition"
				aria-label="Close banner">
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	);
}
