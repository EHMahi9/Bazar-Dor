"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Category, Product } from "@/types";
import { getBanglaTodayDate, toBengaliNumber } from "@/lib/utils";
import toast from "react-hot-toast";
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

const defaultCategories: Category[] = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [tickerProducts, setTickerProducts] = useState<Product[]>([]);
  const [todayDate, setTodayDate] = useState("");

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    setTodayDate(getBanglaTodayDate());

    // Fetch products for marquee ticker
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTickerProducts(data);
        }
      })
      .catch((err) => {
        console.error("Ticker fetch error:", err);
      });
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("সফলভাবে লগআউট হয়েছে!");
      setUserDropdownOpen(false);
      setMobileMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      toast.error("লগআউট করতে সমস্যা হয়েছে");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/90 shadow-xs">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Bangla Date */}
          <div className="flex flex-col justify-center">
            <Link
              href="/"
              className="flex items-center gap-2.5 group transition-transform active:scale-95"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-green-600 flex items-center justify-center text-white shadow-xs">
                <img
                  src="/logo-icon.png"
                  alt="বাজার দর"
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain invert brightness-0"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 group-hover:text-green-600 transition-colors">
                বাজার <span className="text-green-600">দর</span>
              </span>
            </Link>
            <span className="text-[11px] sm:text-xs text-gray-500 font-medium tracking-wide mt-0.5">
              📅 {todayDate || "৮ অক্টোবর, ২০২৬"}
            </span>
          </div>

          {/* Desktop Category Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                pathname === "/"
                  ? "bg-green-600 text-white shadow-xs"
                  : "text-gray-700 hover:text-green-600 hover:bg-gray-100/80"
              }`}
            >
              সব পণ্য
            </Link>
            {defaultCategories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-green-600 text-white font-bold shadow-xs"
                      : "text-gray-700 hover:text-green-600 hover:bg-gray-100/80"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side: Auth / Profile */}
          <div className="hidden sm:flex items-center gap-3">
            {isPending ? (
              <div className="w-24 h-9 bg-gray-200 animate-pulse rounded-lg" />
            ) : session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 transition-all text-sm font-medium focus:outline-none shadow-2xs"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 border border-green-200 text-green-700 flex items-center justify-center font-bold text-sm">
                    {session.user.name ? session.user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="max-w-[120px] truncate">{session.user.name || "ব্যবহারকারী"}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${userDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-400">লগইন করা হয়েছে</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">{session.user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>আমার প্রোফাইল</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>লগআউট</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-xl transition-all"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 text-sm font-bold bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all shadow-xs active:scale-95"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Second Row for Tablet/Medium screen category bar if hidden from main */}
      <div className="hidden md:flex lg:hidden overflow-x-auto border-t border-gray-100 bg-gray-50 px-4 py-2 gap-2 scrollbar-none">
        <Link
          href="/"
          className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
            pathname === "/"
              ? "bg-green-600 text-white shadow-xs"
              : "text-gray-700 hover:text-green-600"
          }`}
        >
          সব পণ্য
        </Link>
        {defaultCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs whitespace-nowrap font-medium ${
              pathname === `/category/${cat.slug}`
                ? "bg-green-600 text-white font-bold"
                : "text-gray-700 hover:text-green-600 hover:bg-gray-100"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.nameBn}</span>
          </Link>
        ))}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-4 max-h-[85vh] overflow-y-auto shadow-xl">
          {session?.user ? (
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">লগইন প্রোফাইল</p>
                <p className="font-semibold text-gray-900 text-sm">{session.user.name}</p>
                <p className="text-xs text-gray-500">{session.user.email}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-semibold"
                >
                  প্রোফাইল
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg text-xs font-semibold"
                >
                  লগআউট
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 pb-2">
              <Link
                href="/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 rounded-xl border border-gray-200 text-gray-800 font-semibold text-sm hover:bg-gray-50"
              >
                সাইন ইন
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 shadow-xs"
              >
                সাইন আপ
              </Link>
            </div>
          )}

          <div className="border-t border-gray-100 pt-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">ক্যাটাগরি সমূহ</p>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 p-2 rounded-lg text-sm font-medium ${
                  pathname === "/" ? "bg-green-50 text-green-700 font-bold" : "text-gray-700"
                }`}
              >
                🛒 সব পণ্য
              </Link>
              {defaultCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-2 rounded-lg text-sm font-medium ${
                    pathname === `/category/${cat.slug}`
                      ? "bg-green-50 text-green-700 font-bold"
                      : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Marquee Price Ticker Below Navbar */}
      <div className="w-full bg-gray-50/90 border-t border-gray-200/80 py-1.5 overflow-hidden select-none">
        <div className="flex items-center">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-0.5 bg-green-600 text-white font-bold text-xs uppercase tracking-wider rounded-r-md z-10 whitespace-nowrap shadow-xs">
            <span>লাইভ দর</span>
          </div>

          <div className="relative overflow-hidden w-full">
            <div className="animate-marquee flex items-center space-x-6 sm:space-x-8 text-xs sm:text-sm">
              {(tickerProducts.length > 0 ? tickerProducts : [
                { id: 1, nameBn: "স্বর্ণমাছি চাল", image: "🍚", today: 148, unit: "kg", change: { dir: "up", pct: 2.1 } },
                { id: 2, nameBn: "মশুর ডাল", image: "🫘", today: 135, unit: "kg", change: { dir: "down", pct: 1.5 } },
                { id: 3, nameBn: "সয়াবিন তেল", image: "🛢️", today: 175, unit: "litre", change: { dir: "flat", pct: 0.0 } },
                { id: 4, nameBn: "আলু", image: "🥔", today: 55, unit: "kg", change: { dir: "up", pct: 3.2 } },
                { id: 5, nameBn: "পেঁয়াজ দেশি", image: "🧅", today: 110, unit: "kg", change: { dir: "down", pct: 4.1 } },
                { id: 6, nameBn: "ইলিশ মাছ", image: "🐟", today: 1450, unit: "kg", change: { dir: "up", pct: 5.0 } },
              ] as unknown as Product[]).concat(tickerProducts.slice(0, 10)).map((item, idx) => {
                const isUp = item.change?.dir === "up";
                const isDown = item.change?.dir === "down";
                const unitBn = item.unit === "kg" ? "কেজি" : item.unit === "litre" ? "লিটার" : item.unit;

                return (
                  <Link
                    key={`${item.id}-${idx}`}
                    href={`/product/${item.slug || item.id}`}
                    className="inline-flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer whitespace-nowrap px-2 py-0.5 rounded hover:bg-gray-100"
                  >
                    <span>{item.image || "📦"}</span>
                    <span className="font-semibold text-gray-800">{item.nameBn}</span>
                    <span className="text-gray-900 font-semibold font-mono">
                      {toBengaliNumber(item.today)} টাকা/{unitBn}
                    </span>
                    <span
                      className={`inline-flex items-center text-xs font-bold px-1.5 py-0.5 rounded ${
                        isUp
                          ? "text-red-600 bg-red-50 border border-red-200/60"
                          : isDown
                          ? "text-emerald-700 bg-emerald-50 border border-emerald-200/60"
                          : "text-gray-600 bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {isUp ? (
                        <>
                          <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                          ▲ {toBengaliNumber(item.change.pct)}%
                        </>
                      ) : isDown ? (
                        <>
                          <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                          ▼ {toBengaliNumber(item.change.pct)}%
                        </>
                      ) : (
                        <>
                          <Minus className="w-3 h-3 mr-0.5 inline" />
                          —০.০%
                        </>
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
