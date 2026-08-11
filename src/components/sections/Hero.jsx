import { ArrowRight } from "lucide-react";
import { images } from "../../assets/images";
import PlaceholderImage from "../common/PlaceholderImage";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content hero-enter" style={{ "--enter-delay": "0ms" }}>
          <span className="eyebrow">Rooted in Ayurveda</span>
          <h1>
            Ayurvedic Products For
            <br />
            Better Immunity
          </h1>
          <p className="hero__desc">
            Boost your natural defense with Ayurvedic Products from OJAS Himalayan Herbs. Our
            herbal nutrition solutions are designed to support immunity, wellness, and everyday
            health.
          </p>
          <div className="hero__actions">
            <a href="#products" className="btn hero__cta">
              Explore Products <ArrowRight size={16} />
            </a>
            <a href="#founder" className="btn btn-outline hero__cta-secondary">
              Learn More
            </a>
          </div>
        </div>

        <div className="hero__art hero-enter" style={{ "--enter-delay": "140ms" }}>
          <div className="hero__art-img">
            <PlaceholderImage image={images.heroDecor} rounded />
          </div>
        </div>
      </div>
    </section>
  );
}
