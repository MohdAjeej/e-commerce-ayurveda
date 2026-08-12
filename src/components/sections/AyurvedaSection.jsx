import { images } from "../../assets/images";
import InfoBand from "./InfoBand";

export default function AyurvedaSection() {
  return (
    <InfoBand
      id="ayurveda"
      align="right"
      eyebrow="For Your Wellness Journey"
      heading="How can we support you?"
      text="At OJAS Himalayan Herbs, we believe wellness begins from within. Our natural blends — crafted with ingredients like turmeric, ginger, cinnamon, and ashwagandha — help strengthen immunity, improve digestion, and restore daily energy. Whether you aim for a stronger immune system or a healthier, lighter body, our Ayurvedic solutions support your holistic transformation."
      image={images.ayurveda}
    />
  );
}
