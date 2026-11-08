import { describe, it, expect } from "vitest";
import { toMinutes, toEndMinutes, formatMinutes } from "./time";

describe("time utilities", () => {
  it("TM1: converts standard HH:MM string to minutes", () => {
    expect(toMinutes("09:30")).toBe(570);
  });

  it("TM2: converts 00:00 end time to 1440 minutes", () => {
    expect(toEndMinutes("00:00")).toBe(1440);
  });

  it("TM3: converts regular end time to minutes", () => {
    expect(toEndMinutes("10:00")).toBe(600);
  });

  it("TM4: formats minutes back to HH:MM string", () => {
    expect(formatMinutes(600)).toBe("10:00");
  });
});
