import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <span>🛒 আমাদের সম্পর্কে</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
          বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের নির্ভরযোগ্য দর মনিটরিং
        </h1>

        <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
          <p>
            <strong className="text-emerald-700 font-bold">বাজার দর</strong> হলো বাংলাদেশের সাধারণ মানুষের দৈনন্দিন নিত্যপ্রয়োজনীয় পণ্যের সঠিক ও নির্ভরযোগ্য বাজার মূল্য যাচাই করার একটি আধুনিক ওয়েব প্ল্যাটফর্ম।
          </p>
          <p>
            চাল, ডাল, ভোজ্যতেল, শাকসবজি, মাছ, মাংস, ডিম ও মসলাসহ সব ধরনের পণ্যের প্রতিদিনের পাইকারি ও খুচরা মূল্য, দাম বাড়া বা কমার ট্রেন্ড এবং বিভাগীয় বাজারভিত্তিক তুলনামূলক তথ্য এখানে স্বচ্ছভাবে তুলে ধরা হয়।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200/70 space-y-2">
            <Zap className="w-5 h-5 text-emerald-600" />
            <h4 className="font-bold text-gray-900 text-sm">লাইভ বাজার রেট</h4>
            <p className="text-xs text-gray-500">প্রতিদিনের রিয়েল-টাইম মার্কেট প্রাইস আপডেট ও টিকার।</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200/70 space-y-2">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <h4 className="font-bold text-gray-900 text-sm">সুরক্ষিত প্ল্যাটফর্ম</h4>
            <p className="text-xs text-gray-500">BetterAuth ও MongoDB ভিত্তিক সুরক্ষিত প্রমাণীকরণ।</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200/70 space-y-2">
            <CheckCircle2 className="w-5 h-5 text-amber-600" />
            <h4 className="font-bold text-gray-900 text-sm">বিভাগীয় বিশ্লেষণ</h4>
            <p className="text-xs text-gray-500">বিভিন্ন বিভাগ ও স্থানীয় বাজারের তুলনামূলক যাচাই।</p>
          </div>
        </div>
      </div>
    </div>
  );
}
