import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-10 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-900">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">🛒</span>
              <span className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors">
                বাজার <span className="text-emerald-400">দর</span>
              </span>
            </Link>
            <p className="text-sm text-slate-300 font-medium">
              বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs sm:text-sm text-slate-400 italic">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </p>
            <p className="text-xs text-slate-400 mt-1">
              নিয়মিত বাজারের আপডেট ও তথ্য সরবরাহে নিবেদিত।
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} বাজার দর (Bazar Dor). সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-emerald-400 transition-colors">হোম</Link>
            <Link href="/#সব-পণ্য" className="hover:text-emerald-400 transition-colors">সব পণ্য</Link>
            <Link href="/profile" className="hover:text-emerald-400 transition-colors">প্রোফাইল</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
