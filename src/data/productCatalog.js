// Plain product catalog data — id, name, description, price, mrp only.
// No Vite-specific imports here (unlike productImages.js, which uses
// import.meta.glob and only works inside Vite's compiler): this file must
// stay importable from the Node.js backend (api/_lib/pricing.js) as well as
// the frontend (via products.js, which adds images on top of this).
export const PRODUCT_CATALOG = [
  {
    id: "acacia-honey",
    name: "Acacia Honey",
    description: "Light, delicately sweet raw honey harvested from Acacia blossoms.",
    price: 399,
    mrp: 449,
  },
  {
    id: "ajwain-honey",
    name: "Ajwain Honey",
    description: "Raw honey infused with ajwain (carom seed) for a warm, digestive edge.",
    price: 349,
    mrp: 399,
  },
  {
    id: "fennel-honey",
    name: "Fennel Honey",
    description: "Raw honey infused with fennel for a mellow, aromatic sweetness.",
    price: 369,
    mrp: 419,
  },
  {
    id: "jamun-honey",
    name: "Jamun Honey",
    description: "Raw honey sourced from Jamun blossoms, deep and rich in flavor.",
    price: 429,
    mrp: 479,
  },
  {
    id: "kesar-honey",
    name: "Kesar Honey",
    description: "Raw honey infused with saffron (kesar) for a golden, fragrant finish.",
    price: 599,
    mrp: 699,
  },
  {
    id: "multiflora-honey",
    name: "Multiflora Honey",
    description: "Raw honey drawn from a mix of wildflower blossoms for a rounded flavor.",
    price: 329,
    mrp: 379,
  },
  {
    id: "breath-pure-lemon",
    name: "Breath Pure Lemon",
    description: "A lemon-flavored breath freshener crafted with natural ingredients.",
    price: 149,
    mrp: 179,
  },
  {
    id: "breath-pure-rose",
    name: "Breath Pure Rose",
    description: "A rose-flavored breath freshener crafted with natural ingredients.",
    price: 149,
    mrp: 179,
  },
  {
    id: "immunity-booster",
    name: "Immunity Booster",
    description: "A daily herbal blend to strengthen natural defenses and everyday vitality.",
    price: 499,
    mrp: 549,
  },
];

export function getCatalogProductById(id) {
  return PRODUCT_CATALOG.find((product) => product.id === id) || null;
}
