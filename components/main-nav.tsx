import Link from "next/link";

const navItems = [
	{ title: "Home", href: "/" },
	{ title: "International", href: "/international" },
	{ title: "Business", href: "/business" },
	{ title: "Politics", href: "/politics" },
	{ title: "Technology", href: "/technology" },
	{ title: "Fashion", href: "/fashion" },
	{ title: "Corona", href: "/corona" },
	{ title: "Sports", href: "/sports" },
	{ title: "Video", href: "/video" },
];

export function MainNav() {
	return (
		<nav className="bg-black">
			<div className="container mx-auto">
				<ul className="flex items-center gap-2 space-x-6 px-4 py-2">
					{navItems.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className="block py-2 text-sm text-white hover:text-gray-300 transition-colors">
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
