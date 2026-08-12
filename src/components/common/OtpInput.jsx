import { useEffect, useRef } from "react";
import "./OtpInput.css";

export default function OtpInput({ length = 6, value, onChange, onComplete, disabled = false, error = false }) {
  const refs = useRef([]);

  useEffect(() => {
    if (value.length === length) onComplete?.(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, length]);

  const setDigit = (index, digit) => {
    const chars = value.split("");
    chars[index] = digit;
    onChange(chars.join("").slice(0, length));
  };

  const handleChange = (index, e) => {
    const digits = e.target.value.replace(/\D/g, "");
    if (!digits) {
      setDigit(index, "");
      return;
    }
    const lastDigit = digits.slice(-1);
    setDigit(index, lastDigit);
    if (index < length - 1) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (value[index]) {
        setDigit(index, "");
        return;
      }
      if (index > 0) {
        refs.current[index - 1]?.focus();
        setDigit(index - 1, "");
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      refs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!digits) return;
    onChange(digits);
    const focusIndex = Math.min(digits.length, length - 1);
    refs.current[focusIndex]?.focus();
  };

  return (
    <div className={`otp-input ${error ? "has-error" : ""}`}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          autoComplete={i === 0 ? "one-time-code" : "off"}
          className="otp-input__box"
          value={value[i] || ""}
          disabled={disabled}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          aria-label={`Digit ${i + 1} of ${length}`}
        />
      ))}
    </div>
  );
}
