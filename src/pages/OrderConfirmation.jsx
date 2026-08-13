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
          <Link to="/products" className="btn">
            Explore Products
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
        <h1>Order Placed Successfully</h1>
        <p>
          Thank you for your order! Your order <strong>{order.id}</strong> has been placed successfully.
        </p>

        <div className="order-confirmation__card">
          <ul className="order-confirmation__list">
            {order.items.map((item) => (
              <li key={item.productId} className="order-confirmation__item">
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
          <div className="order-confirmation__line">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="order-confirmation__line">
            <span>Delivery</span>
            <span>{order.deliveryCharge === 0 ? "Free" : formatPrice(order.deliveryCharge)}</span>
          </div>
          <div className="order-confirmation__total">
            <span>Total</span>
            <strong>{formatPrice(order.total)}</strong>
          </div>
          <div className="order-confirmation__address">
            <h3>We'll deliver your order to:</h3>
            <p>{order.customer.fullName}</p>
            <p>
              {order.shippingAddress.houseNumber}, {order.shippingAddress.street}
              {order.shippingAddress.landmark ? `, near ${order.shippingAddress.landmark}` : ""}
            </p>
            <p>
              {order.shippingAddress.district} - {order.shippingAddress.pincode}
            </p>
            <p>Mobile: {order.customer.mobile}</p>
          </div>
        </div>

        <div className="order-confirmation__actions">
          <Link to="/products" className="btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
