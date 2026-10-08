"use client";

import React from "react";
import { SortOption } from "@/types";
import { ArrowUpDown } from "lucide-react";

interface SortDropdownProps {
  value: SortOption;
  onChange: (val: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-sm shadow-sm">
      <ArrowUpDown className="w-4 h-4 text-emerald-400 shrink-0" />
      <label htmlFor="sort-select" className="text-slate-400 text-xs sm:text-sm font-medium whitespace-nowrap">
        সাজান:
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="bg-transparent text-white font-semibold text-xs sm:text-sm focus:outline-none cursor-pointer pr-2"
      >
        <option value="default" className="bg-slate-900 text-white">
          ডিফল্ট
        </option>
        <option value="price-asc" className="bg-slate-900 text-white">
          দাম: কম থেকে বেশি
        </option>
        <option value="price-desc" className="bg-slate-900 text-white">
          দাম: বেশি থেকে কম
        </option>
      </select>
    </div>
  );
}
