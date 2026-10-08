"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";

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
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-500 text-sm">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-6">
      <div>
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-1.5 border-b border-gray-100 pb-4">
          <h1 className="text-2xl font-black text-gray-900">
            প্রোফাইল তথ্য আপডেট
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করতে নিচের ফর্মটি ব্যবহার করুন
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700" htmlFor="name">
              আপনার পুরো নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="নতুন নাম লিখুন"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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
              value={session.user.email}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-sm active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>তথ্য আপডেট করুন</span>
                </>
              )}
            </button>

            <Link
              href="/profile"
              className="py-3 px-6 rounded-xl bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-center font-semibold text-sm transition-all"
            >
              বাতিল করুন
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
