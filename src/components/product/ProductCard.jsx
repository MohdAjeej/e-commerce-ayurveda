import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Zap } from "lucide-react";
import PlaceholderImage from "../common/PlaceholderImage";
import Reveal from "../common/Reveal";
import { useCart } from "../../context/CartContext";
import { formatPrice, getDiscountPercent } from "../../utils/formatPrice";
import "./ProductCard.css";

export default function ProductCard({ product, showDescription = false, delay = 0 }) {
  const cart = useCart();
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    cart.addToCart(product, 1);
    setTimeout(() => setAdding(false), 400);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    cart.setBuyNowItem(product, 1);
    navigate("/checkout");
  };

  const discountPercent = getDiscountPercent(product.price, product.mrp);

  return (
    <Reveal className="product-card" delay={delay}>
      <Link to={`/products/${product.id}`} className="product-card__image">
        {discountPercent > 0 && <span className="product-card__badge">{discountPercent}% OFF</span>}
        <PlaceholderImage image={product.image} alt={product.name} />
      </Link>
      <Link to={`/products/${product.id}`} className="product-card__name-link">
        <h3 className="product-card__name">{product.name}</h3>
      </Link>
      {product.category && <span className="product-card__tag">{product.category}</span>}
      {product.weight && <span className="product-card__weight">{product.weight}</span>}
      {showDescription && <p className="product-card__desc">{product.description}</p>}

      <div className="product-card__price-row">
        <span className="product-card__price">{formatPrice(product.price)}</span>
        {product.mrp > product.price && <span className="product-card__mrp">{formatPrice(product.mrp)}</span>}
      </div>

      <div className="product-card__actions">
        <button type="button" className="btn btn-outline btn--sm product-card__add" onClick={handleAddToCart} disabled={adding}>
          <ShoppingBag size={15} />
          {adding ? "Added" : "Add to Cart"}
        </button>
        <button type="button" className="btn btn--sm product-card__buy" onClick={handleBuyNow}>
          <Zap size={15} />
          Buy Now
        </button>
      </div>
    </Reveal>
  );
}
