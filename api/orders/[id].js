import { getOrder } from "../_lib/store.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { id } = req.query;
  const order = getOrder(id);

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  res.status(200).json({ order });
}
