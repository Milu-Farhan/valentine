import { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";

const HEART_EMOJIS = [
  "💕",
  "💖",
  "💗",
  "💓",
  "💝",
  "💘",
  "❤️",
  "🌹",
  "✨",
  "🦋",
];

const NO_TEXTS = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Pls? 🥺",
  "Don't do this 😢",
  "I'll cry...",
  "You're breaking my heart 💔",
  "Faruu is sad 😭",
  "Last chance!",
  "No isn't an option!",
];

const REASONS = [
  "Your smile makes my whole world light up",
  "The way you laugh at my silly jokes",
  "How you make even ordinary days feel magical",
  "Your kindness that touches everyone around you",
  "The way you look at me like I'm your whole world",
  "How your voice is the sweetest sound I've ever heard",
  "Your strength and grace in everything you do",
  "The warmth of your hand in mine",
  "How you always know exactly what I need",
  "Because every love story pales next to ours",
  "The way you say my name",
  "How you make me want to be a better person",
];

const IS_MOBILE = window.innerWidth <= 520;

const STARS = Array.from({ length: IS_MOBILE ? 30 : 60 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 1 + Math.random() * 2.5,
  delay: Math.random() * 5,
  duration: 2 + Math.random() * 3,
}));

const HEARTS = Array.from({ length: IS_MOBILE ? 15 : 30 }, (_, i) => ({
  id: i,
  emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
  left: Math.random() * 100,
  delay: Math.random() * 10,
  duration: 6 + Math.random() * 10,
  size: 12 + Math.random() * 22,
  sway: Math.random() > 0.5 ? "swayLeft" : "swayRight",
}));

const FIREWORK_COLORS = [
  "#ff6b81",
  "#ff4081",
  "#ffb3c1",
  "#f0d9b5",
  "#d4a574",
  "#ff80ab",
  "#ea80fc",
  "#ff9e80",
  "#ffd54f",
  "#fff",
  "#b388ff",
  "#ff6e6e",
];

const FIREWORKS = Array.from({ length: IS_MOBILE ? 6 : 10 }, (_, i) => ({
  id: i,
  x: 8 + Math.random() * 84,
  burstY: 10 + Math.random() * 35,
  delay: i * 0.5 + Math.random() * 0.3,
  sparks: Array.from({ length: IS_MOBILE ? 20 : 40 }, (_, j) => ({
    id: j,
    angle: (j / (IS_MOBILE ? 20 : 40)) * 360 + (Math.random() - 0.5) * 12,
    distance: 100 + Math.random() * 160,
    size: 3.5 + Math.random() * 4,
    color: FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)],
    duration: 1 + Math.random() * 1,
    trailLength: 20 + Math.random() * 30,
  })),
}));

const SHOOTING_STARS = Array.from({ length: 3 }, (_, i) => ({
  id: i,
  top: 5 + Math.random() * 35,
  left: -5 + Math.random() * 50,
  delay: 4 + i * 12 + Math.random() * 6,
  duration: 14 + Math.random() * 8,
  tailLength: 100 + Math.random() * 60,
  size: 2 + Math.random() * 1.5,
}));

const WHISPERS = [
  "soulmates",
  "forever yours",
  "meant to be",
  "my everything",
  "endless love",
  "destiny",
  "you & me",
  "written in the stars",
].map((text, i) => ({
  id: i,
  text,
  top: 10 + Math.random() * 75,
  left: Math.random() * 85,
  delay: i * 3.5 + Math.random() * 2,
  duration: 12 + Math.random() * 8,
  size: 13 + Math.random() * 5,
}));

const PROMISES = [
  "I promise to always make you smile, even on your worst days",
  "I promise to hold your hand through every storm",
  "I promise to choose you, every single day",
  "I promise to be your safe place, always",
  "I promise to love you more with every passing second",
];

const PETALS = Array.from({ length: IS_MOBILE ? 10 : 18 }, (_, i) => ({
  id: i,
  emoji: ["🌸", "🥀", "🌺", "💮", "🪷"][i % 5],
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 8 + Math.random() * 7,
  size: 14 + Math.random() * 12,
  swayAmount: 40 + Math.random() * 60,
}));

function StarryNight() {
  return (
    <div className="starry-night">
      {STARS.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      {SHOOTING_STARS.map((s) => (
        <div
          key={`shoot-${s.id}`}
          className="shooting-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            "--tail-length": `${s.tailLength}px`,
            "--star-size": `${s.size}px`,
          }}
        />
      ))}
    </div>
  );
}

function WhisperTexts() {
  return (
    <div className="whisper-texts">
      {WHISPERS.map((w) => (
        <span
          key={w.id}
          className="whisper"
          style={{
            top: `${w.top}%`,
            left: `${w.left}%`,
            animationDelay: `${w.delay}s`,
            animationDuration: `${w.duration}s`,
            fontSize: `${w.size}px`,
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}

function FloatingHearts() {
  return (
    <div className="floating-hearts">
      {HEARTS.map((h) => (
        <span
          key={h.id}
          className={`floating-heart ${h.sway}`}
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}px`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

function Typewriter({ text, delay = 80, className = "" }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
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

function SparkleTrail() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const addSparkle = (x, y) => {
      const id = Date.now() + Math.random();
      setSparkles((prev) => [
        ...prev.slice(-12),
        {
          id,
          x,
          y,
          emoji: ["✨", "💖", "💫", "🌸"][Math.floor(Math.random() * 4)],
        },
      ]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
      }, 800);
    };
    const handleMouse = (e) => addSparkle(e.clientX, e.clientY);
    const handleTouch = (e) => {
      const t = e.touches[0];
      if (t) addSparkle(t.clientX, t.clientY);
    };
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchmove", handleTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  return (
    <div className="sparkle-trail">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle-particle"
          style={{ left: s.x, top: s.y }}
        >
          {s.emoji}
        </span>
      ))}
    </div>
  );
}

/* Real recorded firework sound files */
const LIFT_SOUNDS = [
  "/sounds/lift1.mp3",
  "/sounds/lift2.mp3",
  "/sounds/lift3.mp3",
];
const BURST_SOUNDS = [
  "/sounds/burst1.mp3",
  "/sounds/burst2.mp3",
  "/sounds/burst-sm-1.mp3",
  "/sounds/burst-sm-2.mp3",
];
const CRACKLE_SOUNDS = ["/sounds/crackle1.mp3", "/sounds/crackle-sm-1.mp3"];

function useFireworkSounds() {
  const poolRef = useRef({});

  /* Pre-load all sound files into an Audio pool for instant playback */
  const preload = useCallback(() => {
    if (Object.keys(poolRef.current).length > 0) return;
    [...LIFT_SOUNDS, ...BURST_SOUNDS, ...CRACKLE_SOUNDS].forEach((src) => {
      const copies = Array.from({ length: 3 }, () => {
        const a = new Audio(src);
        a.preload = "auto";
        a.volume = 0.5;
        return a;
      });
      poolRef.current[src] = copies;
    });
  }, []);

  const playFile = useCallback((src, delay, volume) => {
    setTimeout(() => {
      try {
        const copies = poolRef.current[src];
        if (!copies) return;
        /* Find one that's not currently playing */
        const a = copies.find((c) => c.paused || c.ended) || copies[0];
        a.currentTime = 0;
        a.volume = Math.min(1, Math.max(0, volume));
        a.play().catch(() => {
          /* autoplay blocked */
        });
      } catch {
        /* audio not supported */
      }
    }, delay * 1000);
  }, []);

  const playLaunch = useCallback(
    (delay) => {
      preload();
      const src = LIFT_SOUNDS[Math.floor(Math.random() * LIFT_SOUNDS.length)];
      playFile(src, delay, 0.4 + Math.random() * 0.2);
    },
    [preload, playFile],
  );

  const playBurst = useCallback(
    (delay) => {
      preload();
      /* Play a burst sound */
      const burstSrc =
        BURST_SOUNDS[Math.floor(Math.random() * BURST_SOUNDS.length)];
      playFile(burstSrc, delay, 0.5 + Math.random() * 0.3);
      /* Layer a crackle on top slightly after the burst */
      const crackleSrc =
        CRACKLE_SOUNDS[Math.floor(Math.random() * CRACKLE_SOUNDS.length)];
      playFile(crackleSrc, delay + 0.15, 0.3 + Math.random() * 0.2);
    },
    [preload, playFile],
  );

  return { playLaunch, playBurst };
}

function Fireworks() {
  const { playLaunch, playBurst } = useFireworkSounds();

  useEffect(() => {
    FIREWORKS.forEach((fw) => {
      playLaunch(fw.delay);
      playBurst(fw.delay + 0.6);
    });
  }, [playLaunch, playBurst]);

  return (
    <div className="fireworks-container">
      {FIREWORKS.map((fw) => (
        <div
          key={fw.id}
          className="firework"
          style={{
            left: `${fw.x}%`,
            "--burst-y": `${fw.burstY}vh`,
          }}
        >
          <div
            className="firework-trail"
            style={{ animationDelay: `${fw.delay}s` }}
          />
          <div
            className="firework-burst"
            style={{ animationDelay: `${fw.delay + 0.6}s` }}
          >
            {fw.sparks.map((spark) => (
              <div
                key={spark.id}
                className="spark"
                style={{
                  "--spark-angle": `${spark.angle}deg`,
                  "--spark-dist": `${spark.distance}px`,
                  "--spark-color": spark.color,
                  "--spark-size": `${spark.size}px`,
                  "--trail-len": `${spark.trailLength}px`,
                  animationDuration: `${spark.duration}s`,
                  animationDelay: `${fw.delay + 0.6}s`,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function RosePetals() {
  return (
    <div className="rose-petals">
      {PETALS.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
            "--sway": `${p.swayAmount}px`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

function ReasonsCarousel() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % REASONS.length);
        setFade(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="reasons-carousel">
      <p className="reasons-title">Reasons I Love You</p>
      <div className="reasons-hearts">{"❤️".repeat(3)}</div>
      <p className={`reason-text ${fade ? "reason-visible" : "reason-hidden"}`}>
        "{REASONS[current]}"
      </p>
      <div className="reason-dots">
        {REASONS.map((_, i) => (
          <span
            key={i}
            className={`reason-dot ${i === current ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

function PromisesSection() {
  return (
    <div className="promises-section">
      <p className="promises-title">My Promises to You 🤞</p>
      <div className="promises-list">
        {PROMISES.map((promise, i) => (
          <p key={i} className={`promise-item promise-${i + 1}`}>
            <span className="promise-icon">💫</span>
            {promise}
          </p>
        ))}
      </div>
    </div>
  );
}

function ForeverMessage() {
  return (
    <div className="forever-message">
      <div className="forever-ring">💍</div>
      <p className="forever-text">
        You & Me, <span className="forever-highlight">Forever</span>
      </p>
    </div>
  );
}

function EngravedHeart() {
  return (
    <div className="engraved-heart-wrapper">
      <div className="engraved-heart">
        <div className="heart-shape">
          <div className="heart-initials">
            F <span className="heart-ampersand">&</span> P
          </div>
          <div className="heart-date">21 . 11 . 2018</div>
        </div>
      </div>
    </div>
  );
}

function LoveTimer() {
  const [elapsed, setElapsed] = useState(() => getElapsed());

  useEffect(() => {
    const interval = setInterval(() => setElapsed(getElapsed()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="love-timer">
      <p className="timer-label">Loving each other for</p>
      <div className="timer-grid">
        <div className="timer-unit">
          <span className="timer-value">{elapsed.years}</span>
          <span className="timer-name">Years</span>
        </div>
        <div className="timer-unit">
          <span className="timer-value">{elapsed.months}</span>
          <span className="timer-name">Months</span>
        </div>
        <div className="timer-unit">
          <span className="timer-value">{elapsed.days}</span>
          <span className="timer-name">Days</span>
        </div>
        <div className="timer-unit">
          <span className="timer-value">{elapsed.hours}</span>
          <span className="timer-name">Hours</span>
        </div>
        <div className="timer-unit">
          <span className="timer-value">{elapsed.minutes}</span>
          <span className="timer-name">Min</span>
        </div>
        <div className="timer-unit">
          <span className="timer-value timer-seconds">{elapsed.seconds}</span>
          <span className="timer-name">Sec</span>
        </div>
      </div>
      <p className="timer-sub">...and counting forever 💕</p>
    </div>
  );
}

function getElapsed() {
  const start = new Date(2018, 10, 21); // Nov 21, 2018
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years,
    months,
    days,
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };
}

function LoveLetterReveal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`love-letter ${visible ? "visible" : ""}`}>
      <div className="love-letter-inner">
        <div className="letter-heart-burst">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="burst-heart"
              style={{
                "--angle": `${i * 22.5}deg`,
                animationDelay: `${i * 0.06}s`,
              }}
            >
              {["💖", "💕", "✨", "🌹"][i % 4]}
            </span>
          ))}
        </div>

        <h1 className="yes-title">I Knew It! 🎉</h1>
        <p className="yes-subtitle">Paappu said YES!</p>

        <div className="names-together">
          <span className="name-his">Faruu</span>
          <span className="infinity-heart">
            <span className="infinity-symbol">∞</span>
            <span className="infinity-heart-icon">❤️</span>
          </span>
          <span className="name-hers">Paappu</span>
        </div>

        <EngravedHeart />

        <div className="love-divider">
          <span>🌹</span>
          <span className="divider-line"></span>
          <span>🌹</span>
        </div>

        <div className="love-envelope">
          <div className="love-text">
            <p className="love-line line-1">My Dearest Paappu,</p>
            <p className="love-line line-2">
              From the very first moment you walked into my life, everything
              changed. You didn't just enter my world — you became it. Your eyes
              hold galaxies I want to get lost in forever, and your smile... oh,
              your smile could make even the stars jealous.
            </p>
            <p className="love-line line-3">
              Every beat of my heart whispers your name. Every dream I dream has
              you in it. You are my first thought in the morning, my last wish
              at night, and every beautiful thing in between.
            </p>
            <p className="love-line line-4">
              With you, even silence speaks love. With you, ordinary moments
              become extraordinary memories. You are not just my Valentine — you
              are my forever, my always, my everything.
            </p>
            <p className="love-line line-5">
              Thank you for choosing me, for loving me with all my flaws, and
              for making me the luckiest person alive. I promise to spend every
              day making you feel as loved as you make me feel.
            </p>
            <p className="love-line line-6">
              I love you more than words could ever say, more than the ocean has
              drops, more than the sky has stars. And I'll love you even more
              tomorrow.
            </p>
            <p className="love-line line-7 signature">
              Forever & Always Yours,
              <br />
              <span className="signature-name">Your Faruu 💕</span>
            </p>
          </div>
        </div>

        <div className="love-divider" style={{ animationDelay: "3.6s" }}>
          <span>💖</span>
          <span className="divider-line"></span>
          <span>💖</span>
        </div>

        <ReasonsCarousel />

        <PromisesSection />

        <div className="love-meter">
          <p className="meter-label">Faruu's Love for Paappu</p>
          <div className="meter-bar">
            <div className="meter-fill"></div>
          </div>
          <p className="meter-value">∞ %</p>
        </div>

        <LoveTimer />

        <ForeverMessage />

        <div className="floating-roses">
          {["🌹", "🌷", "🌸", "💐", "🌺", "🦋", "🌹"].map((rose, i) => (
            <span
              key={i}
              className="floating-rose"
              style={{
                animationDelay: `${i * 0.4}s`,
                left: `${8 + i * 13}%`,
              }}
            >
              {rose}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [answered, setAnswered] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [scrambled, setScrambled] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const containerRef = useRef(null);

  const scrambleNo = useCallback(() => {
    const card = containerRef.current?.querySelector(".question-card");
    const cardRect = card
      ? card.getBoundingClientRect()
      : { left: 0, right: 0, top: 0, bottom: 0 };

    const isMobile = window.innerWidth <= 520;
    const btnW = isMobile ? 130 : 170;
    const btnH = isMobile ? 44 : 50;
    const pad = isMobile ? 10 : 20;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Place the No button in zones outside the card area
    const zones = [
      {
        xMin: pad,
        xMax: Math.max(pad, cardRect.left - btnW - pad),
        yMin: pad,
        yMax: vh - btnH - pad,
      },
      {
        xMin: Math.min(vw - btnW - pad, cardRect.right + pad),
        xMax: vw - btnW - pad,
        yMin: pad,
        yMax: vh - btnH - pad,
      },
      {
        xMin: pad,
        xMax: vw - btnW - pad,
        yMin: pad,
        yMax: Math.max(pad, cardRect.top - btnH - pad),
      },
      {
        xMin: pad,
        xMax: vw - btnW - pad,
        yMin: Math.min(vh - btnH - pad, cardRect.bottom + pad),
        yMax: vh - btnH - pad,
      },
    ].filter((z) => z.xMax > z.xMin && z.yMax > z.yMin);

    const zone = zones[Math.floor(Math.random() * zones.length)] || {
      xMin: pad,
      xMax: vw - btnW - pad,
      yMin: pad,
      yMax: pad + btnH,
    };

    setNoPos({
      x: zone.xMin + Math.random() * (zone.xMax - zone.xMin),
      y: zone.yMin + Math.random() * (zone.yMax - zone.yMin),
    });
    setScrambled(true);
    setNoCount((prev) => prev + 1);
    setYesScale((prev) => Math.min(prev + 0.08, 1.6));
  }, []);

  const noText = NO_TEXTS[Math.min(noCount, NO_TEXTS.length - 1)];

  if (answered) {
    return (
      <div className="app app-celebrate">
        <StarryNight />
        <FloatingHearts />
        <RosePetals />
        <Fireworks />
        <SparkleTrail />
        <LoveLetterReveal />
      </div>
    );
  }

  return (
    <div className="app" ref={containerRef}>
      <StarryNight />
      <FloatingHearts />
      <WhisperTexts />
      <SparkleTrail />

      <div className="question-card">
        <div className="card-glow-border"></div>

        <div className="card-sparkle tl">✨</div>
        <div className="card-sparkle tr">✨</div>
        <div className="card-sparkle bl">🌹</div>
        <div className="card-sparkle br">🌹</div>

        <div className="rose-bloom anim-in anim-d1">
          <div className="rose-core">🌹</div>
          <div className="rose-ring ring-1"></div>
          <div className="rose-ring ring-2"></div>
          <div className="rose-ring ring-3"></div>
        </div>

        <h1 className="question-title anim-in anim-d2">
          <Typewriter text="Dear Paappu..." delay={90} className="dear-line" />
        </h1>

        <h2 className="question-main anim-in anim-d3">
          Will You Be My Valentine?
        </h2>

        <p className="question-sub anim-in anim-d4">
          I already know the answer, but I just want to hear you say it... 🥰
        </p>

        <div className="question-from anim-in anim-d5">
          — with all my love, Faruu
        </div>

        <div className="buttons-area anim-in anim-d6">
          <button
            className="btn btn-yes"
            onClick={() => setAnswered(true)}
            style={{ transform: `scale(${yesScale})` }}
          >
            Yes! 💕
          </button>

          {!scrambled && (
            <button
              className="btn btn-no"
              onMouseEnter={scrambleNo}
              onTouchStart={scrambleNo}
            >
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
          style={{
            position: "fixed",
            left: `${noPos.x}px`,
            top: `${noPos.y}px`,
          }}
        >
          {noText}
        </button>
      )}
    </div>
  );
}

export default App;
