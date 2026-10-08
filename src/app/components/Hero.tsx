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

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              বাংলাদেশের দৈনন্দিন{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                বাজার দর
              </span>{" "}
              জানুন সবার আগে
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              প্রতিদিনের তাজা চাল, ডাল, তেল, শাকসবজি, মাছ ও মাংসের দাম ও দর পরিবর্তনের তথ্য এক ক্লিকেই। বিভাগভিত্তিক ও পাইকারি বাজারের নির্ভরযোগ্য বিশ্লেষণ।
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

          {/* Right Column: Hero Visual Graphic */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-3xl shadow-2xl">
              {/* Highlight Card 1 */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl">
                    🍚
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">স্বর্ণমাছি চাল</h4>
                    <p className="text-xs text-slate-400">প্রতি কেজি (খুচরা)</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-emerald-400 font-mono">১৪৮ টাকা</span>
                  <span className="block text-[11px] text-emerald-400 font-bold">▲ ২.১%</span>
                </div>
              </div>

              {/* Highlight Card 2 */}
              <div className="flex items-center justify-between py-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-2xl">
                    🧅
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">দেশি পেঁয়াজ</h4>
                    <p className="text-xs text-slate-400">প্রতি কেজি (খুচরা)</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-rose-400 font-mono">১১০ টাকা</span>
                  <span className="block text-[11px] text-rose-400 font-bold">▼ ৪.১%</span>
                </div>
              </div>

              {/* Highlight Card 3 */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-2xl">
                    🐟
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">ইলিশ মাছ</h4>
                    <p className="text-xs text-slate-400">প্রতি কেজি (১ কেজি সাইজ)</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-emerald-400 font-mono">১,৪৫০ টাকা</span>
                  <span className="block text-[11px] text-emerald-400 font-bold">▲ ৫.০%</span>
                </div>
              </div>

              {/* Float Badge */}
              <div className="absolute -bottom-4 -left-4 bg-emerald-500 text-slate-950 px-4 py-2 rounded-xl font-bold text-xs shadow-lg flex items-center gap-1.5">
                <span>🔥 আজ দাম বৃদ্ধির শীর্ষে শাকসবজি ও মাছ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}