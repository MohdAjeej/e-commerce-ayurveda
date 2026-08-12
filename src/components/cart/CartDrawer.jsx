import { X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import CartContents from "./CartContents";
import "./CartDrawer.css";

export default function CartDrawer() {
  const cart = useCart();

  return (
    <>
      <div
        className={`cart-drawer__overlay ${cart.isDrawerOpen ? "is-open" : ""}`}
        onClick={cart.closeDrawer}
        aria-hidden="true"
      />
      <aside className={`cart-drawer ${cart.isDrawerOpen ? "is-open" : ""}`} aria-hidden={!cart.isDrawerOpen}>
        <div className="cart-drawer__header">
          <h2>Your Cart</h2>
          <button type="button" className="cart-drawer__close" aria-label="Close cart" onClick={cart.closeDrawer}>
            <X size={20} />
          </button>
        </div>
        <div className="cart-drawer__body">
          <CartContents onNavigate={cart.closeDrawer} compact />
        </div>
      </aside>
    </>
  );
}
