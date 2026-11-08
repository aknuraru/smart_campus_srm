import React, { useState, useMemo, useEffect } from "react";
import { CalendarDays, Building2 } from "lucide-react";
import { ROOMS, Equipment } from "./data/rooms";
import { filterRooms } from "./lib/filterRooms";
import { checkRoom } from "./lib/checkRoom";
import { toMinutes, toEndMinutes } from "./lib/time";
import { RequirementsForm } from "./components/RequirementsForm";
import { RoomList } from "./components/RoomList";
import { TimeField } from "./components/TimeField";
import { ResultCard } from "./components/ResultCard";
import { BookingList } from "./components/BookingList";

export function App() {
  const [attendees, setAttendees] = useState<number | "">(1);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("R304");

  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [nowTime, setNowTime] = useState("09:00");

  const filtered = useMemo(() => {
    const numAttendees = typeof attendees === "number" ? attendees : 1;
    return filterRooms(ROOMS, { attendees: numAttendees, equipment: selectedEquipment });
  }, [attendees, selectedEquipment]);

  useEffect(() => {
    if (filtered.length > 0 && !filtered.some((r) => r.id === selectedRoomId)) {
      setSelectedRoomId(filtered[0].id);
    }
  }, [filtered, selectedRoomId]);

  const selectedRoom = ROOMS.find((r) => r.id === selectedRoomId);

  const result = useMemo(() => {
    if (!selectedRoom || !filtered.some((r) => r.id === selectedRoomId)) return null;
    const s = toMinutes(startTime);
    const e = toEndMinutes(endTime);
    const n = toMinutes(nowTime);
    return checkRoom(selectedRoom, s, e, n);
  }, [selectedRoom, filtered, selectedRoomId, startTime, endTime, nowTime]);

  return (
    <div className="min-h-screen bg-slate-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white flex">
            <Building2 size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Room Availability</h1>
            <p className="text-sm text-slate-500">Smart Campus Checker</p>
          </div>
        </div>

        {selectedRoom && filtered.some((r) => r.id === selectedRoomId) && (
          <div className="p-4 border border-slate-200 rounded-xl bg-white flex items-center gap-3">
            <CalendarDays className="text-blue-600" />
            <span className="font-semibold text-slate-800">{selectedRoom.name}</span>
          </div>
        )}

        <RequirementsForm
          attendees={attendees}
          onAttendeesChange={setAttendees}
          selectedEquipment={selectedEquipment}
          onEquipmentChange={setSelectedEquipment}
        />

        <RoomList
          rooms={filtered}
          selectedRoomId={selectedRoomId}
          onSelectRoom={setSelectedRoomId}
        />

        {filtered.length > 0 && (
          <>
            <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-4">
              <TimeField label="Start Time" value={startTime} onChange={setStartTime} />
              <TimeField label="End Time" value={endTime} onChange={setEndTime} hint="00:00 = end of day (24:00)" />
              <TimeField label="Current Time (for testing)" value={nowTime} onChange={setNowTime} />
            </div>

            {result && <ResultCard result={result} />}
            {selectedRoom && <BookingList bookings={selectedRoom.bookings} />}
          </>
        )}
      </div>
    </div>
  );
}
