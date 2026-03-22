import FooterSection from "@/components/footer-section";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/site-footer";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section>
			<Navbar />
			{children}
			<Footer />
		</section>
	);
}
