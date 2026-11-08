import { formatMinutes } from "./time";

export interface Booking {
  start: number;
  end: number;
}

export interface CheckResult {
  available: boolean;
  reason?: string;
}

export function canBook(
  start: number,
  end: number,
  now: number,
  blocked: boolean,
  bookings: Booking[]
): CheckResult {
  return checkBook(start, end, now, blocked, bookings);
}

export function checkBook(
  start: number,
  end: number,
  now: number,
  blocked: boolean,
  bookings: Booking[]
): CheckResult {
  if (blocked) {
    return { available: false, reason: "Room is blocked" };
  }
  if (!Number.isInteger(start) || !Number.isInteger(end) || !Number.isInteger(now)) {
    return { available: false, reason: "Enter a valid time" };
  }
  if (start >= end) {
    return { available: false, reason: "End time must be after start time" };
  }
  if (end - start > 120) {
    return { available: false, reason: "Maximum booking duration is 120 minutes" };
  }
  if (start <= now) {
    return { available: false, reason: "Start time must be after current time" };
  }

  for (const b of bookings) {
    if (start < b.end && end > b.start) {
      return { available: false, reason: `Overlaps ${formatMinutes(b.start)}-${formatMinutes(b.end)}` };
    }
  }

  return { available: true };
}
