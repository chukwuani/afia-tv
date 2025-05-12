import { FeaturedArticle } from "./featured-article";
import { SidebarNews } from "./sidebar-news";
import { RecentNews } from "./recent-news";

export function EntertainmentSection() {
	return (
		<section className="container mx-auto py-8">
			<h2 className="text-2xl font-bold mb-6 uppercase tracking-wide">Entertainment</h2>
			<main className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
					<div className="md:col-span-3">
						<SidebarNews />
					</div>

					<div className="md:col-span-6">
						<FeaturedArticle />
					</div>
					<div className="md:col-span-3">
						<RecentNews />
					</div>
				</div>
			</main>
		</section>
	);
}
