const FLAT_DELIVERY_CHARGE = 49;
const FREE_DELIVERY_THRESHOLD = 499;

// eslint-disable-next-line no-unused-vars -- pincode reserved for future per-zone rates
export function calculateDelivery(pincode, subtotal) {
  if (subtotal >= FREE_DELIVERY_THRESHOLD) return 0;
  return FLAT_DELIVERY_CHARGE;
}
