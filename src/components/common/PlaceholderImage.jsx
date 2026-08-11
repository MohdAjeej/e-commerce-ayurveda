import {
  Leaf,
  Sparkles,
  User,
  Shield,
  Flame,
  Droplet,
  FlaskConical,
  Sprout,
  Flower,
  Flower2,
  Sun,
  Citrus,
  CircleDot,
  HeartPulse,
  Microscope,
  Target,
  Quote,
  Image as ImageIcon,
} from "lucide-react";
import "./PlaceholderImage.css";

const ICONS = {
  leaf: Leaf,
  sparkles: Sparkles,
  user: User,
  shield: Shield,
  flame: Flame,
  droplet: Droplet,
  flask: FlaskConical,
  sprout: Sprout,
  flower: Flower,
  flower2: Flower2,
  sun: Sun,
  citrus: Citrus,
  "circle-dot": CircleDot,
  "heart-pulse": HeartPulse,
  microscope: Microscope,
  target: Target,
  quote: Quote,
};

export default function PlaceholderImage({ image, className = "", rounded = false, showLabel = true }) {
  if (!image) return null;

  const radius = rounded ? "var(--radius-lg)" : "var(--radius-sm)";

  if (image.real) {
    return (
      <img
        src={image.real}
        alt={image.label}
        className={`placeholder-img-real ${className}`}
        style={{ borderRadius: radius }}
        loading="lazy"
        onError={(e) => {
          console.error('Image failed to load:', image.real);
          e.target.style.opacity = '0.5';
        }}
      />
    );
  }

  const Icon = ICONS[image.icon] || ImageIcon;

  return (
    <div
      className={`placeholder-img placeholder-img--${image.tone} ${className}`}
      style={{ aspectRatio: image.ratio, borderRadius: radius }}
      role="img"
      aria-label={image.label}
    >
      <span className="placeholder-img__sheen" aria-hidden="true" />
      <span className="placeholder-img__badge">
        <Icon className="placeholder-img__icon" strokeWidth={1.25} />
      </span>
      {showLabel && <span className="placeholder-img__label">{image.label}</span>}
    </div>
  );
}
