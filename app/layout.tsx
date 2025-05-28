import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { siteConfig } from "@/config";

import FooterSection from "@/components/footer-section";
import { Navbar } from "@/components/layout/navbar";

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
        className={`${inter.variable} ${epilogue.variable} antialiased font-epilogue`}
      >
        <Navbar />
        {children}
        <FooterSection />
      </body>
    </html>
  );
}
