import { SOCIAL_LINKS } from "../../data/socialLinks";
import "./SocialSection.css";

export default function SocialSection() {
  return (
    <section className="social-bar">
      <div className="container social-bar__inner">
        <h2>Connect with us on social</h2>
        <ul className="social-bar__icons">
          {SOCIAL_LINKS.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                <s.icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
