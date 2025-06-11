import BlogSection from "@/components/blog-section";
import MagazineSection from "@/components/magazine-section";
import MainArticleSection from "@/components/main-article-section";
import SportsSection from "@/components/sports-section";
import MarketIndicator from "../market-indicator";
import MarketNews from "../market-news";

export default function NewsComponents() {
  return (
    <>
      <MarketIndicator />

      <MainArticleSection />

      <MarketNews />

      {/* <Advert /> */}

      <BlogSection />

      {/* <Advert /> */}

      <MagazineSection />

      {/* <Advert /> */}

      <SportsSection />

      {/* <JoinNewsletterForm /> */}
    </>
  );
}
