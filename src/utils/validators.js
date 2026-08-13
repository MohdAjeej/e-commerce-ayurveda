const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PINCODE_RE = /^\d{6}$/;
const ALL_DIGITS_RE = /^\d+$/;

export function isValidEmail(value) {
  return EMAIL_RE.test(String(value || "").trim());
}

export function isValidName(value) {
  const trimmed = String(value || "").trim();
  return trimmed.length >= 2 && !ALL_DIGITS_RE.test(trimmed);
}

export function isValidMobile(value) {
  return MOBILE_RE.test(String(value || "").trim());
}

export function isValidPincode(value) {
  return PINCODE_RE.test(String(value || "").trim());
}

export function maskEmail(email) {
  const [name, domain] = String(email || "").split("@");
  if (!name || !domain) return email || "";
  const visible = name.slice(0, 1);
  return `${visible}${"*".repeat(Math.max(name.length - 1, 1))}@${domain}`;
}
