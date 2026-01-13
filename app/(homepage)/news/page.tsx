import NewsComp from "@/components/layout/news-comp";

import { Metadata } from "next";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
	title: "The Latest News",
};

export default async function NewsPage() {
	return <NewsComp />;
}
