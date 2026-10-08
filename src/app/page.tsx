"use client";

import React, { useEffect, useState, useMemo } from "react";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import ProductSkeleton from "./components/ProductSkeleton";
import SortDropdown from "./components/SortDropdown";
import { Category, Product, SortOption } from "@/types";
import { sortProducts, toBengaliNumber } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Layers,
  Search,
  Filter,
} from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Sorting state
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("default");

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [prodsRes, catsRes] = await Promise.all([
          fetch("https://api.api-store.workers.dev/api/bazardor/products")
            .then((r) => r.json())
            .catch(() =>
              fetch("https://api.abcz.workers.dev/api/bazardor/products").then((r) =>
                r.json()
              )
            ),
          fetch("https://api.api-store.workers.dev/api/bazardor/categories")
            .then((r) => r.json())
            .catch(() =>
              fetch("https://api.abcz.workers.dev/api/bazardor/categories").then((r) =>
                r.json()
              )
            ),
        ]);

        if (Array.isArray(prodsRes)) {
          setProducts(prodsRes);
        }
        if (Array.isArray(catsRes)) {
          setCategories(catsRes);
        }
      } catch (err) {
        console.error("Error loading products/categories:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // Section A: Top 6 Risers
  const topRisers = useMemo(() => {
    return products
      .filter((p) => p.change?.dir === "up")
      .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
      .slice(0, 6);
  }, [products]);

  // Section B: Top 6 Fallers
  const topFallers = useMemo(() => {
    return products
      .filter((p) => p.change?.dir === "down")
      .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
      .slice(0, 6);
  }, [products]);

  // Section C: Filtered & Sorted All Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.nameBn.toLowerCase().includes(q) ||
          p.categoryNameBn?.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      );
    }

    // Numeric sorting (Challenge C1)
    return sortProducts(list, sortOption);
  }, [products, selectedCategory, searchQuery, sortOption]);

  return (
    <div className="min-h-screen">
      {/* Hero / Banner Component */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
        {/* Section A — আজ দাম বেড়েছে ▲ */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <span>আজ দাম বেড়েছে</span>
                  <span className="text-emerald-400">▲</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  গতকালের তুলনায় আজকের বাজারে সর্বোচ্চ দাম বৃদ্ধি পাওয়া ৬টি পণ্য
                </p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <ProductSkeleton count={6} />
          ) : topRisers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {topRisers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl text-center text-slate-400">
              আজ কোনো পণ্যের দাম বাড়েনি।
            </div>
          )}
        </section>

        {/* Section B — আজ দাম কমেছে ▼ */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <span>আজ দাম কমেছে</span>
                  <span className="text-rose-400">▼</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  গতকালের তুলনায় আজকের বাজারে দাম কমে যাওয়া শীর্ষ ৬টি পণ্য
                </p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <ProductSkeleton count={6} />
          ) : topFallers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {topFallers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl text-center text-slate-400">
              আজ কোনো পণ্যের দাম কমেনি।
            </div>
          )}
        </section>

        {/* Section C — সব পণ্য with Search, Category Filter, and Sorting */}
        <section id="সব-পণ্য" className="scroll-mt-36">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                  সব পণ্য
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  বাংলাদেশের বাজারভিত্তিক সকল নিত্যপ্রয়োজনীয় পণ্যের পূর্ণাঙ্গ তালিকা
                </p>
              </div>
            </div>

            {/* Sort Dropdown */}
            <SortDropdown value={sortOption} onChange={setSortOption} />
          </div>

          {/* Search bar & Category filter tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="পণ্যের নাম লিখুন…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Clear Filter button if filtered */}
            {(selectedCategory !== "all" || searchQuery.trim()) && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="text-xs font-semibold px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors whitespace-nowrap"
              >
                ফিল্টার রিসেট করুন
              </button>
            )}
          </div>

          {/* Product count label from Figma */}
          <div className="flex items-center justify-between mb-4 text-xs sm:text-sm text-slate-400">
            <span>মোট {toBengaliNumber(filteredProducts.length)}টি পণ্য দেখানো হচ্ছে</span>
            {selectedCategory !== "all" && (
              <span className="text-emerald-400 font-medium">ক্যাটাগরি ফিল্টার সক্রিয়</span>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              🛒 সকল ক্যাটাগরি ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.slug
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <ProductSkeleton count={12} />
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-slate-800 p-12 rounded-2xl text-center space-y-3">
              <span className="text-4xl">🔍</span>
              <h3 className="text-lg font-bold text-white">কোনো পণ্য পাওয়া যায়নি</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                আপনার অনুসন্ধানের সাথে মিলে এমন কোনো পণ্য পাওয়া যায়নি। অনুগ্রহ করে অন্য নাম দিয়ে খুঁজুন অথবা ফিল্টার রিসেট করুন।
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>সব পণ্য দেখুন</span>
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
