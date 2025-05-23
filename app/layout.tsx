import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";

import "./globals.css";
import { siteConfig } from "@/config";

import FooterSection from "@/components/footer-section";
import { Navbar } from "@/components/layout/navbar";

const cormorantGaramond = localFont({
  src: [
    {
      path: "../public/fonts/recoleta/Recoleta-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/recoleta/Recoleta-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-garamond",
});

const inter = localFont({
  src: [
    {
      path: "../public/fonts/haffer.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/Inter-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: ["/images/afia_secondary_logo.png"],
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
        className={`${cormorantGaramond.variable} ${inter.variable} ${dmSans.variable} antialiased font-inter`}
      >
        <Navbar />
        {children}
        <FooterSection />
      </body>
    </html>
  );
}
