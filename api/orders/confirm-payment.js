import { getOrder, saveOrder } from "../_lib/store.js";
import { isRateLimited } from "../_lib/rateLimit.js";

// The only code path allowed to mark an order paid/confirmed — the frontend
// never sends paymentStatus directly. There's no real payment gateway wired
// up yet, so this simulates a provider confirmation; swap this handler's body
// for real webhook/signature verification when a gateway is integrated.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  if (isRateLimited(req, "orders/confirm-payment", { max: 10, windowMs: 10 * 60 * 1000 })) {
    res.status(429).json({ message: "Too many requests. Please try again in a few minutes." });
    return;
  }

  const { orderId } = req.body || {};
  const order = getOrder(orderId);

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  order.paymentStatus = "paid";
  order.orderStatus = "confirmed";
  saveOrder(order.id, order);

  res.status(200).json({ success: true, order });
}
