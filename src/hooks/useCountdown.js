import { useEffect, useState } from "react";

export default function useCountdown(targetTimestamp) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!targetTimestamp) return undefined;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [targetTimestamp]);

  if (!targetTimestamp) return { secondsLeft: 0, isExpired: true };

  const secondsLeft = Math.max(0, Math.ceil((targetTimestamp - now) / 1000));
  return { secondsLeft, isExpired: secondsLeft <= 0 };
}
