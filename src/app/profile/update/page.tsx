"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/../lib/auth-client";
import toast from "react-hot-toast";
import { User, ArrowLeft, Save, CheckCircle2 } from "lucide-react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isPending) {
      if (!session?.user) {
        toast.error("তথ্য পরিবর্তন করতে প্রথমে লগইন করুন।");
        router.push("/sign-in?callbackUrl=/profile/update");
      } else if (session.user.name) {
        setName(session.user.name);
      }
    }
  }, [isPending, session, router]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      const msg = "অনুগ্রহ করে আপনার নাম লিখুন";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);

    try {
      // BetterAuth updateUser API
      const res = await authClient.updateUser({
        name: name.trim(),
      });

      if (res?.error) {
        const errorText = res.error.message || "তথ্য আপডেট করা সম্ভব হয়নি";
        setErrorMessage(errorText);
        toast.error(errorText);
        setIsLoading(false);
        return;
      }

      toast.success("নাম সফলভাবে আপডেট করা হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch (err: unknown) {
      const errObj = err as { message?: string };
      const msg = errObj?.message || "তথ্য আপডেট করতে সমস্যা হয়েছে";
      setErrorMessage(msg);
      toast.error(msg);
      setIsLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-400 text-sm">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-6">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-7">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
            <User className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            প্রোফাইল তথ্য আপডেট
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করতে নিচের ফর্মটি ব্যবহার করুন
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs sm:text-sm font-medium">
            {errorMessage}
          </div>
        )}

        {/* Update Form */}
        <form onSubmit={handleUpdate} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300" htmlFor="name">
              আপনার পুরো নাম
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="name"
                name="name"
                type="text"
                placeholder="নতুন নাম লিখুন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              * প্ল্যাটফর্মে প্রদর্শিত আপনার ব্যবহারকারী নাম পরিবর্তিত হবে।
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-400">
              ইমেইল অ্যাড্রেস (পরিবর্তনযোগ্য নয়)
            </label>
            <input
              type="email"
              disabled
              value={session.user.email}
              className="w-full bg-slate-950/40 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>তথ্য আপডেট করুন</span>
                </>
              )}
            </button>

            <Link
              href="/profile"
              className="py-3.5 px-6 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-center font-semibold text-sm transition-all"
            >
              বাতিল করুন
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
