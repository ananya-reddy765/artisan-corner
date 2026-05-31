import HeroSection from "../../components/home/HeroSection";
import StatsSection from "../../components/home/StatsSection";
import CategoriesSection from "../../components/home/CategoriesSection";
import Products from "../buyer/Products";
import TopVendors from "../../components/home/TopVendors";
import GiftBuilderBanner from "../../components/home/GiftBuilderBanner";

export default function Home() {
  return (
    <>
      {/* HERO */}

      <HeroSection />

      {/* REAL MARKETPLACE STATS */}

      <StatsSection />

      {/* PRODUCT CATEGORIES */}

      <CategoriesSection />

      {/* REAL PRODUCTS FROM DATABASE */}

      <Products />

      {/* REAL VENDORS FROM DATABASE */}

      <TopVendors />

      {/* SELLER CTA */}

      <GiftBuilderBanner />
    </>
  );
}