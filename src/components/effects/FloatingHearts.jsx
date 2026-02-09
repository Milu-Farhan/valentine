import { HEARTS } from "../../data/constants";

export default function FloatingHearts() {
  return (
    <div className="floating-hearts">
      {HEARTS.map((h) => (
        <span
          key={h.id}
          className={`floating-heart ${h.sway}`}
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`, animationDuration: `${h.duration}s`,
            fontSize: `${h.size}px`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
