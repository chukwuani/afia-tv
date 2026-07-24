import { Metadata } from "next";

import LifestylePage from "./_components/lifestyle-page";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
	title: "Lifestyle & Entertainment News",
};

export default async function NewsPage() {
	return <LifestylePage />;
}
