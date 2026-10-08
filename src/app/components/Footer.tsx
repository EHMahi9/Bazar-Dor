import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-500 py-8 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-gray-600 font-medium text-center sm:text-left">
            বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          <p className="text-gray-500 text-center sm:text-right">
            সকল স্বত্ব সংরক্ষিত। বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-4 border-t border-gray-100 text-[11px] text-gray-400">
          <p>© {new Date().getFullYear()} বাজার দর (Bazar Dor). সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-emerald-600 transition-colors">হোম</Link>
            <Link href="/#সব-পণ্য" className="hover:text-emerald-600 transition-colors">সব পণ্য</Link>
            <Link href="/about" className="hover:text-emerald-600 transition-colors">আমাদের সম্পর্কে</Link>
            <Link href="/profile" className="hover:text-emerald-600 transition-colors">প্রোফাইল</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
