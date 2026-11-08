import { Room } from "../data/rooms";
import { checkBook, CheckResult } from "./canBook";

export function checkRoom(
  room: Room,
  start: number,
  end: number,
  now: number
): CheckResult {
  return checkBook(start, end, now, room.blocked, room.bookings);
}
