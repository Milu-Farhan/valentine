import { useState, useRef } from "react";
import "./styles/global.css";
import "./styles/effects.css";
import "./styles/question.css";
import "./styles/letter.css";
import { StarryNight, FloatingHearts, RosePetals, WhisperTexts, SparkleTrail, Fireworks } from "./components/effects";
import { QuestionCard } from "./components/question";
import { LoveLetterReveal } from "./components/letter";

export default function App() {
  const [said, setSaid] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const containerRef = useRef(null);

  const handleYes = () => {
    setSaid(true);
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 4000);
  };

  return (
    <div className={`app ${said ? "app-celebrate" : ""}`} ref={containerRef}>
      <StarryNight />
      {said ? (
        <>
          <RosePetals />
          <SparkleTrail />
          {showFireworks && <Fireworks />}
          <LoveLetterReveal />
        </>
      ) : (
        <>
          <FloatingHearts />
          <WhisperTexts />
          <SparkleTrail />
          <QuestionCard onYes={handleYes} containerRef={containerRef} />
        </>
      )}
    </div>
  );
}
