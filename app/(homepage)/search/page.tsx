import { Suspense } from "react";
import { Metadata } from "next";

import SearchPage from "./_components/search-page";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
};

export default function Page() {
	return (
		<Suspense
			fallback={
				<section className="flex flex-col sm:px-12 py-16 gap-4">
					{Array.from({ length: 8 }).map((_, i) => (
						<section key={i} className="group cols-span-1 gap-2 w-full my-4">
							<section className="flex flex-row-reverse items-end gap-4">
								<Skeleton className="aspect-[14/9] rounded-none object-cover max-w-[205px] w-full" />

								<section className="gap-3 flex flex-col py-2 w-full">
									<Skeleton className="h-[10px] w-3/4 rounded-none mt-3 mb-2" />

									<Skeleton className="h-[10px] w-full rounded-none" />

									<Skeleton className="h-[10px] w-full rounded-none mb-2" />

									<Skeleton className="h-[10px] w-20 rounded-none" />
								</section>
							</section>
						</section>
					))}
				</section>
			}>
			<SearchPage />
		</Suspense>
	);
}
