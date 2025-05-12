import type { Metadata } from "next";
import localFont from "next/font/local";
import { EB_Garamond } from "next/font/google";

import "./globals.css";
import { siteConfig } from "@/config";
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
      path: "../public/fonts/inter/Inter-Regular.ttf",
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

const EBGaramond = EB_Garamond({ subsets: ["latin"], variable: "--font-eb" });

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
        className={`${cormorantGaramond.variable} ${inter.variable} ${EBGaramond.variable} antialiased font-inter`}
      >
        <Navbar />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
