import BlogSection from "@/components/blog-section";
import JoinNewsletterForm from "@/components/layout/join-newsletter";
import MagazineSection from "@/components/magazine-section";
import MainArticleSection from "@/components/main-article-section";
import SocialSection from "@/components/social-section";
import SportsSection from "@/components/sports-section";
import Advert from "@/components/layout/advert";

export default function NewsComponents() {
  return (
    <>
      <MainArticleSection />

      <Advert />

      <BlogSection />

      <Advert />

      <MagazineSection />

      <SocialSection />

      <Advert />

      <SportsSection />

      <JoinNewsletterForm />
    </>
  );
}
