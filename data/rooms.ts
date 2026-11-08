export type Equipment = "projector" | "whiteboard" | "computers" | "video conference";

export interface Booking {
  start: number;
  end: number;
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  equipment: Equipment[];
  blocked: boolean;
  blockedReason?: string;
  bookings: Booking[];
}

export const ROOMS: Room[] = [
  {
    id: "R304",
    name: "Room 304 - KBTU Main Building",
    capacity: 30,
    equipment: ["projector", "whiteboard"],
    blocked: false,
    bookings: [{ start: 600, end: 660 }]
  },
  {
    id: "R101",
    name: "Computer Lab 101",
    capacity: 20,
    equipment: ["projector", "computers"],
    blocked: false,
    bookings: [{ start: 720, end: 780 }]
  },
  {
    id: "R210",
    name: "Seminar Room 210",
    capacity: 12,
    equipment: ["whiteboard"],
    blocked: false,
    bookings: []
  },
  {
    id: "R405",
    name: "Lecture Hall 405",
    capacity: 80,
    equipment: ["projector", "whiteboard", "video conference"],
    blocked: true,
    blockedReason: "Maintenance",
    bookings: []
  }
];
