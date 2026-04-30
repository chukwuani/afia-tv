import { Metadata } from "next";

import SearchPage from "./_components/search-page";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
};

export default async function VideoNewsPage() {
    return <SearchPage />;
}
