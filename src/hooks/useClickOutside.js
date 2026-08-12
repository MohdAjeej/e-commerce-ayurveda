import { useEffect } from "react";

export default function useClickOutside(ref, onOutside, active = true) {
  useEffect(() => {
    if (!active) return undefined;

    function handlePointerDown(event) {
      if (ref.current && !ref.current.contains(event.target)) onOutside();
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [ref, onOutside, active]);
}
