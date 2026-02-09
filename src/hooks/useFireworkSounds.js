import { useRef, useCallback } from "react";
import { rand, pickRandom } from "../utils/helpers";

const SFX = "/sounds/";
const LIFT_SOUNDS = ["lift1.mp3", "lift2.mp3", "lift3.mp3"].map((f) => SFX + f);
const BURST_SOUNDS = ["burst1.mp3", "burst2.mp3", "burst-sm-1.mp3", "burst-sm-2.mp3"].map((f) => SFX + f);
const CRACKLE_SOUNDS = ["crackle1.mp3", "crackle-sm-1.mp3"].map((f) => SFX + f);
const ALL_SOUNDS = [...LIFT_SOUNDS, ...BURST_SOUNDS, ...CRACKLE_SOUNDS];

export default function useFireworkSounds() {
  const poolRef = useRef({});

  const preload = useCallback(() => {
    if (Object.keys(poolRef.current).length > 0) return;
    ALL_SOUNDS.forEach((src) => {
      poolRef.current[src] = Array.from({ length: 3 }, () => {
        const a = new Audio(src);
        a.preload = "auto";
        a.volume = 0.5;
        return a;
      });
    });
  }, []);

  const play = useCallback((src, delay, vol) => {
    setTimeout(() => {
      try {
        const copies = poolRef.current[src];
        if (!copies) return;
        const a = copies.find((c) => c.paused || c.ended) || copies[0];
        a.currentTime = 0;
        a.volume = Math.min(1, Math.max(0, vol));
        a.play().catch(() => {});
      } catch { /* audio not supported */ }
    }, delay * 1000);
  }, []);

  const playLaunch = useCallback((delay) => {
    preload();
    play(pickRandom(LIFT_SOUNDS), delay, 0.4 + rand() * 0.2);
  }, [preload, play]);

  const playBurst = useCallback((delay) => {
    preload();
    play(pickRandom(BURST_SOUNDS), delay, 0.5 + rand() * 0.3);
    play(pickRandom(CRACKLE_SOUNDS), delay + 0.15, 0.3 + rand() * 0.2);
  }, [preload, play]);

  return { playLaunch, playBurst };
}
