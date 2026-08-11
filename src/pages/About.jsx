import FounderSection from "../components/sections/FounderSection";
import AyurvedaSection from "../components/sections/AyurvedaSection";
import FocusAreas from "../components/sections/FocusAreas";
import PageIntro from "../components/common/PageIntro";

export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="About OJAS Himalayan Herbs"
        title="Rooted in tradition, backed by research"
        text="OJAS Himalayan Herbs blends the timeless wisdom of Ayurveda with modern research to craft authentic, natural wellness products for everyday life."
      />
      <FounderSection />
      <AyurvedaSection />
      <FocusAreas />
    </>
  );
}
