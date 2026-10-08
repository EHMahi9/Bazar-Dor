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
    <div className="flex items-center gap-2 bg-white border border-gray-200/90 rounded-xl px-3 py-2 text-sm shadow-2xs">
      <ArrowUpDown className="w-4 h-4 text-green-600 shrink-0" />
      <label htmlFor="sort-select" className="text-gray-500 text-xs sm:text-sm font-medium whitespace-nowrap">
        সাজান:
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="bg-transparent text-gray-800 font-semibold text-xs sm:text-sm focus:outline-none cursor-pointer pr-2"
      >
        <option value="default" className="bg-white text-gray-800">
          ডিফল্ট
        </option>
        <option value="price-asc" className="bg-white text-gray-800">
          দাম: কম থেকে বেশি
        </option>
        <option value="price-desc" className="bg-white text-gray-800">
          দাম: বেশি থেকে কম
        </option>
      </select>
    </div>
  );
}
