import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ShoppingBag, Zap } from "lucide-react";
import PlaceholderImage from "../components/common/PlaceholderImage";
import Reveal from "../components/common/Reveal";
import QuantityStepper from "../components/common/QuantityStepper";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const cart = useCart();
  const navigate = useNavigate();

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

  const handleAddToCart = () => {
    setAdding(true);
    cart.addToCart(product, quantity);
    setTimeout(() => setAdding(false), 400);
  };

  const handleBuyNow = () => {
    cart.setBuyNowItem(product, quantity);
    navigate("/checkout");
  };

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

            <div className="product-detail__price-row">
              <span className="product-detail__price">{formatPrice(product.price)}</span>
              {product.mrp > product.price && <span className="product-detail__mrp">{formatPrice(product.mrp)}</span>}
            </div>

            <p className="product-detail__desc">{product.description}</p>

            <div className="product-detail__qty">
              <span className="product-detail__qty-label">Quantity</span>
              <QuantityStepper
                quantity={quantity}
                onIncrease={() => setQuantity((q) => q + 1)}
                onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              />
            </div>

            <div className="product-detail__actions">
              <button type="button" className="btn btn-outline product-detail__add" onClick={handleAddToCart} disabled={adding}>
                <ShoppingBag size={17} />
                {adding ? "Added to Cart" : "Add to Cart"}
              </button>
              <button type="button" className="btn product-detail__buy" onClick={handleBuyNow}>
                <Zap size={17} />
                Buy Now
              </button>
            </div>

            <Link to="/contact" className="product-detail__enquire">
              Have a question? Enquire Now →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
