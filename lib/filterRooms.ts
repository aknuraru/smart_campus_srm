import { Room, Equipment } from "../data/rooms";

export interface FilterCriteria {
  attendees: number;
  equipment: Equipment[];
}

export function filterRooms(rooms: Room[], criteria: FilterCriteria): Room[] {
  const reqAttendees = Math.max(1, criteria.attendees || 1);
  return rooms.filter((room) => {
    if (room.capacity < reqAttendees) return false;
    for (const item of criteria.equipment) {
      if (!room.equipment.includes(item)) return false;
    }
    return true;
  });
}
