import React from "react";
import Link from "next/link";
import { ArrowDown, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950 border-b border-slate-800/80 py-12 sm:py-16 lg:py-20">
      {/* Decorative ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold shadow-inner">
              <Sparkles className="w-4 h-4 animate-spin text-emerald-400" />
              <span>নিত্যপ্রয়োজনীয় পণ্যের নির্ভরযোগ্য বাজার মূল্য</span>
            </div>

            {/* Main Heading matching Figma */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              আজকের বাজারের দাম{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                এক নজরে
              </span>
            </h1>

            {/* Subtitle matching Figma */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA Button and Features */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#সব-পণ্য"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base shadow-lg shadow-emerald-500/25 transition-all duration-200 active:scale-95 group"
              >
                <span>আজকের বাজার দর দেখুন</span>
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </a>

              <Link
                href="/sign-up"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
              >
                <span>ফ্রি অ্যাকাউন্ট তৈরি করুন</span>
              </Link>
            </div>

            {/* Micro Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>দৈনিক আপডেট</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>সরাসরি বাজার ভিত্তিক তথ্য</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">৮+</span>
                <span>বিভাগের পাইকারি ও খুচরা বাজার</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Image from Figma */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center group">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                <img
                  src="/bazar-hero.png"
                  alt="বাজার দর হিরো ব্যানার"
                  className="max-h-full max-w-full object-contain drop-shadow-[0_15px_30px_rgba(16,185,129,0.2)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Quick Stats Badge */}
              <div className="w-full mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-around text-xs">
                <div>
                  <span className="block text-emerald-400 font-black text-base font-mono">৩৩+</span>
                  <span className="text-slate-400">নিত্যদিনের পণ্য</span>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <span className="block text-teal-400 font-black text-base font-mono">১২+</span>
                  <span className="text-slate-400">বাজার অন্তর্ভুক্ত</span>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <span className="block text-amber-400 font-black text-base font-mono">১০০%</span>
                  <span className="text-slate-400">রিয়েল-টাইম</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}