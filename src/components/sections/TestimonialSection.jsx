import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import PlaceholderImage from "../common/PlaceholderImage";
import Reveal from "../common/Reveal";
import { TESTIMONIALS } from "../../data/testimonials";
import "./TestimonialSection.css";

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const active = TESTIMONIALS[index];

  const go = (dir) => {
    setIndex((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="testimonial" id="testimonial">
      <div className="container">
        <Reveal as="h2" className="section-heading">
          Testimonial
        </Reveal>

        <Reveal className="testimonial__card">
          <div className="testimonial__body" key={index}>
            <div className="testimonial__avatar">
              <PlaceholderImage image={active.photo} alt={active.name} rounded showLabel={false} />
            </div>

            <Quote className="testimonial__quote-icon" size={34} strokeWidth={1.25} />
            <p className="testimonial__text">{active.quote}</p>

            <h3 className="testimonial__name">{active.name}</h3>
            <span className="testimonial__role">{active.role}</span>
          </div>

          <div className="testimonial__controls">
            <button aria-label="Previous testimonial" onClick={() => go(-1)}>
              <ChevronLeft size={20} />
            </button>
            <div className="testimonial__dots">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={i === index ? "is-active" : ""}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <button aria-label="Next testimonial" onClick={() => go(1)}>
              <ChevronRight size={20} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
