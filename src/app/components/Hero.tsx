"use client";

import React, { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { getBanglaTodayDate } from "@/lib/utils";

export default function Hero() {
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    setTodayDate(getBanglaTodayDate());
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Light Hero Card from Figma */}
      <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            {/* Date Pill Tag matching Figma */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-50 border border-green-200/80 text-green-700 text-xs sm:text-sm font-semibold">
              <span>{todayDate || "বৃহস্পতিবার, ৯ অক্টোবর, ২০২৬"}</span>
            </div>

            {/* Main Heading matching Figma */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.2]">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Subtitle matching Figma */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA Button matching Figma */}
            <div className="pt-2 flex items-center justify-center lg:justify-start">
              <a
                href="#সব-পণ্য"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm sm:text-base shadow-xs hover:shadow-md transition-all active:scale-95 group"
              >
                <span>সব পণ্য দেখুন</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic matching Figma */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex items-center justify-center">
              <img
                src="/bazar-hero.png"
                alt="বাজার দর হিরো"
                className="max-h-full max-w-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}