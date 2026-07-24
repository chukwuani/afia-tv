import { Metadata } from "next";

import CulturePage from "./_components/culture-page";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
	title: "Culture News",
};

export default async function NewsPage() {
	return <CulturePage />;
}
