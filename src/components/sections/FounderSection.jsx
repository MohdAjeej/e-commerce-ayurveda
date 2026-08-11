import { images } from "../../assets/images";
import PlaceholderImage from "../common/PlaceholderImage";
import Reveal from "../common/Reveal";
import "./FounderSection.css";

export default function FounderSection() {
  return (
    <section className="founder" id="founder">
      <div className="container">
        <Reveal as="h2" className="section-heading founder__heading">
          Dr. Swati Singhal<span>(Founder &amp; CEO)</span>
        </Reveal>

        <div className="founder__grid">
          <Reveal className="founder__text">
            <p>
              Dr. Swati Singhal is the Founder &amp; CEO of OJAS Himalayan Herbs, guided by a
              strong belief in the power of nature and the timeless wisdom of Ayurveda. Her
              vision is to make authentic, natural wellness a part of everyday life by blending
              traditional Ayurvedic knowledge with modern research and quality standards.
            </p>
            <p>
              Inspired by the purity of the Himalayas, she leads OJAS with a focus on ethical
              sourcing, holistic healing, and product authenticity. Under her guidance, the brand
              continues to grow as a trusted name in natural wellness, helping people achieve
              balance, vitality, and long-term well-being through nature-based solutions.
            </p>
          </Reveal>

          <Reveal className="founder__photo" delay={150}>
            <PlaceholderImage image={images.founder} rounded />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
