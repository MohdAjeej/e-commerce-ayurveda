import { generateOrderId } from "../_lib/crypto.js";
import { saveOrder } from "../_lib/store.js";
import { priceOrderItems, computeTotals } from "../_lib/pricing.js";
import { isRateLimited } from "../_lib/rateLimit.js";
import { isValidEmail, isValidMobile, isValidName, isValidPincode } from "../../src/utils/validators.js";

const MAX_FIELD_LENGTH = 120;

function stripControlChars(str) {
  return Array.from(str)
    .filter((ch) => {
      const code = ch.codePointAt(0);
      return code >= 32 && code !== 127;
    })
    .join("");
}

function sanitize(value) {
  return stripControlChars(String(value ?? ""))
    .trim()
    .slice(0, MAX_FIELD_LENGTH);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  if (isRateLimited(req, "orders/create", { max: 5, windowMs: 10 * 60 * 1000 })) {
    res.status(429).json({ message: "Too many orders placed. Please try again in a few minutes." });
    return;
  }

  const { customer, shippingAddress, items, paymentMethod } = req.body || {};

  const fullName = sanitize(customer?.fullName);
  const mobile = sanitize(customer?.mobile);
  const email = sanitize(customer?.email);

  if (!isValidName(fullName)) {
    res.status(400).json({ message: "Please provide a valid full name." });
    return;
  }
  if (!isValidMobile(mobile)) {
    res.status(400).json({ message: "Please enter a valid 10-digit mobile number." });
    return;
  }
  if (!isValidEmail(email)) {
    res.status(400).json({ message: "Please enter a valid email address." });
    return;
  }

  const houseNumber = sanitize(shippingAddress?.houseNumber);
  const street = sanitize(shippingAddress?.street);
  const district = sanitize(shippingAddress?.district);
  const pincode = sanitize(shippingAddress?.pincode);
  const landmark = sanitize(shippingAddress?.landmark);

  if (!houseNumber || !street || !district) {
    res.status(400).json({ message: "Please provide a complete delivery address." });
    return;
  }
  if (!isValidPincode(pincode)) {
    res.status(400).json({ message: "Please enter a valid 6-digit pincode." });
    return;
  }

  const method = ["cod", "upi", "card"].includes(paymentMethod) ? paymentMethod : "cod";

  const { items: pricedItems, error } = priceOrderItems(items);
  if (error) {
    res.status(400).json({ message: error });
    return;
  }

  const { subtotal, deliveryCharge, total } = computeTotals(pricedItems, pincode);

  const order = {
    id: generateOrderId(),
    customer: { fullName, mobile, email },
    shippingAddress: { houseNumber, street, district, pincode, landmark },
    items: pricedItems,
    subtotal,
    deliveryCharge,
    total,
    paymentMethod: method,
    paymentStatus: "pending",
    orderStatus: method === "cod" ? "confirmed" : "pending",
    createdAt: Date.now(),
  };

  saveOrder(order.id, order);

  res.status(200).json({ success: true, orderId: order.id, order });
}
