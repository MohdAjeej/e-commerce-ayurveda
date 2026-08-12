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

export default function PlaceholderImage({ image, alt, className = "", rounded = false, showLabel = true }) {
  const radius = rounded ? "var(--radius-lg)" : "var(--radius-sm)";

  // A product photo is passed as a plain resolved URL string.
  const realSrc = typeof image === "string" ? image : image?.real;

  if (realSrc) {
    return (
      <img
        src={realSrc}
        alt={alt || image?.label || ""}
        className={`placeholder-img-real ${className}`}
        style={{ borderRadius: radius }}
        loading="lazy"
        onError={(e) => {
          console.error('Image failed to load:', realSrc);
          e.target.style.opacity = '0.5';
        }}
      />
    );
  }

  // No mapped image at all (either no placeholder config, or a product with no photo yet).
  if (!image || typeof image === "string") {
    return (
      <div
        className={`placeholder-img placeholder-img--sage ${className}`}
        style={{ aspectRatio: "1 / 1", borderRadius: radius }}
        role="img"
        aria-label={alt || "No image available"}
      >
        <span className="placeholder-img__sheen" aria-hidden="true" />
        <span className="placeholder-img__badge">
          <ImageIcon className="placeholder-img__icon" strokeWidth={1.25} />
        </span>
        {showLabel && <span className="placeholder-img__label">No image available</span>}
      </div>
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
