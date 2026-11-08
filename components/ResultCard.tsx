import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { CheckResult } from "../lib/canBook";

interface ResultCardProps {
  result: CheckResult;
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <div
      className={`p-4 rounded-xl border flex items-center gap-3 ${
        result.available ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
      }`}
    >
      {result.available ? (
        <CheckCircle2 className="text-emerald-600 h-6 w-6 flex-shrink-0" />
      ) : (
        <XCircle className="text-red-600 h-6 w-6 flex-shrink-0" />
      )}
      <div>
        <h3 className={`font-bold ${result.available ? "text-emerald-900" : "text-red-900"}`}>
          {result.available ? "Available" : "Unavailable"}
        </h3>
        <p className={`text-sm ${result.available ? "text-emerald-700" : "text-red-700"}`}>
          {result.available ? "This time slot is open for booking." : result.reason}
        </p>
      </div>
    </div>
  );
}
