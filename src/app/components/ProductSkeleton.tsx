import React from "react";

export default function ProductSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-5 animate-pulse flex flex-col justify-between h-48"
        >
          <div className="flex justify-between items-center">
            <div className="w-16 h-5 bg-slate-800 rounded-full" />
            <div className="w-14 h-5 bg-slate-800 rounded-full" />
          </div>
          <div className="flex items-center gap-4 my-2">
            <div className="w-14 h-14 bg-slate-800 rounded-2xl shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="w-3/4 h-5 bg-slate-800 rounded" />
              <div className="w-1/2 h-3.5 bg-slate-800 rounded" />
            </div>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
            <div className="w-16 h-4 bg-slate-800 rounded" />
            <div className="w-20 h-6 bg-slate-800 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
