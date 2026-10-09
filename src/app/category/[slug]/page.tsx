"use client";

import React, { use, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import ProductSkeleton from "../../components/ProductSkeleton";
import SortDropdown from "../../components/SortDropdown";
import { Category, Product, SortOption } from "@/types";
import { sortProducts, toBengaliNumber } from "@/lib/utils";
import { ArrowLeft, Home } from "lucide-react";

import { fetchCategories, fetchProductsByCategory } from "@/lib/api";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>("default");

  useEffect(() => {
    async function loadCategoryData() {
      setIsLoading(true);
      try {
        const [catsRes, prodsRes] = await Promise.all([
          fetchCategories(),
          fetchProductsByCategory(slug),
        ]);

        if (Array.isArray(catsRes)) {
          const currentCat = catsRes.find((c: Category) => c.slug === slug);
          setCategory(currentCat || null);
        }

        if (Array.isArray(prodsRes)) {
          setProducts(prodsRes);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Failed to load category data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCategoryData();
  }, [slug]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return sortProducts(products, sortOption);
  }, [products, sortOption]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 flex items-center gap-4 animate-pulse">
          <div className="w-14 h-14 bg-gray-100 rounded-full" />
          <div className="space-y-2">
            <div className="w-40 h-7 bg-gray-200 rounded-lg" />
            <div className="w-56 h-4 bg-gray-100 rounded" />
          </div>
        </div>
        <ProductSkeleton count={6} />
      </div>
    );
  }

  // Empty state if invalid category or no products found
  if (!category && products.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 text-center space-y-5 shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl">
            ⚠️
          </div>
          <div className="space-y-1.5">
            <h1 className="text-xl font-bold text-gray-900">ক্যাটাগরি পাওয়া যায়নি</h1>
            <p className="text-sm text-gray-500">
              আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি বিদ্যমান নেই অথবা এতে কোনো পণ্য যুক্ত নেই।
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

  const categoryName = category?.nameBn || slug;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      {/* Category Header Card (Figma Style) */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-sm flex items-center gap-5">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl sm:text-4xl shadow-inner shrink-0">
          {category?.icon || "🏷️"}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            {categoryName}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            মোট {toBengaliNumber(products.length)} প্রকার {categoryName}-এর দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Filter / Sort Control Bar (Figma Style) */}
      <div className="bg-white border border-gray-200/90 rounded-2xl px-5 py-3.5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs sm:text-sm text-gray-500">
          মোট <span className="font-bold text-gray-800">{toBengaliNumber(products.length)}টি</span> পণ্য পাওয়া গেছে
        </p>

        {products.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">সাজান:</span>
            <SortDropdown value={sortOption} onChange={setSortOption} />
          </div>
        )}
      </div>

      {/* Product List Grid or Empty State */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center space-y-4 shadow-sm">
          <span className="text-4xl">🧺</span>
          <h3 className="text-lg font-bold text-gray-900">এই ক্যাটাগরিতে কোনো পণ্য নেই</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            বর্তমানে এই ক্যাটাগরিতে কোনো পণ্যের তালিকা পাওয়া যায়নি। অন্যান্য পণ্য দেখতে হোম পেজে যান।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      )}
    </div>
  );
}
