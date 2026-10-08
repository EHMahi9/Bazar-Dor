"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { User, Mail, Shield, Edit3, LogOut, ArrowLeft, Calendar } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে আগে লগইন করুন।");
      router.push("/sign-in?callbackUrl=/profile");
    }
  }, [isPending, session, router]);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("সফলভাবে লগআউট হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("লগআউট করতে সমস্যা হয়েছে");
    }
  };

  if (isPending) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-400 text-sm">প্রোফাইল তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-slate-800 text-center sm:text-left">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-400 flex items-center justify-center text-3xl sm:text-4xl font-black shadow-lg">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white">{user.name || "নামহীন ব্যবহারকারী"}</h1>
            <p className="text-xs sm:text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{user.email}</span>
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                <Shield className="w-3 h-3" />
                <span>সক্রিয় অ্যাকাউন্ট</span>
              </span>
            </div>
          </div>
        </div>

        {/* Account Details Overview */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            ব্যক্তিগত তথ্য বিবরণী
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-slate-400" />
                <span className="text-xs sm:text-sm text-slate-400">নাম</span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-white">
                {user.name || "তথ্য নেই"}
              </span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-xs sm:text-sm text-slate-400">ইমেইল</span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-white">
                {user.email}
              </span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-xs sm:text-sm text-slate-400">মেম্বারশিপ</span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-emerald-400">
                বাজার দর সদস্য
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
          {/* Challenge C3: Update button navigating to /profile/update */}
          <Link
            href="/profile/update"
            className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>তথ্য আপডেট করুন</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-slate-950 hover:bg-rose-500/10 text-rose-400 border border-slate-800 hover:border-rose-500/30 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট</span>
          </button>
        </div>
      </div>
    </div>
  );
}
