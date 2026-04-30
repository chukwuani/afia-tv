import { Suspense } from "react";
import { Metadata } from "next";

import SearchPage from "./_components/search-page";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
};

export default function Page() {
	return (
		<Suspense>
			<SearchPage />
		</Suspense>
	);
}
