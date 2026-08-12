import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import PageIntro from "../components/common/PageIntro";
import PageLoader from "../components/common/PageLoader";
import { apiFetch } from "../utils/api";
import { formatPrice } from "../utils/formatPrice";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await apiFetch("/orders/list");
        if (!cancelled) setOrders(data.orders || []);
      } catch {
        if (!cancelled) setOrders([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <PageIntro eyebrow="Orders" title="Your Orders" text="Track and review your past orders." />
      <section className="orders-page">
        <div className="container orders-page__inner">
          {orders === null ? (
            <PageLoader />
          ) : orders.length === 0 ? (
            <div className="orders-empty">
              <span className="orders-empty__icon">
                <Package size={32} strokeWidth={1.5} />
              </span>
              <h3>No orders yet</h3>
              <p>Your placed orders will show up here.</p>
              <Link to="/products" className="btn">
                Explore Products
              </Link>
            </div>
          ) : (
            <ul className="orders-list">
              {orders.map((order) => (
                <li key={order.id} className="orders-list__item">
                  <div>
                    <span className="orders-list__id">{order.id}</span>
                    <span className="orders-list__date">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span className="orders-list__count">{order.items.length} item(s)</span>
                  <span className="orders-list__total">{formatPrice(order.subtotal)}</span>
                  <Link to={`/order-confirmation/${order.id}`} className="btn btn-outline btn--sm">
                    View
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
