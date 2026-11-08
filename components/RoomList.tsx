import React from "react";
import { Room } from "../data/rooms";
import { ALL_EQUIPMENT } from "./RequirementsForm";

interface RoomListProps {
  rooms: Room[];
  selectedRoomId: string;
  onSelectRoom: (id: string) => void;
}

export function RoomList({ rooms, selectedRoomId, onSelectRoom }: RoomListProps) {
  if (rooms.length === 0) {
    return (
      <div className="p-6 border border-slate-200 rounded-xl text-center bg-slate-50 text-slate-600">
        No rooms match your requirements. Try fewer attendees or less equipment.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {rooms.map((room) => {
        const isSelected = room.id === selectedRoomId;
        return (
          <button
            key={room.id}
            type="button"
            onClick={() => onSelectRoom(room.id)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              isSelected
                ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/30"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-slate-900">{room.name}</h4>
                <p className="text-sm text-slate-500">Capacity: {room.capacity}</p>
              </div>
              {room.blocked && (
                <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-md">
                  Blocked - {room.blockedReason || "Maintenance"}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              {room.equipment.map((eq) => {
                const label = ALL_EQUIPMENT.find((e) => e.id === eq)?.label || eq;
                return (
                  <span key={eq} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
                    {label}
                  </span>
                );
              })}
            </div>
          </button>
        );
      })}
    </div>
  );
}
