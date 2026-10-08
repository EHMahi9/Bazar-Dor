"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { LogOut, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে আগে লগইন করুন।");
      router.push("/sign-in?callbackUrl=/profile");
    } else if (session?.user?.name) {
      setName(session.user.name);
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন");
      return;
    }

    setIsUpdating(true);
    setUpdateSuccess(false);

    try {
      const res = await authClient.updateUser({
        name: name.trim(),
      });

      if (res?.error) {
        toast.error(res.error.message || "তথ্য আপডেট করা সম্ভব হয়নি");
      } else {
        toast.success("নাম সফলভাবে আপডেট করা হয়েছে!");
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      }
    } catch {
      toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-500 text-sm">প্রোফাইল তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <div className="text-center space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
          আমার প্রোফাইল
        </h1>
        <p className="text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য ও সেটিংস দেখুন
        </p>
      </div>

      {/* Top User Info Card (Figma Style) */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4 text-center sm:text-left">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center text-2xl font-black shadow-sm shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}

          <div className="space-y-0.5">
            <h2 className="text-lg font-bold text-gray-900">
              {user.name || "নামহীন ব্যবহারকারী"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-mono">
              {user.email}
            </p>
          </div>
        </div>

        {/* Red outline Sign Out Button matching Figma */}
        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 hover:border-red-300 text-red-600 hover:bg-red-50 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>← সাইন আউট</span>
        </button>
      </div>

      {/* Bottom Information Card (Figma Style) */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
          তথ্য
        </h3>

        {updateSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>তথ্য সফলভাবে হালনাগাদ করা হয়েছে!</span>
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-xs font-semibold text-gray-700">
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-500">
              ইমেইল অ্যাড্রেস
            </label>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-sm active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isUpdating ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>আপডেট</span>
            )}
          </button>
        </form>
      </div>

      <div className="text-center pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}
