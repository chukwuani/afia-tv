import AdSticker from "@/components/layout/ad-sticker";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/site-footer";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section>
			<AdSticker />
			<Navbar />
			{children}
			<Footer />
		</section>
	);
}
