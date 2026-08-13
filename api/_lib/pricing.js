import { getCatalogProductById } from "../../src/data/productCatalog.js";
import { calculateDelivery } from "../../src/utils/delivery.js";

// Resolves { productId, quantity } pairs against the canonical product catalog.
// Never trusts a client-supplied name/price/image — those are always looked up here.
export function priceOrderItems(requestedItems) {
  if (!Array.isArray(requestedItems) || requestedItems.length === 0) {
    return { error: "Your order has no items." };
  }

  const items = [];
  for (const requested of requestedItems) {
    const productId = String(requested?.productId || "");
    const quantity = Number(requested?.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return { error: `Invalid quantity for product "${productId}".` };
    }

    const product = getCatalogProductById(productId);
    if (!product) {
      return { error: `Product "${productId}" is not available.` };
    }

    items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
    });
  }

  return { items };
}

export function computeTotals(items, pincode) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = calculateDelivery(pincode, subtotal);
  return { subtotal, deliveryCharge, total: subtotal + deliveryCharge };
}
