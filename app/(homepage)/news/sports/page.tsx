import { Metadata } from "next";

import SportsPage from "./_components/sports-page";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
	title: "Sports News",
};

export default async function NewsPage() {
	return <SportsPage />;
}
