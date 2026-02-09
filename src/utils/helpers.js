export const rand = Math.random;

export const pickRandom = (arr) => arr[Math.floor(rand() * arr.length)];

export const START_DATE = new Date(2018, 10, 21);

export function getElapsed() {
  const now = new Date();
  let years = now.getFullYear() - START_DATE.getFullYear();
  let months = now.getMonth() - START_DATE.getMonth();
  let days = now.getDate() - START_DATE.getDate();
  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
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
