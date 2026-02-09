import { useState, useEffect } from "react";
import { BURST_HEARTS, BOTTOM_ROSES } from "../../data/constants";
import EngravedHeart from "./EngravedHeart";
import ReasonsCarousel from "./ReasonsCarousel";
import PromisesSection from "./PromisesSection";
import ForeverMessage from "./ForeverMessage";
import LoveTimer from "./LoveTimer";

export default function LoveLetterReveal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`love-letter ${visible ? "visible" : ""}`}>
      <div className="love-letter-inner">
        <div className="letter-heart-burst">
          {BURST_HEARTS.map((b) => (
            <span
              key={b.id}
              className="burst-heart"
              style={{ "--angle": `${b.angle}deg`, animationDelay: `${b.delay}s` }}
            >
              {b.emoji}
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
          <span>🌹</span><span className="divider-line" /><span>🌹</span>
        </div>

        <div className="love-text">
          <p className="love-line line-1">My Dearest Paappu,</p>
          <p className="love-line line-2">
            From the very first moment you walked into my life, everything changed.
            You didn&rsquo;t just enter my world — you became it. Your eyes hold galaxies
            I want to get lost in forever, and your smile... oh, your smile could make
            even the stars jealous.
          </p>
          <p className="love-line line-3">
            Every beat of my heart whispers your name. Every dream I dream has you in it.
            You are my first thought in the morning, my last wish at night, and every
            beautiful thing in between.
          </p>
          <p className="love-line line-4">
            With you, even silence speaks love. With you, ordinary moments become
            extraordinary memories. You are not just my Valentine — you are my forever,
            my always, my everything.
          </p>
          <p className="love-line line-5">
            Thank you for choosing me, for loving me with all my flaws, and for making me
            the luckiest person alive. I promise to spend every day making you feel as
            loved as you make me feel.
          </p>
          <p className="love-line line-6">
            I love you more than words could ever say, more than the ocean has drops,
            more than the sky has stars. And I&rsquo;ll love you even more tomorrow.
          </p>
          <p className="love-line line-7 signature">
            Forever & Always Yours,<br />
            <span className="signature-name">Your Faruu 💕</span>
          </p>
        </div>

        <div className="love-divider" style={{ animationDelay: "3.6s" }}>
          <span>💖</span><span className="divider-line" /><span>💖</span>
        </div>

        <ReasonsCarousel />
        <PromisesSection />

        <div className="love-meter">
          <p className="meter-label">Faruu&rsquo;s Love for Paappu</p>
          <div className="meter-bar"><div className="meter-fill" /></div>
          <p className="meter-value">∞ %</p>
        </div>

        <LoveTimer />
        <ForeverMessage />

        <div className="floating-roses">
          {BOTTOM_ROSES.map((rose, i) => (
            <span
              key={i}
              className="floating-rose"
              style={{ animationDelay: `${i * 0.4}s`, left: `${8 + i * 13}%` }}
            >
              {rose}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
