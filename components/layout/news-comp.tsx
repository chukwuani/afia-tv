import React from "react";

import BlogSection from "@/components/blog-section";
import MagazineSection from "@/components/magazine-section";
import SportsSection from "@/components/sports-section";
// import MarketIndicator from "../market-indicator";
// import MarketNews from "../market-news";
import Advert from "@/components/layout/advert";
import TopNewsSection from "@/components/top-news-section";
// import AdBanner from "@/components/layout/adBanner";
// import VideoFeed from "../video-feed";
import VideoFeedSection from "./video-feed-section";

export default function NewsComp() {
	return (
		<React.Fragment>
			<TopNewsSection />

			<BlogSection />

			<Advert />

			<VideoFeedSection layout="secondary" />

			<MagazineSection />

			<SportsSection />

		</React.Fragment>
	);
}
