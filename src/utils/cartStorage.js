const GUEST_KEY = "ojas_cart_v1_guest";
const BUY_NOW_KEY = "ojas_buynow_v1";

export function cartKeyFor(userId) {
  return userId ? `ojas_cart_v1_user_${userId}` : GUEST_KEY;
}

export function loadCart(key) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCart(key, items) {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // storage unavailable (private mode / quota) — fail silently, cart stays in-memory
  }
}

export function clearCartStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function loadBuyNowItem() {
  try {
    const raw = sessionStorage.getItem(BUY_NOW_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveBuyNowItem(item) {
  try {
    if (item) sessionStorage.setItem(BUY_NOW_KEY, JSON.stringify(item));
    else sessionStorage.removeItem(BUY_NOW_KEY);
  } catch {
    // ignore
  }
}

export { GUEST_KEY };
