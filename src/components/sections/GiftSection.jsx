import Reveal from "../common/Reveal";
import ProductCard from "../product/ProductCard";
import { PRODUCTS } from "../../data/products";
import { getGiftBannerImage } from "../../data/productImages";
import "./GiftSection.css";

const GIFT_PRODUCTS = PRODUCTS.filter((product) => product.category === "Gift");

export default function GiftSection() {
  const banner = getGiftBannerImage();

  return (
    <section
      className="gifts"
      id="gifts"
      style={banner ? { "--gifts-banner": `url(${banner})` } : undefined}
    >
      <div className="container">
        <Reveal as="span" className="eyebrow">
          Gifting
        </Reveal>
        <Reveal as="h2" className="section-heading" delay={60}>
          Perfect Gifts for Every Occasion
        </Reveal>
        <Reveal as="p" className="gifts__intro" delay={100}>
          Curated hampers and gift-ready sets for birthdays, festivals, and every celebration in between.
        </Reveal>
        <div className="gifts__grid">
          {GIFT_PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} showDescription delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
