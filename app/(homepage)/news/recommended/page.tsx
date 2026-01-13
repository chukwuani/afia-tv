import { Metadata } from "next";
import RecommendedPage from "./_components/recommended-page";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Recommended Reads",
};

export default async function NewsPage() {
    return <RecommendedPage />;
}
