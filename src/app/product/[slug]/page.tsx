"use client";

import React, { use, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
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
        minMarket: undefined,
        maxMarket: undefined,
      };
    }

    const mins = product.markets.map((m) => m.min);
    const maxs = product.markets.map((m) => m.max);
    const min = Math.min(...mins);
    const max = Math.max(...maxs);

    const minMarket = product.markets.find((m) => m.min === min);
    const maxMarket = product.markets.find((m) => m.max === max);

    const totalSum = product.markets.reduce(
      (acc, m) => acc + (m.min + m.max) / 2,
      0
    );
    const avg = Math.round(totalSum / product.markets.length);

    const divs = Array.from(new Set(product.markets.map((m) => m.division)));

    return { min, max, avg, divisions: divs, minMarket, maxMarket };
  }, [product]);

  // Filtered markets by selected division
  const filteredMarkets = useMemo(() => {
    if (!product?.markets) return [];
    if (selectedDivision === "all") return product.markets;
    return product.markets.filter((m) => m.division === selectedDivision);
  }, [product, selectedDivision]);

  // If Auth check is loading
  if (isAuthPending) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-500 text-sm">লগইন অবস্থা যাচাই করা হচ্ছে...</p>
      </div>
    );
  }

  // If not logged in, show access restricted guard
  if (!session?.user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-gray-200/90 rounded-2xl p-8 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-gray-900">লগইন প্রয়োজন</h2>
            <p className="text-xs sm:text-sm text-gray-500">
              পণ্যের বাজারভিত্তিক বিস্তারিত দর এবং ঐতিহাসিক বিশ্লেষণ দেখতে অনুগ্রহ করে আপনার অ্যাকাউন্টে লগইন করুন।
            </p>
          </div>
          <div className="space-y-2.5">
            <Link
              href={`/sign-in?callbackUrl=/product/${slug}`}
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-sm active:scale-98"
            >
              <span>লগইন করুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-6 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-xs transition-all border border-gray-200"
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
        <div className="h-5 w-48 bg-gray-200 rounded" />
        <div className="bg-white border border-gray-200 rounded-2xl p-8 h-56" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-28" />
        <div className="bg-white border border-gray-200 rounded-2xl p-8 h-72" />
      </div>
    );
  }

  // Product Not Found
  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 text-center space-y-5 shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-3xl">
            📦
          </div>
          <div className="space-y-1.5">
            <h1 className="text-xl font-bold text-gray-900">পণ্যটি পাওয়া যায়নি</h1>
            <p className="text-sm text-gray-500">
              আপনি যে পণ্যের তথ্য খুঁজছেন সেটি ডাটাবেজে খুঁজে পাওয়া যায়নি।
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-sm"
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600 flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>হোম পেজ</span>
        </Link>
        <span>/</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-emerald-600 transition-colors"
        >
          {product.categoryNameBn || product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">{product.nameBn}</span>
      </div>

      {/* Top — Summary Header Card */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5 sm:gap-6">
            {/* Emoji Thumbnail */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-5xl sm:text-6xl shadow-inner shrink-0">
              {product.image || "📦"}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/category/${product.category}`}
                  className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                >
                  <span>{product.categoryIcon || "🏷️"}</span>
                  <span>{product.categoryNameBn || product.category}</span>
                </Link>
                <span className="text-xs text-gray-500 bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded-full font-medium">
                  একক: {formatUnit(product.unit)}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {product.nameBn}
              </h1>

              <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>আজকের বাজার বিশ্লেষণ ও পাইকারি-খুচরা মূল্যের সমন্বিত প্রতিবেদন</span>
              </p>
            </div>
          </div>

          {/* Current Day Price Big Display */}
          <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-5 sm:p-6 text-right shrink-0">
            <span className="text-xs text-gray-500 font-medium block mb-1">
              আজকের নির্ধারিত গড় দর
            </span>
            <div className="flex items-baseline justify-end gap-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-600 font-mono">
                {toBengaliNumber(product.today)}
              </span>
              <span className="text-sm text-gray-700 font-bold">টাকা</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold">
              {isUp ? (
                <span className="text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>▲ {toBengaliNumber(product.change.pct)}% দাম বৃদ্ধি</span>
                </span>
              ) : isDown ? (
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>▼ {toBengaliNumber(product.change.pct)}% দাম হ্রাস</span>
                </span>
              ) : (
                <span className="text-gray-600 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
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
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
          <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
            <span>দামের সারসংক্ষেপ</span>
          </h2>
          <span className="text-xs text-gray-500">
            প্রতি {formatUnit(product.unit)}-এর হিসাবে
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Minimum Price */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              সর্বনিম্ন দাম
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-teal-600 font-mono">
                {toBengaliNumber(priceStats.min)}
              </span>
              <span className="text-xs text-gray-700 font-bold">টাকা</span>
            </div>
            <p className="text-xs text-gray-500 mt-2 truncate">
              সবচেয়ে কম দামের বাজার:{" "}
              <span className="text-teal-700 font-semibold">
                {priceStats.minMarket?.market || "নির্ধারিত বাজার"}
              </span>
            </p>
          </div>

          {/* Average Price */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              গড় দাম
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
                {toBengaliNumber(priceStats.avg)}
              </span>
              <span className="text-xs text-gray-700 font-bold">টাকা</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              সকল বাজারের আজকের সম্মিলিত গড় মূল্য
            </p>
          </div>

          {/* Maximum Price */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              সর্বোচ্চ দাম
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-amber-600 font-mono">
                {toBengaliNumber(priceStats.max)}
              </span>
              <span className="text-xs text-gray-700 font-bold">টাকা</span>
            </div>
            <p className="text-xs text-gray-500 mt-2 truncate">
              সবচেয়ে বেশি দামের বাজার:{" "}
              <span className="text-amber-700 font-semibold">
                {priceStats.maxMarket?.market || "নির্ধারিত বাজার"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Historical Comparison */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>পূর্ববর্তী সময়ের দামের তুলনা</span>
        </h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200/60">
            <span className="text-xs text-gray-500 block mb-1">গতকাল</span>
            <span className="text-base sm:text-lg font-bold text-gray-900 font-mono">
              {toBengaliNumber(product.yesterday)} টাকা
            </span>
          </div>
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200/60">
            <span className="text-xs text-gray-500 block mb-1">গত সপ্তাহ</span>
            <span className="text-base sm:text-lg font-bold text-gray-900 font-mono">
              {toBengaliNumber(product.lastWeek)} টাকা
            </span>
          </div>
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200/60">
            <span className="text-xs text-gray-500 block mb-1">গত মাস</span>
            <span className="text-base sm:text-lg font-bold text-gray-900 font-mono">
              {toBengaliNumber(product.lastMonth)} টাকা
            </span>
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gray-900">
                বাজারভিত্তিক আজকের দাম
              </h2>
              <p className="text-xs text-gray-500">
                বাংলাদেশের বিভিন্ন পাইকারি ও খুচরা বাজারের এলাকাভিত্তিক দর
              </p>
            </div>
          </div>

          {/* Division Filter Pills */}
          {priceStats.divisions.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedDivision("all")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDivision === "all"
                    ? "bg-emerald-600 text-white font-bold shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                সকল বিভাগ
              </button>
              {priceStats.divisions.map((div) => (
                <button
                  key={div}
                  onClick={() => setSelectedDivision(div)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedDivision === div
                      ? "bg-emerald-600 text-white font-bold shadow-sm"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {div}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Market Table */}
        {filteredMarkets.length > 0 ? (
          <div className="overflow-x-auto bg-white border border-gray-200/90 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-600 text-xs uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-5">বাজারের নাম</th>
                  <th className="py-3.5 px-5">বিভাগ</th>
                  <th className="py-3.5 px-5 text-right">সর্বনিম্ন দাম</th>
                  <th className="py-3.5 px-5 text-right">সর্বোচ্চ দাম</th>
                  <th className="py-3.5 px-5 text-right">গড় দাম</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredMarkets.map((m, idx) => {
                  const marketAvg = Math.round((m.min + m.max) / 2);
                  return (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="py-3.5 px-5 font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-emerald-600 text-xs">📍</span>
                        <span>{m.market}</span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                          {m.division}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right font-mono font-medium text-teal-600">
                        {toBengaliNumber(m.min)} টাকা
                      </td>
                      <td className="py-3.5 px-5 text-right font-mono font-medium text-amber-600">
                        {toBengaliNumber(m.max)} টাকা
                      </td>
                      <td className="py-3.5 px-5 text-right font-mono font-bold text-emerald-600">
                        {toBengaliNumber(marketAvg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 p-8 rounded-2xl text-center text-gray-500 shadow-sm">
            এই বিভাগের জন্য কোনো বাজারের তথ্য পাওয়া যায়নি।
          </div>
        )}
      </section>
    </div>
  );
}
