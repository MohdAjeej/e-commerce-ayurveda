import Hero from "../components/sections/Hero";
import FounderSection from "../components/sections/FounderSection";
import ProductsSection from "../components/sections/ProductsSection";
import WellnessSection from "../components/sections/WellnessSection";
import TestimonialSection from "../components/sections/TestimonialSection";
import AyurvedaSection from "../components/sections/AyurvedaSection";
import ResearchSection from "../components/sections/ResearchSection";
import FocusAreas from "../components/sections/FocusAreas";
import SocialSection from "../components/sections/SocialSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FounderSection />
      <ProductsSection />
      <WellnessSection />
      <TestimonialSection />
      <AyurvedaSection />
      <ResearchSection />
      <FocusAreas />
      <SocialSection />
    </>
  );
}
