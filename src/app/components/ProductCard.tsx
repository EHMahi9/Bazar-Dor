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
      className="group flex flex-col justify-between bg-white hover:bg-gray-50/50 border border-gray-200/90 hover:border-green-400 rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 relative"
    >
      {/* Upper area: Image & Info */}
      <div className="flex items-start gap-3.5">
        {/* Left: Thumbnail Icon/Image */}
        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
          {product.image || "📦"}
        </div>

        {/* Middle: Name & Unit */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-green-600 transition-colors truncate">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            {formatUnit(product.unit)}
          </p>
        </div>
      </div>

      {/* Bottom Area: Price & Percentage Change matching Figma */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-end justify-between">
        <div>
          <span className="block text-[11px] text-gray-400 font-medium">আজকের দাম</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-black text-gray-900 font-mono tracking-tight">
              {toBengaliNumber(product.today)}
            </span>
            <span className="text-xs text-gray-600 font-bold">টাকা</span>
          </div>
        </div>

        {/* Change Badge */}
        <span
          className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md border ${
            isUp
              ? "text-red-600 bg-red-50 border-red-200/70"
              : isDown
              ? "text-emerald-700 bg-emerald-50 border-emerald-200/70"
              : "text-gray-600 bg-gray-100 border-gray-200"
          }`}
        >
          {isUp ? (
            <>
              <TrendingUp className="w-3 h-3" />
              <span>▲ {toBengaliNumber(product.change.pct)}%</span>
            </>
          ) : isDown ? (
            <>
              <TrendingDown className="w-3 h-3" />
              <span>▼ {toBengaliNumber(product.change.pct)}%</span>
            </>
          ) : (
            <>
              <Minus className="w-3 h-3" />
              <span>—০.০%</span>
            </>
          )}
        </span>
      </div>
    </Link>
  );
}
