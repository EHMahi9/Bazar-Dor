import React from "react";

export default function ProductSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 animate-pulse flex flex-col justify-between h-40 shadow-xs"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-13 h-13 rounded-xl bg-gray-100 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="w-3/4 h-5 bg-gray-100 rounded-md" />
              <div className="w-1/2 h-3.5 bg-gray-100 rounded-md" />
            </div>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <div className="w-16 h-4 bg-gray-100 rounded-md" />
            <div className="w-16 h-6 bg-gray-100 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
