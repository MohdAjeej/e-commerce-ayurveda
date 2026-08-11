import { images } from "../../assets/images";
import PlaceholderImage from "../common/PlaceholderImage";
import Reveal from "../common/Reveal";
import { FOCUS_AREAS } from "../../data/focusAreas";
import "./FocusAreas.css";

export default function FocusAreas() {
  return (
    <section className="focus" id="focus">
      <div className="container focus__inner">
        <Reveal className="focus__list">
          <h2 className="section-heading section-heading--dark focus__heading">
            Our Areas of Focus
          </h2>

          <ul>
            {FOCUS_AREAS.map((item, i) => (
              <li key={item.title} className="focus__item">
                <span className="focus__icon">
                  <item.icon size={26} strokeWidth={1.5} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="focus__image" delay={150}>
          <div className="focus__image-wrapper">
            <PlaceholderImage image={images.focus} rounded />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
