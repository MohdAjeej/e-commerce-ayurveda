import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, X } from "lucide-react";
import PlaceholderImage from "../common/PlaceholderImage";
import QuantityStepper from "../common/QuantityStepper";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";
import "./CartContents.css";

export default function CartContents({ onNavigate, compact = false }) {
  const cart = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onNavigate?.();
    navigate("/checkout");
  };

  if (cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <span className="cart-empty__icon">
          <ShoppingBag size={32} strokeWidth={1.5} />
        </span>
        <h3>Your cart is empty</h3>
        <p>Discover our wellness products.</p>
        <Link to="/products" className="btn" onClick={onNavigate}>
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-contents">
      <ul className="cart-contents__list">
        {cart.items.map((item) => (
          <li key={`${item.id}::${item.variant ?? ""}`} className="cart-item">
            <Link to={`/products/${item.id}`} className="cart-item__image" onClick={onNavigate}>
              <PlaceholderImage image={item.image} alt={item.name} />
            </Link>
            <div className="cart-item__details">
              <Link to={`/products/${item.id}`} className="cart-item__name" onClick={onNavigate}>
                {item.name}
              </Link>
              {item.variant && <span className="cart-item__variant">{item.variant}</span>}
              <span className="cart-item__price">{formatPrice(item.price)}</span>
            </div>
            <div className="cart-item__controls">
              <QuantityStepper
                size={compact ? "sm" : "md"}
                quantity={item.quantity}
                onIncrease={() => cart.increaseQty(item.id, item.variant)}
                onDecrease={() => cart.decreaseQty(item.id, item.variant)}
              />
              <span className="cart-item__line-total">{formatPrice(item.price * item.quantity)}</span>
              <button
                type="button"
                className="cart-item__remove"
                aria-label={`Remove ${item.name}`}
                onClick={() => cart.removeFromCart(item.id, item.variant)}
              >
                <X size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-contents__summary">
        <div className="cart-contents__subtotal">
          <span>Subtotal</span>
          <strong>{formatPrice(cart.subtotal)}</strong>
        </div>
        <div className="cart-contents__actions">
          <Link to="/products" className="btn btn-outline" onClick={onNavigate}>
            Continue Shopping
          </Link>
          <button type="button" className="btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
