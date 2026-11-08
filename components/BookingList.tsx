import React from "react";
import { Booking } from "../data/rooms";
import { formatMinutes } from "../lib/time";

interface BookingListProps {
  bookings: Booking[];
}

export function BookingList({ bookings }: BookingListProps) {
  return (
    <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-3">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Existing Bookings</h4>
      {bookings.length === 0 ? (
        <p className="text-sm text-slate-400 italic">No existing bookings</p>
      ) : (
        bookings.map((b) => (
          <div key={`${b.start}-${b.end}`} className="p-3 bg-slate-50 rounded-lg flex justify-between text-sm text-slate-700">
            <span>Booking 1</span>
            <span>{formatMinutes(b.start)} - {formatMinutes(b.end)}</span>
          </div>
        ))
      )}
    </div>
  );
}
