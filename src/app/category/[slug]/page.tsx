"use client";

import React, { use, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import ProductSkeleton from "../../components/ProductSkeleton";
import SortDropdown from "../../components/SortDropdown";
import { Category, Product, SortOption } from "@/types";
import { sortProducts } from "@/lib/utils";
import { ArrowLeft, Home } from "lucide-react";

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
        // Fetch categories to get title and icon
        const catsRes = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories"
        )
          .then((r) => r.json())
          .catch(() =>
            fetch("https://api.abcz.workers.dev/api/bazardor/categories").then((r) =>
              r.json()
            )
          );

        if (Array.isArray(catsRes)) {
          const currentCat = catsRes.find((c: Category) => c.slug === slug);
          setCategory(currentCat || null);
        }

        // Fetch products by category
        const prodsRes = await fetch(
          `https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`
        )
          .then((r) => r.json())
          .catch(() =>
            fetch(
              `https://api.abcz.workers.dev/api/bazardor/products?category=${slug}`
            ).then((r) => r.json())
          );

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
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-800 rounded-2xl animate-pulse" />
          <div className="space-y-2">
            <div className="w-48 h-8 bg-slate-800 rounded-lg animate-pulse" />
            <div className="w-32 h-4 bg-slate-800 rounded animate-pulse" />
          </div>
        </div>
        <ProductSkeleton count={8} />
      </div>
    );
  }

  // Empty state if invalid category or no products found
  if (!category && products.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-4xl">
            ⚠️
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white">ক্যাটাগরি পাওয়া যায়নি</h1>
            <p className="text-sm text-slate-400">
              আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি বিদ্যমান নেই অথবা এতে কোনো পণ্য যুক্ত নেই।
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
        <Link href="/" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজ</span>
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold">
          {category?.nameBn || slug}
        </span>
      </div>

      {/* Category Header with Title, Icon & Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
            {category?.icon || "🏷️"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {category?.nameBn || slug}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              মোট {products.length} টি পণ্যের আজকের বাজার মূল্য তালিকা
            </p>
          </div>
        </div>

        {/* Sort control */}
        {products.length > 0 && (
          <SortDropdown value={sortOption} onChange={setSortOption} />
        )}
      </div>

      {/* Product List Grid or Empty State */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center space-y-4">
          <span className="text-4xl">🧺</span>
          <h3 className="text-xl font-bold text-white">এই ক্যাটাগরিতে কোনো পণ্য নেই</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            বর্তমানে এই ক্যাটাগরিতে কোনো পণ্যের তালিকা পাওয়া যায়নি। অন্যান্য পণ্য দেখতে হোম পেজে যান।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl text-sm"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      )}
    </div>
  );
}
