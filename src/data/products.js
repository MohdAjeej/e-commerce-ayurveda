import { getProductImages, getPrimaryImage } from "./productImages";

const PRODUCT_INFO = [
  {
    id: "acacia-honey",
    name: "Acacia Honey",
    description: "Light, delicately sweet raw honey harvested from Acacia blossoms.",
  },
  {
    id: "ajwain-honey",
    name: "Ajwain Honey",
    description: "Raw honey infused with ajwain (carom seed) for a warm, digestive edge.",
  },
  {
    id: "fennel-honey",
    name: "Fennel Honey",
    description: "Raw honey infused with fennel for a mellow, aromatic sweetness.",
  },
  {
    id: "jamun-honey",
    name: "Jamun Honey",
    description: "Raw honey sourced from Jamun blossoms, deep and rich in flavor.",
  },
  {
    id: "kesar-honey",
    name: "Kesar Honey",
    description: "Raw honey infused with saffron (kesar) for a golden, fragrant finish.",
  },
  {
    id: "multiflora-honey",
    name: "Multiflora Honey",
    description: "Raw honey drawn from a mix of wildflower blossoms for a rounded flavor.",
  },
  {
    id: "breath-pure-lemon",
    name: "Breath Pure Lemon",
    description: "A lemon-flavored breath freshener crafted with natural ingredients.",
  },
  {
    id: "breath-pure-rose",
    name: "Breath Pure Rose",
    description: "A rose-flavored breath freshener crafted with natural ingredients.",
  },
  {
    id: "immunity-booster",
    name: "Immunity Booster",
    description: "A daily herbal blend to strengthen natural defenses and everyday vitality.",
  },
];

export const PRODUCTS = PRODUCT_INFO.map((product) => ({
  ...product,
  images: getProductImages(product.id),
  image: getPrimaryImage(product.id),
}));

export function getProductById(id) {
  return PRODUCTS.find((product) => product.id === id) || null;
}
