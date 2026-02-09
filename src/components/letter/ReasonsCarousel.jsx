import { useState, useEffect } from "react";
import { REASONS } from "../../data/constants";

export default function ReasonsCarousel() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => { setCurrent((p) => (p + 1) % REASONS.length); setFade(true); }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="reasons-carousel">
      <p className="reasons-title">Reasons I Love You</p>
      <div className="reasons-hearts">{"❤️".repeat(3)}</div>
      <p className={`reason-text ${fade ? "reason-visible" : "reason-hidden"}`}>
        &ldquo;{REASONS[current]}&rdquo;
      </p>
      <div className="reason-dots">
        {REASONS.map((_, i) => (
          <span key={i} className={`reason-dot ${i === current ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
}
