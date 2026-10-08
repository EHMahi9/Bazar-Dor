import React from "react";
import Link from "next/link";
import { Home, AlertCircle, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-4xl">
          🔍
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
            ৪০৪ - পেজটি পাওয়া যায়নি
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            ভুল ঠিকানায় এসেছেন!
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            আপনি যে পেজ বা পণ্যটি খুঁজছেন তা বর্তমানে বিদ্যমান নেই অথবা সরানো হয়েছে।
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>

          <Link
            href="/#সব-পণ্য"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>সব পণ্য দেখুন</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
