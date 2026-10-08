"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Mail, Lock, ArrowRight, Eye, EyeOff, ArrowLeft } from "lucide-react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      const msg = "অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড প্রদান করুন";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);

    try {
      const res = await authClient.signIn.email({
        email: email.trim(),
        password: password.trim(),
      });

      if (res?.error) {
        const errorText = res.error.message || "ভুল ইমেইল অথবা পাসওয়ার্ড";
        setErrorMessage(errorText);
        toast.error(errorText);
        return;
      }

      toast.success("সফলভাবে লগইন হয়েছে! স্বাগতম।");
      router.push(callbackUrl);
      router.refresh();
    } catch (err: unknown) {
      const errObj = err as { message?: string };
      const msg = errObj?.message || "লগইন করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      setIsLoading(true);
      await authClient.signIn.social({
        provider,
        callbackURL: callbackUrl,
      });
    } catch {
      toast.error(`${provider} দিয়ে লগইন করতে সমস্যা হয়েছে। অনুগ্রহ করে ইমেইল দিয়ে চেষ্টা করুন।`);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-gray-200/90 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
      {/* Title & Header matching Figma */}
      <div className="text-center space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">সাইন ইন</h1>
        <p className="text-xs sm:text-sm text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Error alert inside form */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-medium">
          {errorMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSignIn} className="space-y-4">
        {/* Email field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-700" htmlFor="email">
            ইমেইল
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors shadow-2xs"
            />
          </div>
        </div>

        {/* Password field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-700" htmlFor="password">
            পাসওয়ার্ড
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button matching Figma */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm transition-all shadow-xs active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>সাইন ইন</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="border-t border-gray-200 w-full" />
        <span className="bg-white px-3 text-xs text-gray-400 font-semibold uppercase tracking-wider">
          অথবা
        </span>
        <div className="border-t border-gray-200 w-full" />
      </div>

      {/* Social Login Buttons matching Figma */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={() => handleSocialLogin("google")}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.98 0 12c0 2.02.45 3.84 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Google দিয়ে চালিয়ে যান</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin("github")}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs"
        >
          <svg className="w-4 h-4 fill-current text-gray-900" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>GitHub দিয়ে চালিয়ে যান</span>
        </button>
      </div>

      {/* Link to Sign Up */}
      <div className="text-center pt-2 text-xs sm:text-sm text-gray-500">
        <span>এখনও অ্যাকাউন্ট নেই? </span>
        <Link
          href="/sign-up"
          className="text-green-600 hover:text-green-700 font-bold transition-colors"
        >
          এখানে রেজিস্টার করুন
        </Link>
      </div>

      {/* Return to Home link */}
      <div className="text-center pt-1">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#f4f6f8]">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl p-8 text-center space-y-4 shadow-xs">
            <div className="w-10 h-10 border-3 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-500 text-sm">লোড হচ্ছে...</p>
          </div>
        }
      >
        <SignInForm />
      </Suspense>
    </div>
  );
}
