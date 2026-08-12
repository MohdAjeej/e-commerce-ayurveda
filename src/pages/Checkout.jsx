import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Truck, Wallet, Smartphone } from "lucide-react";
import Reveal from "../components/common/Reveal";
import PlaceholderImage from "../components/common/PlaceholderImage";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { apiFetch } from "../utils/api";
import { formatPrice } from "../utils/formatPrice";
import { isValidMobile, isValidPincode } from "../utils/validators";
import "./Checkout.css";

const emptyAddress = { fullName: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "" };

export default function Checkout() {
  const cart = useCart();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const activeItems = cart.buyNowItem ? [cart.buyNowItem] : cart.items;
  const subtotal = useMemo(
    () => activeItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart.buyNowItem, cart.items]
  );

  const [step, setStep] = useState("address");
  const [address, setAddress] = useState({ ...emptyAddress, fullName: user?.name || "", phone: user?.mobile || "" });
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placing, setPlacing] = useState(false);

  if (activeItems.length === 0) {
    return (
      <section className="checkout-page">
        <div className="container checkout-page__empty">
          <h1>Nothing to checkout</h1>
          <p>Your cart is empty right now.</p>
          <Link to="/products" className="btn">
            Explore Products
          </Link>
        </div>
      </section>
    );
  }

  const validateAddress = () => {
    const next = {};
    if (!address.fullName.trim()) next.fullName = "Full name is required.";
    if (!isValidMobile(address.phone)) next.phone = "Enter a valid 10-digit mobile number.";
    if (!address.line1.trim()) next.line1 = "Address line is required.";
    if (!address.city.trim()) next.city = "City is required.";
    if (!address.state.trim()) next.state = "State is required.";
    if (!isValidPincode(address.pincode)) next.pincode = "Enter a valid 6-digit pincode.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (validateAddress()) setStep("payment");
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      const data = await apiFetch("/orders/create", {
        method: "POST",
        body: { items: activeItems, address, paymentMethod, subtotal },
      });
      if (cart.buyNowItem) cart.clearBuyNowItem();
      else cart.clearCart();
      navigate(`/order-confirmation/${data.orderId}`, { state: { order: data.order } });
    } catch (err) {
      toast.error(err.message || "Unable to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <section className="checkout-page">
      <div className="container checkout-page__grid">
        <Reveal className="checkout-main">
          <div className="checkout-steps">
            <span className={`checkout-steps__item ${step === "address" ? "is-active" : "is-done"}`}>1. Address</span>
            <span className={`checkout-steps__item ${step === "payment" ? "is-active" : ""}`}>2. Payment</span>
          </div>

          {step === "address" && (
            <form className="checkout-form" onSubmit={handleAddressSubmit} noValidate>
              <h2>Delivery Address</h2>

              <div className="checkout-form__row">
                <div className="checkout-form__field">
                  <label>Full Name</label>
                  <input
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className={errors.fullName ? "has-error" : ""}
                  />
                  {errors.fullName && <span className="checkout-form__error">{errors.fullName}</span>}
                </div>
                <div className="checkout-form__field">
                  <label>Phone Number</label>
                  <input
                    value={address.phone}
                    inputMode="numeric"
                    onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                    className={errors.phone ? "has-error" : ""}
                  />
                  {errors.phone && <span className="checkout-form__error">{errors.phone}</span>}
                </div>
              </div>

              <div className="checkout-form__field">
                <label>Address Line 1</label>
                <input
                  value={address.line1}
                  onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                  className={errors.line1 ? "has-error" : ""}
                />
                {errors.line1 && <span className="checkout-form__error">{errors.line1}</span>}
              </div>

              <div className="checkout-form__field">
                <label>Address Line 2 (optional)</label>
                <input value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} />
              </div>

              <div className="checkout-form__row checkout-form__row--three">
                <div className="checkout-form__field">
                  <label>City</label>
                  <input
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className={errors.city ? "has-error" : ""}
                  />
                  {errors.city && <span className="checkout-form__error">{errors.city}</span>}
                </div>
                <div className="checkout-form__field">
                  <label>State</label>
                  <input
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className={errors.state ? "has-error" : ""}
                  />
                  {errors.state && <span className="checkout-form__error">{errors.state}</span>}
                </div>
                <div className="checkout-form__field">
                  <label>Pincode</label>
                  <input
                    value={address.pincode}
                    inputMode="numeric"
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                    className={errors.pincode ? "has-error" : ""}
                  />
                  {errors.pincode && <span className="checkout-form__error">{errors.pincode}</span>}
                </div>
              </div>

              <button type="submit" className="btn checkout-form__submit">
                Continue to Payment
              </button>
            </form>
          )}

          {step === "payment" && (
            <div className="checkout-form">
              <h2>Payment</h2>
              <p className="checkout-form__note">
                This is a simulated payment step for demonstration — no real payment gateway is connected.
              </p>

              <div className="checkout-payment-options">
                <label className={`checkout-payment-option ${paymentMethod === "cod" ? "is-selected" : ""}`}>
                  <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                  <Truck size={18} />
                  <span>Cash on Delivery</span>
                </label>
                <label className={`checkout-payment-option ${paymentMethod === "upi" ? "is-selected" : ""}`}>
                  <input type="radio" name="payment" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} />
                  <Smartphone size={18} />
                  <span>UPI (simulated)</span>
                </label>
                <label className={`checkout-payment-option ${paymentMethod === "card" ? "is-selected" : ""}`}>
                  <input type="radio" name="payment" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
                  <Wallet size={18} />
                  <span>Card (simulated)</span>
                </label>
              </div>

              <div className="checkout-payment-actions">
                <button type="button" className="btn btn-outline" onClick={() => setStep("address")} disabled={placing}>
                  Back
                </button>
                <button type="button" className="btn checkout-form__submit" onClick={handlePlaceOrder} disabled={placing}>
                  {placing ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>
          )}
        </Reveal>

        <aside className="checkout-summary">
          <h3>Order Summary</h3>
          <ul className="checkout-summary__list">
            {activeItems.map((item) => (
              <li key={`${item.id}::${item.variant ?? ""}`} className="checkout-summary__item">
                <div className="checkout-summary__image">
                  <PlaceholderImage image={item.image} alt={item.name} />
                </div>
                <div className="checkout-summary__details">
                  <span className="checkout-summary__name">{item.name}</span>
                  <span className="checkout-summary__qty">Qty {item.quantity}</span>
                </div>
                <span className="checkout-summary__price">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="checkout-summary__total">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}
