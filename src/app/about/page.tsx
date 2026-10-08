import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      <div className="relative p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-2xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <span>🛒 আমাদের সম্পর্কে</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white">
          বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের নির্ভরযোগ্য দর মনিটরিং
        </h1>

        <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>
            <strong className="text-emerald-400">বাজার দর</strong> হলো বাংলাদেশের সাধারণ মানুষের দৈনন্দিন নিত্যপ্রয়োজনীয় পণ্যের সঠিক ও নির্ভরযোগ্য বাজার মূল্য যাচাই করার একটি আধুনিক ওয়েব প্ল্যাটফর্ম।
          </p>
          <p>
            চাল, ডাল, ভোজ্যতেল, শাকসবজি, মাছ, মাংস, ডিম ও মসলাসহ সব ধরনের পণ্যের প্রতিদিনের পাইকারি ও খুচরা মূল্য, দাম বাড়া বা কমার ট্রেন্ড এবং বিভাগীয় বাজারভিত্তিক তুলনামূলক তথ্য এখানে স্বচ্ছভাবে তুলে ধরা হয়।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
            <Zap className="w-6 h-6 text-emerald-400" />
            <h4 className="font-bold text-white text-sm">লাইভ বাজার রেট</h4>
            <p className="text-xs text-slate-400">প্রতিদিনের রিয়েল-টাইম মার্কেট প্রাইস আপডেট ও টিকার।</p>
          </div>
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
            <ShieldCheck className="w-6 h-6 text-teal-400" />
            <h4 className="font-bold text-white text-sm">সুরক্ষিত প্ল্যাটফর্ম</h4>
            <p className="text-xs text-slate-400">BetterAuth ও MongoDB ভিত্তিক সুরক্ষিত প্রমাণীকরণ।</p>
          </div>
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-amber-400" />
            <h4 className="font-bold text-white text-sm">বিভাগীয় বিশ্লেষণ</h4>
            <p className="text-xs text-slate-400">বিভিন্ন বিভাগ ও স্থানীয় বাজারের তুলনামূলক যাচাই।</p>
          </div>
        </div>
      </div>
    </div>
  );
}
