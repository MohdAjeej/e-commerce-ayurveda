import Reveal from "../common/Reveal";
import ProductCard from "../product/ProductCard";
import { PRODUCTS } from "../../data/products";
import "./ProductsSection.css";

const NON_GIFT_PRODUCTS = PRODUCTS.filter((product) => product.category !== "Gift");

export default function ProductsSection({ full = false }) {
  return (
    <section className="products" id="products">
      <div className="container">
        <Reveal as="h2" className="section-heading">
          Our Products
        </Reveal>

        <div className="products__grid">
          {NON_GIFT_PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} showDescription={full} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
