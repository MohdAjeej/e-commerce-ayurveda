// Decorative (non-product) placeholder image registry.
// Product photos are NOT here - they live in ../data/productImages.js, the single
// source of truth for real product photography.
//
// Entries without a `real` field have no actual photo yet, so they render as icon
// placeholders (see PlaceholderImage) instead of pulling from an external image service.

import ceoImage from "./CEO image.jpeg";
import ayurvedaImage from "./How can we support you.png";
import researchImage from "./Where research meets Ayurveda.png";
import focusImage from "./Our Areas of Focus.png";
import gingerImage from "./Holistic Wellness Through Ayurvedic Nutrition/ginger.jpg";
import lavenderImage from "./Holistic Wellness Through Ayurvedic Nutrition/Lavender.png";
import cinnamonImage from "./Holistic Wellness Through Ayurvedic Nutrition/Cinnamon.jpg";
import turmericImage from "./Holistic Wellness Through Ayurvedic Nutrition/Turmeric.jpg";
import lemonImage from "./Holistic Wellness Through Ayurvedic Nutrition/lemon.jpg";
import kalonjiImage from "./Holistic Wellness Through Ayurvedic Nutrition/Kalonji (Black Seed).jpg";
import blackPepperImage from "./Holistic Wellness Through Ayurvedic Nutrition/Black Pepper.jpg";
import ashwagandhaImage from "./Holistic Wellness Through Ayurvedic Nutrition/Ashwagandha.jpg";
import ayurvedicIngredientsImage from "./Holistic Wellness Through Ayurvedic Nutrition/Ayurvedic ingredients.jpg";

export const images = {
  heroDecor: { icon: "sparkles", tone: "dark", ratio: "4 / 3", label: "Ayurvedic Products" },

  founder: {
    real: ceoImage,
    icon: "user",
    tone: "sage",
    ratio: "1 / 1.05",
    label: "Dr. Swati Singhal",
  },

  ingredients: {
    ginger: { real: gingerImage, icon: "flame", tone: "amber", ratio: "1 / 1", label: "Ginger" },
    lavender: {
      real: lavenderImage,
      icon: "flower",
      tone: "lavender",
      ratio: "1 / 1",
      label: "Lavender",
    },
    cinnamon: {
      real: cinnamonImage,
      icon: "leaf",
      tone: "sage",
      ratio: "1 / 1",
      label: "Cinnamon",
    },
    turmeric: {
      real: turmericImage,
      icon: "sun",
      tone: "amber",
      ratio: "1 / 1",
      label: "Turmeric",
    },
    lemon: { real: lemonImage, icon: "citrus", tone: "amber", ratio: "1 / 1", label: "Lemon" },
    kalonji: {
      real: kalonjiImage,
      icon: "droplet",
      tone: "dark",
      ratio: "1 / 1",
      label: "Kalonji (Black Seed)",
    },
    blackPepper: {
      real: blackPepperImage,
      icon: "circle-dot",
      tone: "dark",
      ratio: "1 / 1",
      label: "Black Pepper",
    },
    ashwagandha: {
      real: ashwagandhaImage,
      icon: "sprout",
      tone: "mint",
      ratio: "1 / 1",
      label: "Ashwagandha",
    },
    center: {
      real: ayurvedicIngredientsImage,
      icon: "flower2",
      tone: "mint",
      ratio: "1 / 1",
      label: "Ayurvedic ingredients",
    },
  },

  ayurveda: {
    real: ayurvedaImage,
    icon: "heart-pulse",
    tone: "teal",
    ratio: "1 / 1.1",
    label: "How can we support you?",
  },

  research: {
    real: researchImage,
    icon: "microscope",
    tone: "teal",
    ratio: "1 / 1.1",
    label: "Where research meets Ayurveda",
  },

  focus: {
    real: focusImage,
    icon: "target",
    tone: "sage",
    ratio: "3 / 4",
    label: "Areas of focus",
  },

  testimonial: { icon: "quote", tone: "mint", ratio: "1 / 1", label: "Customer testimonial" },
};
