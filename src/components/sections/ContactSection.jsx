import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { SUPPORT_LINKS } from "../../data/supportLinks";
import "./ContactSection.css";

export function ContactFooterColumn() {
  return (
    <div className="footer-col">
      <h3>For Products health care</h3>
      <div className="footer-col__items">
        {SUPPORT_LINKS.map((item) => (
          <div key={item.heading} className="footer-col__item">
            <span className="footer-col__label">{item.heading}</span>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
      <Link to="/contact" className="footer-col__cta">
        Contact Us
      </Link>
    </div>
  );
}

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact-page" id="contact">
      <div className="container contact-page__inner">
        <div className="contact-page__info">
          <span className="eyebrow">Get In Touch</span>
          <h2>We would love to hear from you</h2>
          <p>
            Have a question about our Ayurvedic formulations, distribution, or bulk orders? Reach
            out and our team will get back to you shortly.
          </p>

          <ul className="contact-page__details">
            <li>
              <Mail size={18} /> hello@ihp.ind.in
            </li>
            <li>
              <Phone size={18} /> +91 98765 43210
            </li>
            <li>
              <MapPin size={18} /> Dehradun, Uttarakhand, India
            </li>
          </ul>
        </div>

        <form className="contact-page__form" onSubmit={handleSubmit}>
          <div className="contact-page__row">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
          </div>
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Your Message" rows={5} required />
          <button type="submit" className="btn">
            {submitted ? "Message Sent" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
