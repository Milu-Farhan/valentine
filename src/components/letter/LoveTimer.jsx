import { useState, useEffect } from "react";
import { TIMER_UNITS } from "../../data/constants";
import { getElapsed } from "../../utils/helpers";

export default function LoveTimer() {
  const [elapsed, setElapsed] = useState(getElapsed);

  useEffect(() => {
    const id = setInterval(() => setElapsed(getElapsed()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="love-timer">
      <p className="timer-label">Loving each other for</p>
      <div className="timer-grid">
        {TIMER_UNITS.map((u) => (
          <div key={u.key} className="timer-unit">
            <span className={`timer-value ${u.className || ""}`}>{elapsed[u.key]}</span>
            <span className="timer-name">{u.label}</span>
          </div>
        ))}
      </div>
      <p className="timer-sub">...and counting forever 💕</p>
    </div>
  );
}
