"use client";

import React, { use, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/../lib/auth-client";
import { Product } from "@/types";
import { formatUnit, toBengaliNumber } from "@/lib/utils";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Home,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Calendar,
  Layers,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();

  const { data: session, isPending: isAuthPending } = authClient.useSession();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDivision, setSelectedDivision] = useState<string>("all");
  const [hasNotified, setHasNotified] = useState(false);

  // Protected Route Check
  useEffect(() => {
    if (!isAuthPending && !session?.user && !hasNotified) {
      setHasNotified(true);
      toast.error("পণ্যের বিস্তারিত বাজার দর দেখতে অনুগ্রহ করে আগে লগইন করুন।");
      router.push(`/sign-in?callbackUrl=/product/${slug}`);
    }
  }, [isAuthPending, session, slug, router, hasNotified]);

  // Load product data
  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products")
          .then((r) => r.json())
          .catch(() =>
            fetch("https://api.abcz.workers.dev/api/bazardor/products").then((r) =>
              r.json()
            )
          );

        if (Array.isArray(res)) {
          const found = res.find(
            (p: Product) => p.slug === slug || p.id.toString() === slug
          );
          setProduct(found || null);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  // Calculations for market prices
  const priceStats = useMemo(() => {
    if (!product || !product.markets || product.markets.length === 0) {
      return {
        min: product?.today || 0,
        max: product?.today || 0,
        avg: product?.today || 0,
        divisions: [],
      };
    }

    const mins = product.markets.map((m) => m.min);
    const maxs = product.markets.map((m) => m.max);
    const min = Math.min(...mins);
    const max = Math.max(...maxs);

    const totalSum = product.markets.reduce(
      (acc, m) => acc + (m.min + m.max) / 2,
      0
    );
    const avg = Math.round(totalSum / product.markets.length);

    const divs = Array.from(new Set(product.markets.map((m) => m.division)));

    return { min, max, avg, divisions: divs };
  }, [product]);

  // Filtered markets by selected division
  const filteredMarkets = useMemo(() => {
    if (!product?.markets) return [];
    if (selectedDivision === "all") return product.markets;
    return product.markets.filter((m) => m.division === selectedDivision);
  }, [product, selectedDivision]);

  // If Auth check is loading or redirecting
  if (isAuthPending) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-400 text-sm">লগইন অবস্থা যাচাই করা হচ্ছে...</p>
      </div>
    );
  }

  // If not logged in, show access restricted guard
  if (!session?.user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Lock className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">লগইন প্রয়োজন</h2>
            <p className="text-sm text-slate-400">
              পণ্যের বাজারভিত্তিক বিস্তারিত দর এবং ঐতিহাসিক বিশ্লেষণ দেখতে অনুগ্রহ করে আপনার অ্যাকাউন্টে লগইন করুন।
            </p>
          </div>
          <div className="space-y-3">
            <Link
              href={`/sign-in?callbackUrl=/product/${slug}`}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20"
            >
              <span>লগইন করুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all"
            >
              <span>হোম পেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Product Loading skeleton
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
        <div className="h-6 w-32 bg-slate-800 rounded" />
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 h-64" />
        <div className="grid grid-cols-3 gap-4 h-32" />
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 h-80" />
      </div>
    );
  }

  // Product Not Found
  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-4xl">
            📦
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white">পণ্যটি পাওয়া যায়নি</h1>
            <p className="text-sm text-slate-400">
              আপনি যে পণ্যের তথ্য খুঁজছেন সেটি ডাটাবেজে খুঁজে পাওয়া যায়নি।
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
        <Link href="/" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজ</span>
        </Link>
        <span>/</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-emerald-400 transition-colors"
        >
          {product.categoryNameBn || product.category}
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold">{product.nameBn}</span>
      </div>

      {/* Top — Summary Header Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5 sm:gap-7">
            {/* Emoji Thumbnail */}
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-5xl sm:text-6xl shadow-inner shrink-0">
              {product.image || "📦"}
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/category/${product.category}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
                >
                  <span>{product.categoryIcon || "🏷️"}</span>
                  <span>{product.categoryNameBn || product.category}</span>
                </Link>
                <span className="text-xs text-slate-400 bg-slate-800/80 border border-slate-700/60 px-3 py-1 rounded-full font-medium">
                  একক: {formatUnit(product.unit)}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {product.nameBn}
              </h1>

              <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>আজকের বাজার বিশ্লেষণ ও পাইকারি-খুচরা মূল্যের সমন্বিত প্রতিবেদন</span>
              </p>
            </div>
          </div>

          {/* Current Day Price Big Display */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-5 sm:p-6 text-right shrink-0">
            <span className="text-xs text-slate-400 font-semibold block mb-1">
              আজকের নির্ধারিত গড় দর
            </span>
            <div className="flex items-baseline justify-end gap-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                {toBengaliNumber(product.today)}
              </span>
              <span className="text-base text-slate-300 font-bold">টাকা</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full">
              {isUp ? (
                <span className="text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>▲ {toBengaliNumber(product.change.pct)}% দাম বৃদ্ধি</span>
                </span>
              ) : isDown ? (
                <span className="text-rose-400 bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>▼ {toBengaliNumber(product.change.pct)}% দাম হ্রাস</span>
                </span>
              ) : (
                <span className="text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Minus className="w-3.5 h-3.5" />
                  <span>দর অপরিবর্তিত</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Price Summary (Minimum, Maximum, Average) */}
      <div>
        <h2 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2">
          <span>মূল্য সংক্ষিপ্তসার</span>
          <span className="text-xs text-slate-400 font-normal">
            (বাজারভিত্তিক আজকের সর্বনিম্ন, সর্বোচ্চ ও গড় দর)
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Minimum Price */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              সর্বনিম্ন দাম
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-teal-400 font-mono">
                {toBengaliNumber(priceStats.min)}
              </span>
              <span className="text-sm text-slate-300 font-bold">টাকা</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              সকল বাজারের মধ্যে আজকের সর্বনিম্ন কোটেশন
            </p>
          </div>

          {/* Average Price */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              গড় দাম
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {toBengaliNumber(priceStats.avg)}
              </span>
              <span className="text-sm text-slate-300 font-bold">টাকা</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              সকল বাজারের আজকের সম্মিলিত গড় মূল্য
            </p>
          </div>

          {/* Maximum Price */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              সর্বোচ্চ দাম
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {toBengaliNumber(priceStats.max)}
              </span>
              <span className="text-sm text-slate-300 font-bold">টাকা</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              সকল বাজারের মধ্যে আজকের সর্বোচ্চ কোটেশন
            </p>
          </div>
        </div>
      </div>

      {/* Historical Comparison */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>পূর্ববর্তী সময়ের দামের তুলনা</span>
        </h3>
        <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">গতকাল</span>
            <span className="text-base sm:text-xl font-bold text-white font-mono">
              {toBengaliNumber(product.yesterday)} টাকা
            </span>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">গত সপ্তাহ</span>
            <span className="text-base sm:text-xl font-bold text-white font-mono">
              {toBengaliNumber(product.lastWeek)} টাকা
            </span>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">গত মাস</span>
            <span className="text-base sm:text-xl font-bold text-white font-mono">
              {toBengaliNumber(product.lastMonth)} টাকা
            </span>
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                বাজারভিত্তিক আজকের দাম
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                বাংলাদেশের বিভিন্ন পাইকারি ও খুচরা বাজারের এলাকাভিত্তিক দর
              </p>
            </div>
          </div>

          {/* Division Filter Pills */}
          {priceStats.divisions.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedDivision("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDivision === "all"
                    ? "bg-emerald-500 text-slate-950 font-bold"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                সকল বিভাগ
              </button>
              {priceStats.divisions.map((div) => (
                <button
                  key={div}
                  onClick={() => setSelectedDivision(div)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedDivision === div
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {div}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Market Table / Grid */}
        {filteredMarkets.length > 0 ? (
          <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                  <th className="py-4 px-6">বাজারের নাম</th>
                  <th className="py-4 px-6">বিভাগ</th>
                  <th className="py-4 px-6 text-right">সর্বনিম্ন দাম</th>
                  <th className="py-4 px-6 text-right">সর্বোচ্চ দাম</th>
                  <th className="py-4 px-6 text-right">গড় দাম</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-sm">
                {filteredMarkets.map((m, idx) => {
                  const marketAvg = Math.round((m.min + m.max) / 2);
                  return (
                    <tr
                      key={idx}
                      className="hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                        <span className="text-emerald-400">📍</span>
                        <span>{m.market}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700/60">
                          {m.division}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-mono font-medium text-teal-400">
                        {toBengaliNumber(m.min)} টাকা
                      </td>
                      <td className="py-4 px-6 text-right font-mono font-medium text-amber-400">
                        {toBengaliNumber(m.max)} টাকা
                      </td>
                      <td className="py-4 px-6 text-right font-mono font-bold text-emerald-400">
                        {toBengaliNumber(marketAvg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center text-slate-400">
            এই বিভাগের জন্য কোনো বাজারের তথ্য পাওয়া যায়নি।
          </div>
        )}
      </section>
    </div>
  );
}
