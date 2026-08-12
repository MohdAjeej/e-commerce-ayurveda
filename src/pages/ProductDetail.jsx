import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PlaceholderImage from "../components/common/PlaceholderImage";
import Reveal from "../components/common/Reveal";
import { getProductById } from "../data/products";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!product) {
    return (
      <section className="product-detail">
        <div className="container product-detail__not-found">
          <h1>Product not found</h1>
          <p>We couldn't find the product you're looking for.</p>
          <Link to="/products" className="btn">
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const activeImage = images[activeIndex] || images[0];

  return (
    <section className="product-detail">
      <div className="container">
        <Link to="/products" className="product-detail__back">
          ← Back to Products
        </Link>

        <div className="product-detail__grid">
          <Reveal className="product-detail__gallery">
            <div className="product-detail__main-image">
              <PlaceholderImage image={activeImage} alt={product.name} />
            </div>

            {images.length > 1 && (
              <div className="product-detail__thumbs">
                {images.map((img, i) => (
                  <button
                    key={img || i}
                    type="button"
                    className={`product-detail__thumb ${i === activeIndex ? "is-active" : ""}`}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Show photo ${i + 1} of ${product.name}`}
                  >
                    <PlaceholderImage image={img} alt={`${product.name} ${i + 1}`} showLabel={false} />
                  </button>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal className="product-detail__info" delay={120}>
            <h1 className="product-detail__name">{product.name}</h1>
            <p className="product-detail__desc">{product.description}</p>
            <Link to="/contact" className="btn product-detail__cta">
              Enquire Now
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
