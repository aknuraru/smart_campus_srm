export function toMinutes(t: string): number {
  if (!t || t.trim() === "") return NaN;
  const parts = t.split(":");
  if (parts.length !== 2) return NaN;
  const h = Number(parts[0]);
  const m = Number(parts[1]);
  if (!Number.isInteger(h) || !Number.isInteger(m)) return NaN;
  if (h < 0 || h > 23 || m < 0 || m > 59) return NaN;
  return h * 60 + m;
}

export function toEndMinutes(t: string): number {
  if (t === "00:00") return 1440;
  return toMinutes(t);
}

export function formatMinutes(min: number): string {
  const h = Math.floor(min / 60).toString().padStart(2, "0");
  const m = (min % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}
