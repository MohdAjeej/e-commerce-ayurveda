import { Link } from "react-router-dom";
import PlaceholderImage from "../common/PlaceholderImage";
import Reveal from "../common/Reveal";
import { PRODUCTS } from "../../data/products";
import "./ProductsSection.css";

export default function ProductsSection({ full = false }) {
  const list = full ? PRODUCTS : PRODUCTS;

  return (
    <section className="products" id="products">
      <div className="container">
        <Reveal as="h2" className="section-heading">
          Our Products
        </Reveal>

        <div className="products__grid">
          {list.map((product, i) => (
            <Reveal key={product.id} className="product-card" delay={i * 80}>
              <Link to={`/products/${product.id}`} className="product-card__image">
                <PlaceholderImage image={product.image} alt={product.name} />
              </Link>
              <Link to={`/products/${product.id}`} className="product-card__name-link">
                <h3 className="product-card__name">{product.name}</h3>
              </Link>
              {full && <p className="product-card__desc">{product.description}</p>}
              <Link to="/contact" className="product-card__cta">
                Enquire Now
                <span className="product-card__cta-arrow">→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
