import PlaceholderImage from "../common/PlaceholderImage";
import Reveal from "../common/Reveal";
import "./InfoBand.css";

export default function InfoBand({ id, eyebrow, heading, text, image, align = "left" }) {
  return (
    <div className={`info-band info-band--${align}`} id={id}>
      <div className="container info-band__inner">
        <Reveal className="info-band__box">
          <span className="info-band__eyebrow">{eyebrow}</span>
          <h2>{heading}</h2>
          <p>{text}</p>
        </Reveal>

        <Reveal className="info-band__image" delay={150}>
          <PlaceholderImage image={image} />
        </Reveal>
      </div>
    </div>
  );
}
