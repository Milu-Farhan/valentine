import { PETALS } from "../../data/constants";

export default function RosePetals() {
  return (
    <div className="rose-petals">
      {PETALS.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`, "--sway": `${p.swayAmount}px`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
