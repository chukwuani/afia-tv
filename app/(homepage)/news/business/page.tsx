import { Metadata } from "next";

import BusinessPage from "./_components/business-page";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
	title: "Business News",
};

export default async function NewsPage() {
	return <BusinessPage />;
}
