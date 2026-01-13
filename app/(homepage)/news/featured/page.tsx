import { Metadata } from "next";
import FeaturedPage from "./_components/featured-page";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Featured Articles",
};

export default async function NewsPage() {
    return <FeaturedPage />;
}
