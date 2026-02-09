import { useState, useRef, useCallback } from "react";
import { NO_TEXTS } from "../../data/constants";
import { rand } from "../../utils/helpers";
import Typewriter from "./Typewriter";

export default function QuestionCard({ onYes, containerRef }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [scrambled, setScrambled] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);

  const scrambleNo = useCallback(() => {
    const card = containerRef.current?.querySelector(".question-card");
    const cardRect = card
      ? card.getBoundingClientRect()
      : { left: 0, right: 0, top: 0, bottom: 0 };

    const mobile = window.innerWidth <= 520;
    const btnW = mobile ? 130 : 170;
    const btnH = mobile ? 44 : 50;
    const pad = mobile ? 10 : 20;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const zones = [
      { xMin: pad, xMax: Math.max(pad, cardRect.left - btnW - pad), yMin: pad, yMax: vh - btnH - pad },
      { xMin: Math.min(vw - btnW - pad, cardRect.right + pad), xMax: vw - btnW - pad, yMin: pad, yMax: vh - btnH - pad },
      { xMin: pad, xMax: vw - btnW - pad, yMin: pad, yMax: Math.max(pad, cardRect.top - btnH - pad) },
      { xMin: pad, xMax: vw - btnW - pad, yMin: Math.min(vh - btnH - pad, cardRect.bottom + pad), yMax: vh - btnH - pad },
    ].filter((z) => z.xMax > z.xMin && z.yMax > z.yMin);

    const zone = zones[Math.floor(rand() * zones.length)] || {
      xMin: pad, xMax: vw - btnW - pad, yMin: pad, yMax: pad + btnH,
    };

    setNoPos({
      x: zone.xMin + rand() * (zone.xMax - zone.xMin),
      y: zone.yMin + rand() * (zone.yMax - zone.yMin),
    });
    setScrambled(true);
    setNoCount((p) => p + 1);
    setYesScale((p) => Math.min(p + 0.08, 1.6));
  }, [containerRef]);

  const noText = NO_TEXTS[Math.min(noCount, NO_TEXTS.length - 1)];

  return (
    <>
      <div className="question-card">
        <div className="card-glow-border" />
        <div className="card-sparkle tl">✨</div>
        <div className="card-sparkle tr">✨</div>
        <div className="card-sparkle bl">🌹</div>
        <div className="card-sparkle br">🌹</div>

        <div className="rose-bloom anim-in anim-d1">
          <div className="rose-core">🌹</div>
          <div className="rose-ring ring-1" />
          <div className="rose-ring ring-2" />
          <div className="rose-ring ring-3" />
        </div>

        <h1 className="question-title anim-in anim-d2">
          <Typewriter text="Dear Paappu..." delay={90} className="dear-line" />
        </h1>
        <h2 className="question-main anim-in anim-d3">Will You Be My Valentine?</h2>
        <p className="question-sub anim-in anim-d4">
          I already know the answer, but I just want to hear you say it... 🥰
        </p>
        <div className="question-from anim-in anim-d5">— with all my love, Faruu</div>

        <div className="buttons-area anim-in anim-d6">
          <button
            className="btn btn-yes"
            onClick={onYes}
            style={{ transform: `scale(${yesScale})` }}
          >
            Yes! 💕
          </button>
          {!scrambled && (
            <button className="btn btn-no" onMouseEnter={scrambleNo} onTouchStart={scrambleNo}>
              {noText}
            </button>
          )}
        </div>
      </div>

      {scrambled && (
        <button
          className="btn btn-no btn-no-scrambled"
          onMouseEnter={scrambleNo}
          onTouchStart={scrambleNo}
          style={{ position: "fixed", left: `${noPos.x}px`, top: `${noPos.y}px` }}
        >
          {noText}
        </button>
      )}
    </>
  );
}
