import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FacebookIcon, TwitterIcon, YoutubeIcon, InstagramIcon } from "lucide-react";

const navigationLinks = {
	"Get News": [
		{ label: "Home", href: "/" },
		{ label: "National", href: "/national" },
		{ label: "Sports", href: "/sports" },
		{ label: "Weather", href: "/weather" },
	],
	Company: [
		{ label: "About Us", href: "/about" },
		{ label: "Vercel's List", href: "/vercel-list" },
		{ label: "Comment Policy", href: "/comment-policy" },
		{ label: "Teams", href: "/teams" },
		{ label: "Contact Us", href: "/contact" },
	],
	Legal: [
		{ label: "Privacy Policy", href: "/privacy" },
		{ label: "Terms of Use", href: "/terms" },
		{ label: "Legal", href: "/legal" },
	],
};

export function SiteFooter() {
	return (
		<footer className="bg-gray-800 text-gray-300">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Navigation Columns */}
					{Object.entries(navigationLinks).map(([title, links]) => (
						<div key={title}>
							<h3 className="text-white font-semibold mb-4">{title}</h3>
							<ul className="space-y-2">
								{links.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											className="text-gray-400 hover:text-white transition-colors">
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}

					{/* Subscribe Section */}
					<div>
						<h3 className="text-white font-semibold mb-4">Subscribe</h3>
						<form className="space-y-2">
							<Input
								type="email"
								placeholder="Email"
								className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
							/>
							<Input
								type="text"
								placeholder="Name"
								className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
							/>
							<Button
								type="submit"
								className="w-full bg-white text-gray-800 hover:bg-gray-200">
								SUBSCRIBE
							</Button>
						</form>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="mt-8 pt-8 border-t border-gray-700">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<div className="text-sm text-gray-400">© News For Today 2023</div>
						<div className="flex space-x-4">
							<Link
								href="#"
								className="text-gray-400 hover:text-white">
								<FacebookIcon className="w-5 h-5" />
								<span className="sr-only">Facebook</span>
							</Link>
							<Link
								href="#"
								className="text-gray-400 hover:text-white">
								<TwitterIcon className="w-5 h-5" />
								<span className="sr-only">Twitter</span>
							</Link>
							<Link
								href="#"
								className="text-gray-400 hover:text-white">
								<YoutubeIcon className="w-5 h-5" />
								<span className="sr-only">YouTube</span>
							</Link>
							<Link
								href="#"
								className="text-gray-400 hover:text-white">
								<InstagramIcon className="w-5 h-5" />
								<span className="sr-only">Instagram</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
