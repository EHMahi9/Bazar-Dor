"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatUnit, toBengaliNumber } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <Link
      href={`/product/${product.slug || product.id}`}
      className="group flex flex-col bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 relative overflow-hidden"
    >
      {/* Top row: Category tag & Trend Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/50">
          <span>{product.categoryIcon || "🏷️"}</span>
          <span>{product.categoryNameBn || product.category}</span>
        </span>

        {/* Change Badge */}
        <span
          className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
            isUp
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
              : isDown
              ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
              : "bg-slate-800 text-slate-400 border border-slate-700"
          }`}
        >
          {isUp ? (
            <>
              <TrendingUp className="w-3.5 h-3.5" />
              <span>▲ {toBengaliNumber(product.change.pct)}%</span>
            </>
          ) : isDown ? (
            <>
              <TrendingDown className="w-3.5 h-3.5" />
              <span>▼ {toBengaliNumber(product.change.pct)}%</span>
            </>
          ) : (
            <>
              <Minus className="w-3.5 h-3.5" />
              <span>—০.০%</span>
            </>
          )}
        </span>
      </div>

      {/* Product Image / Illustration & Name */}
      <div className="flex items-center gap-4 my-2">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-3xl sm:text-4xl shadow-inner group-hover:scale-110 transition-transform duration-300 shrink-0">
          {product.image || "📦"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg sm:text-xl text-white group-hover:text-emerald-400 transition-colors truncate">
            {product.nameBn}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            {formatUnit(product.unit)}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-slate-800 my-3" />

      {/* Price row */}
      <div className="mt-auto flex items-baseline justify-between pt-1">
        <span className="text-xs text-slate-400 font-medium">আজকের দাম</span>
        <div className="text-right">
          <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono tracking-tight">
            {toBengaliNumber(product.today)}
          </span>
          <span className="text-xs sm:text-sm text-slate-300 font-bold ml-1">
            টাকা
          </span>
        </div>
      </div>
    </Link>
  );
}
