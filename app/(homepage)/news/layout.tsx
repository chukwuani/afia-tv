import AdSticker from "@/components/layout/ad-sticker";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section>
			<AdSticker />
			{children}
		</section>
	);
}
