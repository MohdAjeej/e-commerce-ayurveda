import crypto from "node:crypto";

export function generateOtp() {
  return String(crypto.randomInt(100000, 1000000));
}

export function hashOtp(otp, email) {
  const secret = process.env.OTP_SECRET || "ojas-dev-secret-change-in-production";
  return crypto.createHash("sha256").update(`${otp}:${email}:${secret}`).digest("hex");
}

export function timingSafeEqualHex(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  const bufA = Buffer.from(a, "hex");
  const bufB = Buffer.from(b, "hex");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function generateSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function generateOrderId() {
  return `ORD-${Date.now().toString(36).toUpperCase()}${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}
