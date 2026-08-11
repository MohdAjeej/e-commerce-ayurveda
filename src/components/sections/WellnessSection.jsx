import { images } from "../../assets/images";
import PlaceholderImage from "../common/PlaceholderImage";
import Reveal from "../common/Reveal";
import { INGREDIENTS } from "../../data/ingredients";
import "./WellnessSection.css";

const RADIUS = 36; // Percentage from center

function orbitPosition(angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  const x = 50 + RADIUS * Math.cos(rad);
  const y = 50 - RADIUS * Math.sin(rad);
  return { 
    left: `${x}%`, 
    top: `${y}%`,
    transform: 'translate(-50%, -50%)' // Center the item on the calculated position
  };
}

export default function WellnessSection() {
  return (
    <section className="wellness" id="wellness">
      <div className="container">
        <Reveal as="h2" className="section-heading">
          Holistic Wellness Through Ayurvedic Nutrition
        </Reveal>

        <div className="wellness__orbit">
          <div className="wellness__ring" aria-hidden="true" />
          <div className="wellness__center">
            <PlaceholderImage image={images.ingredients.center} rounded />
          </div>

          {INGREDIENTS.map((item, i) => {
            const position = orbitPosition(item.angle);
            return (
              <Reveal
                as="div"
                key={item.name}
                className="wellness__item"
                delay={i * 60}
                style={position}
              >
                <div className="wellness__item-icon">
                  <PlaceholderImage image={item.image} rounded showLabel={false} />
                </div>
                <h3 className="wellness__item-name">{item.name}</h3>
                <p className="wellness__item-desc">{item.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
