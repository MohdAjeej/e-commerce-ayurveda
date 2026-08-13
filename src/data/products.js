import { getProductImages, getPrimaryImage } from "./productImages";
import { PRODUCT_CATALOG } from "./productCatalog";

export const PRODUCTS = PRODUCT_CATALOG.map((product) => ({
  ...product,
  images: getProductImages(product.id),
  image: getPrimaryImage(product.id),
}));

export function getProductById(id) {
  return PRODUCTS.find((product) => product.id === id) || null;
}
