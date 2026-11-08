import { describe, it, expect } from "vitest";
import { ROOMS } from "../data/rooms";
import { filterRooms } from "./filterRooms";
import { checkRoom } from "./checkRoom";

describe("Room catalog and filtering logic (F1-F5)", () => {
  it("F01: contains at least 4 rooms with unique IDs", () => {
    expect(ROOMS.length).toBeGreaterThanOrEqual(4);
    const ids = ROOMS.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("F02: includes R304 for capacity 30", () => {
    const res = filterRooms(ROOMS, { attendees: 30, equipment: [] });
    expect(res.some((r) => r.id === "R304")).toBe(true);
  });

  it("F03: excludes R304 for capacity 31", () => {
    const res = filterRooms(ROOMS, { attendees: 31, equipment: [] });
    expect(res.some((r) => r.id === "R304")).toBe(false);
  });

  it("F04: filters by projector + whiteboard", () => {
    const res = filterRooms(ROOMS, { attendees: 1, equipment: ["projector", "whiteboard"] });
    expect(res.map((r) => r.id)).toEqual(["R304", "R405"]);
  });

  it("F05: filters by projector + computers", () => {
    const res = filterRooms(ROOMS, { attendees: 1, equipment: ["projector", "computers"] });
    expect(res.map((r) => r.id)).toEqual(["R101"]);
  });

  it("F06: returns empty list for 200 attendees", () => {
    const res = filterRooms(ROOMS, { attendees: 200, equipment: [] });
    expect(res.length).toBe(0);
  });

  it("F07: does not mutate original ROOMS array", () => {
    const copy = JSON.stringify(ROOMS);
    filterRooms(ROOMS, { attendees: 50, equipment: ["projector"] });
    expect(JSON.stringify(ROOMS)).toBe(copy);
  });

  it("F08: evaluates blocked status correctly for R405", () => {
    const room = ROOMS.find((r) => r.id === "R405")!;
    const res = checkRoom(room, 660, 720, 540);
    expect(res.available).toBe(false);
    expect(res.reason).toBe("Room is blocked");
  });

  it("F09: evaluates room-specific bookings correctly (R304 vs R210)", () => {
    const r304 = ROOMS.find((r) => r.id === "R304")!;
    const r210 = ROOMS.find((r) => r.id === "R210")!;
    expect(checkRoom(r304, 600, 660, 540).available).toBe(false);
    expect(checkRoom(r210, 600, 660, 540).available).toBe(true);
  });

  it("F10: evaluates room-specific bookings correctly (R101 vs R304)", () => {
    const r101 = ROOMS.find((r) => r.id === "R101")!;
    const r304 = ROOMS.find((r) => r.id === "R304")!;
    expect(checkRoom(r101, 720, 780, 540).available).toBe(false);
    expect(checkRoom(r304, 720, 780, 540).available).toBe(true);
  });
});
