import { useState, useEffect } from "react";

export default function Typewriter({ text, delay = 80, className = "" }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else { setDone(true); clearInterval(interval); }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="typewriter-cursor">|</span>}
    </span>
  );
}
