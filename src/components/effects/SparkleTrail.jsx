import { useState, useEffect } from "react";
import { SPARKLE_EMOJIS } from "../../data/constants";
import { rand, pickRandom } from "../../utils/helpers";

export default function SparkleTrail() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const add = (x, y) => {
      const id = Date.now() + rand();
      setSparkles((prev) => [
        ...prev.slice(-12),
        { id, x, y, emoji: pickRandom(SPARKLE_EMOJIS) },
      ]);
      setTimeout(() => setSparkles((prev) => prev.filter((s) => s.id !== id)), 800);
    };
    const onMouse = (e) => add(e.clientX, e.clientY);
    const onTouch = (e) => { const t = e.touches[0]; if (t) add(t.clientX, t.clientY); };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <div className="sparkle-trail">
      {sparkles.map((s) => (
        <span key={s.id} className="sparkle-particle" style={{ left: s.x, top: s.y }}>
          {s.emoji}
        </span>
      ))}
    </div>
  );
}
