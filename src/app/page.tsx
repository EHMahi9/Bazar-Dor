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

import { fetchProducts, fetchCategories } from "@/lib/api";

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
          fetchProducts(),
          fetchCategories(),
        ]);

        if (Array.isArray(prodsRes) && prodsRes.length > 0) {
          setProducts(prodsRes);
        }
        if (Array.isArray(catsRes) && catsRes.length > 0) {
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
    <div className="min-h-screen bg-[#f4f6f8]">
      {/* Hero / Banner Component */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 sm:space-y-14">
        {/* Section A — আজ দাম বেড়েছে ▲ */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-gray-200/80 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-red-600 text-lg sm:text-xl font-bold">▲</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  আজ দাম বেড়েছে
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  গতকালের তুলনায় আজকের বাজারে সর্বোচ্চ দাম বৃদ্ধি পাওয়া ৬টি পণ্য
                </p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <ProductSkeleton count={6} />
          ) : topRisers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {topRisers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 p-8 rounded-2xl text-center text-gray-500 shadow-2xs">
              আজ কোনো পণ্যের দাম বাড়েনি।
            </div>
          )}
        </section>

        {/* Section B — আজ দাম কমেছে ▼ */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-gray-200/80 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-emerald-600 text-lg sm:text-xl font-bold">▼</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  আজ দাম কমেছে
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  গতকালের তুলনায় আজকের বাজারে দাম কমে যাওয়া শীর্ষ ৬টি পণ্য
                </p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <ProductSkeleton count={6} />
          ) : topFallers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {topFallers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 p-8 rounded-2xl text-center text-gray-500 shadow-2xs">
              আজ কোনো পণ্যের দাম কমেনি।
            </div>
          )}
        </section>

        {/* Section C — সব পণ্য with Search, Category Filter, and Sorting */}
        <section id="সব-পণ্য" className="scroll-mt-36">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 border-b border-gray-200/80 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center text-green-700">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">
                  সব পণ্য
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  বাংলাদেশের বাজারভিত্তিক সকল নিত্যপ্রয়োজনীয় পণ্যের পূর্ণাঙ্গ তালিকা
                </p>
              </div>
            </div>

            {/* Sort Dropdown */}
            <SortDropdown value={sortOption} onChange={setSortOption} />
          </div>

          {/* Search bar & Category filter tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="পণ্যের নাম লিখুন…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors shadow-2xs"
              />
            </div>

            {/* Clear Filter button if filtered */}
            {(selectedCategory !== "all" || searchQuery.trim()) && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="text-xs font-semibold px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors whitespace-nowrap"
              >
                ফিল্টার রিসেট করুন
              </button>
            )}
          </div>

          {/* Product count label from Figma */}
          <div className="flex items-center justify-between mb-4 text-xs sm:text-sm text-gray-500">
            <span>মোট {toBengaliNumber(filteredProducts.length)}টি পণ্য দেখানো হচ্ছে</span>
            {selectedCategory !== "all" && (
              <span className="text-green-600 font-medium">ক্যাটাগরি ফিল্টার সক্রিয়</span>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-green-600 text-white font-bold shadow-xs"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-2xs"
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
                    ? "bg-green-600 text-white font-bold shadow-xs"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-2xs"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 p-12 rounded-2xl text-center space-y-3 shadow-2xs">
              <span className="text-4xl">🔍</span>
              <h3 className="text-lg font-bold text-gray-900">কোনো পণ্য পাওয়া যায়নি</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                আপনার অনুসন্ধানের সাথে মিলে এমন কোনো পণ্য পাওয়া যায়নি। অনুগ্রহ করে অন্য নাম দিয়ে খুঁজুন অথবা ফিল্টার রিসেট করুন।
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-bold text-xs rounded-xl hover:bg-green-700 shadow-xs"
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
