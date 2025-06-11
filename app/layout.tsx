import type { Metadata } from "next";
import localFont from "next/font/local";
import { Erica_One } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import { siteConfig } from "@/config";

import FooterSection from "@/components/footer-section";
import { Navbar } from "@/components/layout/navbar";

const ericaOne = Erica_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-erica-one",
});

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
        className={`${haffer.variable} ${epilogue.variable} ${ericaOne.variable} antialiased font-epilogue`}
      >
        <Navbar />
        {children}
        <FooterSection />

        {/* Google analytics script */}
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
