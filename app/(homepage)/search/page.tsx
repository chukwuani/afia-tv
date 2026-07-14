import { Suspense } from "react";
import { Metadata } from "next";

import SearchPage from "./_components/search-page";
import SuspenseLoader from "./_components/suspense-loader";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
};

export default function Page() {
	return (
		<Suspense fallback={<SuspenseLoader />}>
			<SearchPage />
		</Suspense>
	);
}
