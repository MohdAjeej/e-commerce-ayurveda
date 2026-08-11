import { Link } from "react-router-dom";
import { ContactFooterColumn } from "../sections/ContactSection";
import { PRODUCTS } from "../../data/products";
import { LEGAL_LINKS } from "../../data/legalLinks";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="container site-footer__grid">
          <ContactFooterColumn />

          <div className="footer-col">
            <h3>Corporate Products</h3>
            <span className="footer-col__label">All OJAS Formulations</span>
            <ul className="footer-col__links">
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <Link to="/products">{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>About OJAS Himalayan Herbs</h3>
            <span className="footer-col__label">Our Vision</span>
            <p>
              To bring balance, purity, and vitality into everyday life through the timeless
              science of Ayurveda.
            </p>
          </div>
        </div>
      </div>

      <div className="site-footer__legal">
        <div className="container site-footer__legal-inner">
          <ul className="site-footer__legal-links">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <p className="site-footer__copyright">
            © {new Date().getFullYear()} OJAS HIMALAYAN HERBS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
