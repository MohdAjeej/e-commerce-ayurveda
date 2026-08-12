// Centralized product photo mapping - the ONLY place product image filenames are listed.
// Every component that needs a product photo must go through getProductImages/getPrimaryImage
// below (or PRODUCTS in ./products.js, which already does this) instead of importing files itself.
//
// Groupings were inferred from the filenames actually present in "../assets/product image/"
// (duplicate/numbered files were treated as extra photos of the same product). If a grouping
// below is wrong, this is the only file that needs to change.

const imageModules = import.meta.glob("../assets/product image/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const filenameToUrl = {};
for (const path in imageModules) {
  const filename = path.split("/").pop();
  filenameToUrl[filename] = imageModules[path];
}

const PRODUCT_IMAGE_FILES = {
  "acacia-honey": ["Acacia honey.jpg", "acacia honey 2.jpg"],
  "ajwain-honey": ["ajwain honey.jpg", "ajwain honey 2.jpg"],
  "fennel-honey": ["fennel honey.jpg", "fennel honey 2.jpg"],
  "jamun-honey": ["jamun honey.jpg", "jamun honey 2.jpg"],
  "kesar-honey": ["keser honey.jpg", "kesar honey 2.jpg", "kesar honey 3.jpg"],
  "multiflora-honey": ["mutliflora honey.jpg", "mutliflora 2.jpg"],
  "breath-pure-lemon": ["breath pure lemon.jpg"],
  "breath-pure-rose": ["breath pure rose.jpg", "breath pure rose 2.jpg"],
  "immunity-booster": ["immunity booster.jpg"],
};

function resolveFiles(filenames) {
  return filenames
    .map((filename) => {
      const url = filenameToUrl[filename];
      if (!url) {
        console.warn(`[productImages] Missing product photo file: "${filename}"`);
        return null;
      }
      return url;
    })
    .filter(Boolean);
}

const PRODUCT_IMAGES = Object.fromEntries(
  Object.entries(PRODUCT_IMAGE_FILES).map(([id, files]) => [id, resolveFiles(files)])
);

export function getProductImages(productId) {
  return PRODUCT_IMAGES[productId] || [];
}

export function getPrimaryImage(productId) {
  return getProductImages(productId)[0] || null;
}
