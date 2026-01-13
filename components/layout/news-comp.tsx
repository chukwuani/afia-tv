import React from "react";

import BlogSection from "@/components/blog-section";
import MagazineSection from "@/components/magazine-section";
import SportsSection from "@/components/sports-section";
// import MarketIndicator from "../market-indicator";
// import MarketNews from "../market-news";
import Advert from "@/components/layout/advert";
// import VideoFeed from "@/components/video-feed";
import TopNewsSection from "@/components/top-news-section";
import AdBanner from "@/components/layout/adBanner";

export default function NewsComp() {
	return (
		<React.Fragment>
			<TopNewsSection />

			<AdBanner dataAdSlot="8484320553" dataAdFormat="auto" dataFullWidthResponsive={true} />
			
			<BlogSection />

			<AdBanner dataAdSlot="8484320553" dataAdFormat="auto" dataFullWidthResponsive={true} />

			<MagazineSection />

			<Advert />
			
			<SportsSection />

			<AdBanner dataAdSlot="8484320553" dataAdFormat="auto" dataFullWidthResponsive={true} />
		</React.Fragment>
	);
}
