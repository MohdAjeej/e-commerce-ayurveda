import { requireAuth } from "../_lib/requireAuth.js";
import { generateOrderId } from "../_lib/crypto.js";
import { saveOrder } from "../_lib/store.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const user = requireAuth(req, res);
  if (!user) return;

  const { items, address, paymentMethod, subtotal } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ message: "Your order has no items." });
    return;
  }
  if (!address || !address.fullName || !address.phone || !address.line1 || !address.city || !address.pincode) {
    res.status(400).json({ message: "Please provide a complete delivery address." });
    return;
  }

  const id = generateOrderId();
  const order = {
    id,
    userId: user.id,
    items,
    address,
    paymentMethod: paymentMethod || "cod",
    subtotal: Number(subtotal) || items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    status: "confirmed",
    createdAt: Date.now(),
  };
  saveOrder(id, order);

  res.status(200).json({ success: true, orderId: id, order });
}
