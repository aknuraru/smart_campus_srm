import { describe, it, expect } from "vitest";
import { checkBook } from "./canBook";

describe("canBook regression tests (AC1-AC5)", () => {
  const now = 540;
  const blocked = false;
  const bookings = [{ start: 600, end: 660 }];

  it("R01: allows a booking touching existing booking after it", () => {
    expect(checkBook(660, 720, now, blocked, bookings)).toEqual({ available: true });
  });

  it("R02: allows a booking touching existing booking before it", () => {
    expect(checkBook(570, 600, now, blocked, bookings)).toEqual({ available: true });
  });

  it("R03: rejects an overlapping booking", () => {
    const res = checkBook(630, 690, now, blocked, bookings);
    expect(res.available).toBe(false);
    expect(res.reason).toContain("Overlaps");
  });

  it("R04: rejects a booking when room is blocked", () => {
    expect(checkBook(660, 720, now, true, bookings)).toEqual({
      available: false,
      reason: "Room is blocked"
    });
  });

  it("R05: allows a booking of exactly 120 minutes", () => {
    expect(checkBook(720, 840, now, blocked, bookings)).toEqual({ available: true });
  });

  it("R06: rejects a booking longer than 120 minutes", () => {
    expect(checkBook(720, 841, now, blocked, bookings)).toEqual({
      available: false,
      reason: "Maximum booking duration is 120 minutes"
    });
  });

  it("R07: rejects a booking that starts now", () => {
    expect(checkBook(540, 570, now, blocked, bookings)).toEqual({
      available: false,
      reason: "Start time must be after current time"
    });
  });

  it("R08: rejects a zero-length booking", () => {
    expect(checkBook(720, 720, now, blocked, bookings)).toEqual({
      available: false,
      reason: "End time must be after start time"
    });
  });

  it("R09: rejects a reversed booking", () => {
    expect(checkBook(750, 720, now, blocked, bookings)).toEqual({
      available: false,
      reason: "End time must be after start time"
    });
  });

  it("R10: does not change the bookings array", () => {
    const copy = JSON.stringify(bookings);
    checkBook(660, 720, now, blocked, bookings);
    expect(JSON.stringify(bookings)).toBe(copy);
  });
});
