import React, { useId } from "react";
import { Clock } from "lucide-react";

interface TimeFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  hint?: string;
}

export function TimeField({ label, value, onChange, hint }: TimeFieldProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <Clock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 pointer-events-none" />
      </div>
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}
