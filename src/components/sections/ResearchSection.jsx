import { images } from "../../assets/images";
import InfoBand from "./InfoBand";

export default function ResearchSection() {
  return (
    <InfoBand
      id="research"
      align="left"
      eyebrow="Innovation Rooted in Nature"
      heading="Where research meets Ayurveda"
      text="Each OJAS formulation is created through a thoughtful fusion of traditional Ayurvedic knowledge and modern scientific research. Our team ensures every product — like Immunity Booster, Inch Loss 30 Days, and Himalayan Pure Honey — delivers purity, safety, and real results. Backed by lab-tested quality and Himalayan herbs, OJAS brings you nature's finest wellness in every scoop."
      image={images.research}
    />
  );
}
