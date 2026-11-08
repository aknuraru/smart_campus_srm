import React from "react";
import { Equipment } from "../data/rooms";

export const ALL_EQUIPMENT: { id: Equipment; label: string }[] = [
  { id: "projector", label: "Projector" },
  { id: "whiteboard", label: "Whiteboard" },
  { id: "computers", label: "Computers" },
  { id: "video conference", label: "Video conference" },
];

interface RequirementsFormProps {
  attendees: number | "";
  onAttendeesChange: (val: number | "") => void;
  selectedEquipment: Equipment[];
  onEquipmentChange: (items: Equipment[]) => void;
}

export function RequirementsForm({
  attendees,
  onAttendeesChange,
  selectedEquipment,
  onEquipmentChange,
}: RequirementsFormProps) {
  const handleToggle = (item: Equipment) => {
    if (selectedEquipment.includes(item)) {
      onEquipmentChange(selectedEquipment.filter((e) => e !== item));
    } else {
      onEquipmentChange([...selectedEquipment, item]);
    }
  };

  return (
    <div className="p-4 border border-slate-200 rounded-xl space-y-4 bg-white">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Requirements</h3>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Attendees</label>
        <input
          type="number"
          min={1}
          value={attendees}
          onChange={(e) => {
            const val = e.target.value;
            onAttendeesChange(val === "" ? "" : parseInt(val, 10));
          }}
          className="w-full p-2 border border-slate-300 rounded-lg text-slate-800"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {ALL_EQUIPMENT.map((eq) => (
          <label key={eq.id} className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
            <input
              type="checkbox"
              checked={selectedEquipment.includes(eq.id)}
              onChange={() => handleToggle(eq.id)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            {eq.label}
          </label>
        ))}
      </div>
    </div>
  );
}
