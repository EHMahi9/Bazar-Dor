import React from "react";
import Link from "next/link";
import { Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white border border-gray-200/90 rounded-2xl p-8 sm:p-10 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-3xl">
          🔍
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase">
            ৪০৪ - পেজটি পাওয়া যায়নি
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            ভুল ঠিকানায় এসেছেন!
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            আপনি যে পেজ বা পণ্যটি খুঁজছেন তা বর্তমানে বিদ্যমান নেই অথবা সরানো হয়েছে।
          </p>
        </div>

        <div className="pt-2 space-y-2.5">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-sm active:scale-98"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>

          <Link
            href="/#সব-পণ্য"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-6 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-xs transition-all border border-gray-200"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>সব পণ্য দেখুন</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
