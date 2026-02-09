import { WHISPERS } from "../../data/constants";

export default function WhisperTexts() {
  return (
    <div className="whisper-texts">
      {WHISPERS.map((w) => (
        <span
          key={w.id}
          className="whisper"
          style={{
            top: `${w.top}%`, left: `${w.left}%`,
            animationDelay: `${w.delay}s`, animationDuration: `${w.duration}s`,
            fontSize: `${w.size}px`,
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}
