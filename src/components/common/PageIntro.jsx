import Reveal from "./Reveal";
import "./PageIntro.css";

export default function PageIntro({ eyebrow, title, text }) {
  return (
    <section className="page-intro">
      <div className="container">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          {text && <p>{text}</p>}
        </Reveal>
      </div>
    </section>
  );
}
