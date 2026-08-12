import { requireAuth } from "../_lib/requireAuth.js";
import { getOrdersByUser } from "../_lib/store.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const user = requireAuth(req, res);
  if (!user) return;

  res.status(200).json({ orders: getOrdersByUser(user.id) });
}
