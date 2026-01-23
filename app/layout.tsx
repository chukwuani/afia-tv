import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";

import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

import { siteConfig } from "@/config";
import QueryProvider from "@/providers/query-provider";
import Adsense from "@/components/layout/adsense";

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

const dmsans = localFont({
	src: [
		{
			path: "../public/fonts/dm-sans/DMSans-Regular.ttf",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-dm-sans",
});

export const metadata: Metadata = {
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
		<html lang="en">
			<head>
				{/* Adsense Component */}
				<Adsense pId={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID!} />
			</head>

			<body
				suppressHydrationWarning
				className={`${anton.variable} ${dmsans.variable} antialiased font-dm-sans overflow-x-hidden max-w-[1500px] mx-auto`}>
				<QueryProvider>{children}</QueryProvider>

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
				<Script id="show-banner">
					{`window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
				</Script>

				<Script
					id="zsiqscript"
					src="https://salesiq.zohopublic.com/widget?wc=siqcd36da8148373c734866fcaf31bcdd96"
				/>
			</body>
		</html>
	);
}
