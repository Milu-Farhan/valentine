import { STARS, SHOOTING_STARS } from "../../data/constants";

export default function StarryNight() {
  return (
    <div className="starry-night">
      {STARS.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.left}%`, top: `${s.top}%`,
            width: `${s.size}px`, height: `${s.size}px`,
            animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      {SHOOTING_STARS.map((s) => (
        <div
          key={`shoot-${s.id}`}
          className="shooting-star"
          style={{
            top: `${s.top}%`, left: `${s.left}%`,
            animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s`,
            "--tail-length": `${s.tailLength}px`, "--star-size": `${s.size}px`,
          }}
        />
      ))}
    </div>
  );
}
