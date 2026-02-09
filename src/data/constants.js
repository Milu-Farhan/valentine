import { rand } from "../utils/helpers";

/* ─── Config ─── */
export const IS_MOBILE = window.innerWidth <= 520;

const COUNT = {
  stars: IS_MOBILE ? 30 : 60,
  hearts: IS_MOBILE ? 15 : 30,
  fireworks: IS_MOBILE ? 6 : 10,
  sparks: IS_MOBILE ? 20 : 40,
  petals: IS_MOBILE ? 10 : 18,
};

/* ─── Emoji sets ─── */
export const HEART_EMOJIS = ["💕", "💖", "💗", "💓", "💝", "💘", "❤️", "🌹", "✨", "🦋"];
export const PETAL_EMOJIS = ["🌸", "🥀", "🌺", "💮", "🪷"];
export const SPARKLE_EMOJIS = ["✨", "💖", "💫", "🌸"];
export const BURST_EMOJIS = ["💖", "💕", "✨", "🌹"];
export const BOTTOM_ROSES = ["🌹", "🌷", "🌸", "💐", "🌺", "🦋", "🌹"];

export const FIREWORK_COLORS = [
  "#ff6b81", "#ff4081", "#ffb3c1", "#f0d9b5", "#d4a574", "#ff80ab",
  "#ea80fc", "#ff9e80", "#ffd54f", "#fff", "#b388ff", "#ff6e6e",
];

/* ─── Text content ─── */
export const NO_TEXTS = [
  "No", "Are you sure?", "Really sure?", "Think again!", "Pls? 🥺",
  "Don't do this 😢", "I'll cry...", "You're breaking my heart 💔",
  "Faruu is sad 😭", "Last chance!", "No isn't an option!",
];

export const REASONS = [
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

export const PROMISES = [
  "I promise to always make you smile, even on your worst days",
  "I promise to hold your hand through every storm",
  "I promise to choose you, every single day",
  "I promise to be your safe place, always",
  "I promise to love you more with every passing second",
];

export const WHISPERS = [
  "soulmates", "forever yours", "meant to be", "my everything",
  "endless love", "destiny", "you & me", "written in the stars",
].map((text, i) => ({
  id: i, text,
  top: 10 + rand() * 75,
  left: rand() * 85,
  delay: i * 3.5 + rand() * 2,
  duration: 12 + rand() * 8,
  size: 13 + rand() * 5,
}));

export const TIMER_UNITS = [
  { key: "years", label: "Years" },
  { key: "months", label: "Months" },
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec", className: "timer-seconds" },
];

/* ─── Pre-generated particle data ─── */
export const STARS = Array.from({ length: COUNT.stars }, (_, i) => ({
  id: i,
  left: rand() * 100, top: rand() * 100,
  size: 1 + rand() * 2.5,
  delay: rand() * 5, duration: 2 + rand() * 3,
}));

export const HEARTS = Array.from({ length: COUNT.hearts }, (_, i) => ({
  id: i,
  emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
  left: rand() * 100,
  delay: rand() * 10, duration: 6 + rand() * 10,
  size: 12 + rand() * 22,
  sway: rand() > 0.5 ? "swayLeft" : "swayRight",
}));

export const FIREWORKS = Array.from({ length: COUNT.fireworks }, (_, i) => ({
  id: i,
  x: 8 + rand() * 84,
  burstY: 10 + rand() * 35,
  delay: i * 0.5 + rand() * 0.3,
  sparks: Array.from({ length: COUNT.sparks }, (_, j) => ({
    id: j,
    angle: (j / COUNT.sparks) * 360 + (rand() - 0.5) * 12,
    distance: 100 + rand() * 160,
    size: 3.5 + rand() * 4,
    color: FIREWORK_COLORS[Math.floor(rand() * FIREWORK_COLORS.length)],
    duration: 1 + rand(),
    trailLength: 20 + rand() * 30,
  })),
}));

export const SHOOTING_STARS = Array.from({ length: 3 }, (_, i) => ({
  id: i,
  top: 5 + rand() * 35, left: -5 + rand() * 50,
  delay: 4 + i * 12 + rand() * 6,
  duration: 14 + rand() * 8,
  tailLength: 100 + rand() * 60,
  size: 2 + rand() * 1.5,
}));

export const PETALS = Array.from({ length: COUNT.petals }, (_, i) => ({
  id: i,
  emoji: PETAL_EMOJIS[i % 5],
  left: rand() * 100,
  delay: rand() * 8, duration: 8 + rand() * 7,
  size: 14 + rand() * 12,
  swayAmount: 40 + rand() * 60,
}));

export const BURST_HEARTS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  emoji: BURST_EMOJIS[i % 4],
  angle: i * 22.5,
  delay: i * 0.06,
}));
