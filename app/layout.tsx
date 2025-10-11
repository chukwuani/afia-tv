import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";

import "./globals.css";
import { siteConfig } from "@/config";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";

const haffer = localFont({
	src: [
		{
			path: "../public/fonts/haffer.woff2",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-haffer",
});

const epilogue = localFont({
	src: [
		{
			path: "../public/fonts/epilogue/Epilogue-VariableFont_wght.ttf",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-epilogue",
});

const dmSans = localFont({
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
	title: siteConfig.title,
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
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				suppressHydrationWarning
				className={`${haffer.variable} ${epilogue.variable} ${dmSans.variable} antialiased font-epilogue`}>
				<QueryProvider>{children}</QueryProvider>

				<Toaster richColors position="bottom-right" />

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
