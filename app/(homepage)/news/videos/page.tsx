import { Metadata } from "next";

import VideosPage from "./_components/videos-page";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
	title: "Video News",
};

export default async function VideoNewsPage() {
	return <VideosPage />;
}
