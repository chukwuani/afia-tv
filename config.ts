import { FooterItem, MainNavItem } from "@/types";

export const PRODUCTS = [
	{
		title: "AM Show",
		description: "Experience the best of cinema with our latest movies, trailers, and reviews.",
		href: "/news",
	},
	{
		title: "Business Morning",
		description: "Stay tuned to the latest news, music, and entertainment on Afia Radio.",
		href: "/news",
	},
	{
		title: "Afia News",
		description: "Explore our collection of videos covering news, entertainment, and more.",
		href: "/news",
	},
];

const SOCIAL_LINKS = {
	instagram: "https://instagram.com/afiatvofficial",
	x: "https://x.com/afiatvofficial",
	facebook: "https://facebook.com/afiatvofficial",
	youtube: "https://youtube.com/@afiatvofficial",
	linkedin: "https://linkedin.com/company/afiaofficial",
};

export type SiteConfig = typeof siteConfig;
export type MainNav = typeof siteConfig.mainNav;

export const siteConfig = {
	title: "Afia TV",
	description:
		"Celebrating the Heart of the East. Experience our vibrant traditions, stories, and entertainment.",
	url: "https://afiatv.net",
	ogImage: "https://afiatv.net/opengraph-image.jpg",
	links: SOCIAL_LINKS,
	mainNav: [
		{
			title: "Home",
			href: "/",
			external: false,
			disabled: false,
		},
		{
			title: "About",
			href: "/about",
			external: false,
			disabled: false,
		},
		{
			title: "News",
			href: "/news",
			external: false,
			disabled: false,
		},
		{
			title: "Podcast",
			href: "/podcast",
			external: false,
			disabled: false,
		},
	] satisfies MainNavItem[],
	footerNav: [
		{
			title: "Qucik Links",
			items: [
				{
					title: "Watch Now",
					href: "/live",
					external: true,
				},
				{
					title: "News and Stories",
					href: "/news",
					external: true,
				},
				{
					title: "Podcasts",
					href: "/podcast",
					external: false,
				},
				{
					title: "Events",
					href: "https://afiahomecoming.com",
					external: false,
				},
				{
					title: "Audio",
					href: "https://afia993.com",
					external: true,
				}
			],
		},
		{
			title: "Company",
			items: [
				{
					title: "About Us",
					href: "/about",
					external: false,
				},
				{
					title: "Privacy Policy",
					href: "/privacy",
					external: false,
				},
				{
					title: "Terms of Service",
					href: "/terms",
					external: false,
				}
			],
		},
		{
			title: "Contact",
			items: [
				{
					title: "Reach Us",
					href: "/contact",
					external: false,
				},
			],
		},
	] satisfies FooterItem[],
};
