import { Minus, Plus } from "lucide-react";
import "./QuantityStepper.css";

export default function QuantityStepper({ quantity, onIncrease, onDecrease, min = 1, size = "md" }) {
  return (
    <div className={`qty-stepper qty-stepper--${size}`}>
      <button
        type="button"
        className="qty-stepper__btn"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span className="qty-stepper__value">{quantity}</span>
      <button type="button" className="qty-stepper__btn" onClick={onIncrease} aria-label="Increase quantity">
        <Plus size={14} />
      </button>
    </div>
  );
}
