import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Truck } from "lucide-react";
import Reveal from "../components/common/Reveal";
import PageIntro from "../components/common/PageIntro";
import PlaceholderImage from "../components/common/PlaceholderImage";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { apiFetch } from "../utils/api";
import { formatPrice } from "../utils/formatPrice";
import { calculateDelivery } from "../utils/delivery";
import { isValidName, isValidMobile, isValidEmail, isValidPincode } from "../utils/validators";
import "./Checkout.css";

const emptyCustomer = { fullName: "", mobile: "", email: "" };
const emptyAddress = { houseNumber: "", street: "", district: "", pincode: "", landmark: "" };

export default function Checkout() {
  const cart = useCart();
  const toast = useToast();
  const navigate = useNavigate();

  const activeItems = cart.buyNowItem ? [cart.buyNowItem] : cart.items;
  const subtotal = useMemo(
    () => activeItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart.buyNowItem, cart.items]
  );

  const [step, setStep] = useState("details");
  const [customer, setCustomer] = useState(emptyCustomer);
  const [address, setAddress] = useState(emptyAddress);
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  const deliveryCharge = calculateDelivery(address.pincode, subtotal);
  const total = subtotal + deliveryCharge;

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

  const setCustomerField = (field, value) => {
    setCustomer((c) => ({ ...c, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const setAddressField = (field, value) => {
    setAddress((a) => ({ ...a, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validateDetails = () => {
    const next = {};
    if (!isValidName(customer.fullName)) next.fullName = "Please enter your full name.";
    if (!isValidMobile(customer.mobile)) next.mobile = "Please enter a valid 10-digit mobile number.";
    if (!isValidEmail(customer.email)) next.email = "Please enter a valid email address.";
    if (!address.houseNumber.trim()) next.houseNumber = "Please enter your house/building number.";
    if (!address.street.trim()) next.street = "Please enter your street, area or locality.";
    if (!address.district.trim()) next.district = "Please enter your district.";
    if (!isValidPincode(address.pincode)) next.pincode = "Please enter a valid 6-digit pincode.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (validateDetails()) setStep("payment");
  };



  const handlePlaceOrder = async () => {
    try {
      setPlacing(true);

      // 1. Create order from backend
      const order = await apiFetch("/payment/create-order", {
        method: "POST",
        body: { amount: total }
      });


      // const order = {
      //   id: orderId,
      //   customer,
      //   shippingAddress: address,
      //   items: activeItems,
      //   subtotal,
      //   deliveryCharge,
      //   total,
      //   paymentMethod: "cod",
      //   orderStatus: "confirmed",
      //   createdAt: Date.now(),
      // };

      // 2. Open Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,

        handler: async function (response) {
          // 3. Verify payment
          await apiFetch("/payment/verify-payment", {
            method: "POST",
            body: response
          });

          toast.success("Payment successful 🎉");

          navigate(`/order-confirmation/${order.id}`);
        },

        prefill: {
          name: customer.fullName,
          email: customer.email,
          contact: customer.mobile
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <>
      <PageIntro
        eyebrow="Checkout"
        title="Complete Your Order"
        text="Enter your details and delivery address to place your order."
      />
      <section className="checkout-page">
        <div className="container checkout-page__grid">
          <Reveal className="checkout-main">
            <div className="checkout-steps">
              <span className={`checkout-steps__item ${step === "details" ? "is-active" : "is-done"}`}>1. Details</span>
              <span className={`checkout-steps__item ${step === "payment" ? "is-active" : ""}`}>2. Payment</span>
            </div>

            {step === "details" && (
              <form className="checkout-form" onSubmit={handleDetailsSubmit} noValidate>
                <h2 className="checkout-form__section-title">Customer Information</h2>

                <div className="checkout-form__field">
                  <label>Full Name</label>
                  <input
                    value={customer.fullName}
                    placeholder="Enter your full name"
                    onChange={(e) => setCustomerField("fullName", e.target.value)}
                    className={errors.fullName ? "has-error" : ""}
                  />
                  {errors.fullName && <span className="checkout-form__error">{errors.fullName}</span>}
                </div>

                <div className="checkout-form__row">
                  <div className="checkout-form__field">
                    <label>Mobile Number</label>
                    <input
                      value={customer.mobile}
                      inputMode="numeric"
                      placeholder="Enter 10-digit mobile number"
                      onChange={(e) => setCustomerField("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className={errors.mobile ? "has-error" : ""}
                    />
                    {errors.mobile && <span className="checkout-form__error">{errors.mobile}</span>}
                  </div>
                  <div className="checkout-form__field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={customer.email}
                      placeholder="Enter your email address"
                      onChange={(e) => setCustomerField("email", e.target.value)}
                      className={errors.email ? "has-error" : ""}
                    />
                    {errors.email && <span className="checkout-form__error">{errors.email}</span>}
                  </div>
                </div>

                <h2 className="checkout-form__section-title checkout-form__section-title--spaced">Delivery Address</h2>

                <div className="checkout-form__field">
                  <label>House / Building Number</label>
                  <input
                    value={address.houseNumber}
                    placeholder="House No., Flat No., Building No."
                    onChange={(e) => setAddressField("houseNumber", e.target.value)}
                    className={errors.houseNumber ? "has-error" : ""}
                  />
                  {errors.houseNumber && <span className="checkout-form__error">{errors.houseNumber}</span>}
                </div>

                <div className="checkout-form__field">
                  <label>Street / Area / Locality</label>
                  <input
                    value={address.street}
                    placeholder="Enter your street, area or locality"
                    onChange={(e) => setAddressField("street", e.target.value)}
                    className={errors.street ? "has-error" : ""}
                  />
                  {errors.street && <span className="checkout-form__error">{errors.street}</span>}
                </div>

                <div className="checkout-form__row">
                  <div className="checkout-form__field">
                    <label>District</label>
                    <input
                      value={address.district}
                      placeholder="Enter your district"
                      onChange={(e) => setAddressField("district", e.target.value)}
                      className={errors.district ? "has-error" : ""}
                    />
                    {errors.district && <span className="checkout-form__error">{errors.district}</span>}
                  </div>
                  <div className="checkout-form__field">
                    <label>Pincode</label>
                    <input
                      value={address.pincode}
                      inputMode="numeric"
                      placeholder="Enter 6-digit pincode"
                      onChange={(e) => setAddressField("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className={errors.pincode ? "has-error" : ""}
                    />
                    {errors.pincode && <span className="checkout-form__error">{errors.pincode}</span>}
                  </div>
                </div>

                <div className="checkout-form__field">
                  <label>Landmark (Optional)</label>
                  <input
                    value={address.landmark}
                    placeholder="Nearby landmark"
                    onChange={(e) => setAddressField("landmark", e.target.value)}
                  />
                </div>

                <button type="submit" className="btn checkout-form__submit">
                  Continue to Payment
                </button>
              </form>
            )}

            {step === "payment" && (
              <div className="checkout-form">
                <h2 className="checkout-form__section-title">Payment</h2>
                <p className="checkout-form__note">
                  We only accept Cash on Delivery at this time.
                </p>

                <div className="checkout-payment-options">
                  <label className="checkout-payment-option is-selected">
                    <input type="radio" name="payment" checked={true} readOnly />
                    <Truck size={18} />
                    <span>Cash on Delivery</span>
                  </label>
                </div>

                <div className="checkout-payment-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setStep("details")} disabled={placing}>
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
            <div className="checkout-summary__line">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="checkout-summary__line">
              <span>Delivery</span>
              <span>{deliveryCharge === 0 ? "Free" : formatPrice(deliveryCharge)}</span>
            </div>
            <div className="checkout-summary__total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
