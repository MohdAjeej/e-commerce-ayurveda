import ProductsSection from "../components/sections/ProductsSection";
import WellnessSection from "../components/sections/WellnessSection";
import PageIntro from "../components/common/PageIntro";

export default function Products() {
  return (
    <>
      <PageIntro
        eyebrow="Our Products"
        title="Ayurvedic formulations for everyday wellness"
        text="Every OJAS product is crafted with authentic Himalayan herbs, lab-tested for purity, and formulated to support real, holistic results."
      />
      <ProductsSection full />
      <WellnessSection />
    </>
  );
}
