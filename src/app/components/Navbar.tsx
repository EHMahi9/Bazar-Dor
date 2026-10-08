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
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Bangla Date */}
          <div className="flex flex-col justify-center">
            <Link
              href="/"
              className="flex items-center gap-2.5 group transition-transform active:scale-95"
            >
              <img
                src="/logo-icon.png"
                alt="বাজার দর"
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                বাজার <span className="text-emerald-400">দর</span>
              </span>
            </Link>
            <span className="text-[11px] sm:text-xs text-emerald-400/90 font-medium tracking-wide mt-0.5">
              📅 {todayDate || "৮ অক্টোবর, ২০২৬"}
            </span>
          </div>

          {/* Desktop Category Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                pathname === "/"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
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
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-sm shadow-emerald-500/30"
                      : "text-slate-300 hover:text-emerald-400 hover:bg-slate-900/80"
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
              <div className="w-24 h-9 bg-slate-800 animate-pulse rounded-lg" />
            ) : session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-white transition-all text-sm font-medium focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-sm">
                    {session.user.name ? session.user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="max-w-[120px] truncate">{session.user.name || "ব্যবহারকারী"}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${userDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-xs text-slate-400">লগইন করা হয়েছে</p>
                      <p className="text-sm font-semibold text-white truncate">{session.user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:text-emerald-400 hover:bg-slate-800/80 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>আমার প্রোফাইল</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
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
                  className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-emerald-400 hover:bg-slate-900 rounded-xl transition-all border border-transparent hover:border-slate-800"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition-all shadow-md shadow-emerald-500/20 active:scale-95"
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
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Second Row for Tablet/Medium screen category bar if hidden from main */}
      <div className="hidden md:flex lg:hidden overflow-x-auto border-t border-slate-900 bg-slate-950/90 px-4 py-2 gap-2 scrollbar-none">
        <Link
          href="/"
          className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
            pathname === "/"
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "text-slate-400 hover:text-white"
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
                ? "bg-emerald-500 text-slate-950 font-bold"
                : "text-slate-300 hover:text-emerald-400 hover:bg-slate-900"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.nameBn}</span>
          </Link>
        ))}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950/98 border-t border-slate-800 px-4 py-4 space-y-4 max-h-[85vh] overflow-y-auto">
          {session?.user ? (
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">লগইন প্রোফাইল</p>
                <p className="font-semibold text-white text-sm">{session.user.name}</p>
                <p className="text-xs text-slate-400">{session.user.email}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-semibold"
                >
                  প্রোফাইল
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 bg-rose-500/20 text-rose-400 rounded-lg text-xs font-semibold"
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
                className="text-center py-2.5 rounded-xl border border-slate-700 text-white font-medium text-sm"
              >
                সাইন ইন
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm"
              >
                সাইন আপ
              </Link>
            </div>
          )}

          <div className="border-t border-slate-800/80 pt-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">ক্যাটাগরি সমূহ</p>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 p-2 rounded-lg text-sm font-medium ${
                  pathname === "/" ? "bg-emerald-500/20 text-emerald-400 font-bold" : "text-slate-300"
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
                      ? "bg-emerald-500/20 text-emerald-400 font-bold"
                      : "text-slate-300 hover:text-white"
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
      <div className="w-full bg-slate-900/90 border-t border-slate-800/80 py-1.5 overflow-hidden select-none">
        <div className="flex items-center">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-0.5 bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-r-md z-10 whitespace-nowrap shadow-md">
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
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap px-2 py-0.5 rounded hover:bg-slate-800/60"
                  >
                    <span>{item.image || "📦"}</span>
                    <span className="font-semibold text-slate-200">{item.nameBn}</span>
                    <span className="text-white font-mono font-medium">
                      {toBengaliNumber(item.today)} টাকা/{unitBn}
                    </span>
                    <span
                      className={`inline-flex items-center text-xs font-bold px-1.5 py-0.2 rounded ${
                        isUp
                          ? "text-emerald-400 bg-emerald-500/10"
                          : isDown
                          ? "text-rose-400 bg-rose-500/10"
                          : "text-slate-400 bg-slate-800"
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
