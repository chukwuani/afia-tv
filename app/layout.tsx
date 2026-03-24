import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";

import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

import { siteConfig } from "@/config";
import QueryProvider from "@/providers/query-provider";
import Adsense from "@/components/layout/adsense";
import ZohoChat from "@/components/layout/zoho-chat-widget";
import { ThemeProvider } from "@/providers/theme-provider";

const anton = localFont({
	src: [
		{
			path: "../public/fonts/anton/Anton-Regular.ttf",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-anton",
});

const outfit = localFont({
	src: "../public/fonts/outfit/Outfit-VariableFont_wght.ttf",
	variable: "--font-outfit",
	display: "swap",
});

const jetBrainsMono = localFont({
	src: "../public/fonts/jetbrains-mono/JetBrainsMono-VariableFont_wght.ttf",
	variable: "--font-jetbrains-mono",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://afiatv.net"),
	title: {
		template: `%s - ${siteConfig.title}`,
		default: siteConfig.title,
	},
	description: siteConfig.description,
	icons: ["/images/afia-logo-small.png"],
	authors: [
		{
			name: "Stephen",
			url: "https://www.stevecodes.netlify.app",
		},
	],
	creator: "Stephen",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.title,
		description: siteConfig.description,
		siteName: siteConfig.title,
		images: [siteConfig.ogImage],
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.title,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
		creator: "@stphn_chukwu",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	keywords: [
		"Afia TV",
		"Nigeria",
		"Igbo",
		"News",
		"Entertainment",
		"Culture",
		"Music",
		"Movies",
		"TV Shows",
		"Sports",
		"Business",
		"Technology",
		"Lifestyle",
		"Health",
		"Education",
		"South East Nigeria",
		"Southeast Nigeria",
		"Africa",
		"African Media",
		"Igbo",
		"Southeast Nigeria",
		"Enugu State",
		"IMO state",
		"Abia state",
		"Ebonyi state",
		"Anambra state",
		"PH",
		"Igbo culture",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={outfit.variable}>
			<head>
				{/* Adsense Component */}
				<Adsense pId={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID!} />
			</head>

			<body
				suppressHydrationWarning
				className={`${anton.variable} ${jetBrainsMono.variable} antialiased font-outfit overflow-x-hidden max-w-[1500px] mx-auto`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange>
					<QueryProvider>{children}</QueryProvider>
				</ThemeProvider>

				<Toaster richColors position="top-center" />

				{/* Google analytics script */}
				<Script
					id="google-analytics"
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-1SS0N68NR8"
				/>
				<Script id="google-analytics-init">
					{`window.dataLayer = window.dataLayer || [];
            		function gtag(){dataLayer.push(arguments);}
            		gtag('js', new Date());
            		gtag('config', 'G-1SS0N68NR8');`}
				</Script>

				{/* SalesIQ script */}
				<ZohoChat />
			</body>
		</html>
	);
}
