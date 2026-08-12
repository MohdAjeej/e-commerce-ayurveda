import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import PlaceholderImage from "../components/common/PlaceholderImage";
import PageLoader from "../components/common/PageLoader";
import { apiFetch } from "../utils/api";
import { formatPrice } from "../utils/formatPrice";
import "./OrderConfirmation.css";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!location.state?.order);

  useEffect(() => {
    if (order) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await apiFetch(`/orders/${orderId}`);
        if (!cancelled) setOrder(data.order);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [orderId, order]);

  if (loading) return <PageLoader />;

  if (!order) {
    return (
      <section className="order-confirmation">
        <div className="container order-confirmation__empty">
          <h1>Order not found</h1>
          <Link to="/orders" className="btn">
            View Your Orders
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="order-confirmation">
      <div className="container order-confirmation__inner">
        <span className="order-confirmation__icon">
          <CheckCircle2 size={40} strokeWidth={1.5} />
        </span>
        <h1>Order Confirmed!</h1>
        <p>
          Thank you — your order <strong>{order.id}</strong> has been placed successfully.
        </p>

        <div className="order-confirmation__card">
          <ul className="order-confirmation__list">
            {order.items.map((item) => (
              <li key={`${item.id}::${item.variant ?? ""}`} className="order-confirmation__item">
                <div className="order-confirmation__image">
                  <PlaceholderImage image={item.image} alt={item.name} />
                </div>
                <div className="order-confirmation__details">
                  <span>{item.name}</span>
                  <span className="order-confirmation__qty">Qty {item.quantity}</span>
                </div>
                <span className="order-confirmation__price">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="order-confirmation__total">
            <span>Total</span>
            <strong>{formatPrice(order.subtotal)}</strong>
          </div>
          <div className="order-confirmation__address">
            <h3>Delivery Address</h3>
            <p>
              {order.address.fullName}, {order.address.line1}
              {order.address.line2 ? `, ${order.address.line2}` : ""}, {order.address.city}, {order.address.state} -{" "}
              {order.address.pincode}
            </p>
            <p>Phone: {order.address.phone}</p>
          </div>
        </div>

        <div className="order-confirmation__actions">
          <Link to="/products" className="btn btn-outline">
            Continue Shopping
          </Link>
          <Link to="/orders" className="btn">
            View Orders
          </Link>
        </div>
      </div>
    </section>
  );
}
