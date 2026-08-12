// Decorative (non-product) placeholder image registry.
// Product photos are NOT here - they live in ../data/productImages.js, the single
// source of truth for real product photography.
//
// These entries have no actual photo yet, so they render as icon placeholders
// (see PlaceholderImage) instead of pulling from an external image service.

export const images = {
  heroDecor: { icon: "sparkles", tone: "dark", ratio: "4 / 3", label: "Ayurvedic Products" },

  founder: { icon: "user", tone: "sage", ratio: "1 / 1.05", label: "Dr. Swati Singhal" },

  ingredients: {
    ginger: { icon: "flame", tone: "amber", ratio: "1 / 1", label: "Ginger" },
    lavender: { icon: "flower", tone: "lavender", ratio: "1 / 1", label: "Lavender" },
    cinnamon: { icon: "leaf", tone: "sage", ratio: "1 / 1", label: "Cinnamon" },
    turmeric: { icon: "sun", tone: "amber", ratio: "1 / 1", label: "Turmeric" },
    lemon: { icon: "citrus", tone: "amber", ratio: "1 / 1", label: "Lemon" },
    kalonji: { icon: "droplet", tone: "dark", ratio: "1 / 1", label: "Kalonji (Black Seed)" },
    blackPepper: { icon: "circle-dot", tone: "dark", ratio: "1 / 1", label: "Black Pepper" },
    ashwagandha: { icon: "sprout", tone: "mint", ratio: "1 / 1", label: "Ashwagandha" },
    center: { icon: "flower2", tone: "mint", ratio: "1 / 1", label: "Ayurvedic ingredients" },
  },

  ayurveda: { icon: "heart-pulse", tone: "teal", ratio: "1 / 1.1", label: "Wellness journey" },

  research: { icon: "microscope", tone: "teal", ratio: "1 / 1.1", label: "Research & purity" },

  focus: { icon: "target", tone: "sage", ratio: "3 / 4", label: "Areas of focus" },

  testimonial: { icon: "quote", tone: "mint", ratio: "1 / 1", label: "Customer testimonial" },
};
