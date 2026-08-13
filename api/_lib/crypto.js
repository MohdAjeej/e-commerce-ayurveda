import crypto from "node:crypto";

export function generateOrderId() {
  return `ORD-${Date.now().toString(36).toUpperCase()}${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}
