import { describe, it, expect } from "vitest";
import { checkBook } from "./canBook";

describe("canBook invalid input checks", () => {
  it("V01: rejects NaN or non-integer start time", () => {
    const res = checkBook(NaN, 720, 540, false, []);
    expect(res.available).toBe(false);
    expect(res.reason).toBe("Enter a valid time");
  });
});
