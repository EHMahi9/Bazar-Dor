import { Category, Product } from "@/types";

export const PRIMARY_API_URL = "https://openapi.programming-hero.com/api/bazardor";
export const BASE_URL_1 = "https://openapi.programming-hero.com/api/bazardor";
export const BASE_URL_OLD_1 = "https://api.api-store.workers.dev/api/bazardor";
export const BASE_URL_OLD_2 = "https://api.abcz.workers.dev/api/bazardor";

export const FALLBACK_CATEGORIES: Category[] = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

export const FALLBACK_PRODUCTS: Product[] = [
  // চাল (Category: chal)
  {
    id: 1,
    slug: "shwarnamachi-chal",
    nameBn: "স্বর্ণমাছি চাল",
    category: "chal",
    categoryNameBn: "চাল",
    categoryIcon: "🍚",
    unit: "kg",
    image: "🍚",
    today: 148,
    yesterday: 145,
    lastWeek: 140,
    lastMonth: 135,
    change: { dir: "up", pct: 2.1 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 145, max: 152 },
      { market: "শ্যামবাজার", division: "ঢাকা", min: 142, max: 148 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 146, max: 155 },
      { market: "খাতুনগঞ্জ", division: "চট্টগ্রাম", min: 144, max: 150 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 140, max: 146 },
      { market: "আম্বরখানা", division: "সিলেট", min: 147, max: 154 },
      { market: "শিববাড়ি মোড়", division: "খুলনা", min: 143, max: 149 },
      { market: "চকবাজার", division: "বরিশাল", min: 145, max: 150 },
      { market: "নতুন বাজার", division: "ময়মনসিংহ", min: 142, max: 147 },
      { market: "রংপুর সদর", division: "রংপুর", min: 140, max: 145 },
    ],
  },
  {
    id: 2,
    slug: "miniket-chal",
    nameBn: "মিনিকেট চাল",
    category: "chal",
    categoryNameBn: "চাল",
    categoryIcon: "🍚",
    unit: "kg",
    image: "🍚",
    today: 66,
    yesterday: 67,
    lastWeek: 68,
    lastMonth: 70,
    change: { dir: "down", pct: 1.5 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 64, max: 68 },
      { market: "শ্যামবাজার", division: "ঢাকা", min: 63, max: 67 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 65, max: 70 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 62, max: 65 },
      { market: "আম্বরখানা", division: "সিলেট", min: 66, max: 70 },
      { market: "শিববাড়ি মোড়", division: "খুলনা", min: 63, max: 67 },
      { market: "চকবাজার", division: "বরিশাল", min: 64, max: 68 },
    ],
  },
  {
    id: 3,
    slug: "nazirshail-chal",
    nameBn: "নাজিরশাইল চাল",
    category: "chal",
    categoryNameBn: "চাল",
    categoryIcon: "🍚",
    unit: "kg",
    image: "🍚",
    today: 74,
    yesterday: 74,
    lastWeek: 72,
    lastMonth: 75,
    change: { dir: "flat", pct: 0.0 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 72, max: 76 },
      { market: "শ্যামবাজার", division: "ঢাকা", min: 70, max: 75 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 73, max: 78 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 70, max: 74 },
      { market: "আম্বরখানা", division: "সিলেট", min: 74, max: 78 },
    ],
  },
  {
    id: 4,
    slug: "basmati-chal",
    nameBn: "বাসমতি চাল",
    category: "chal",
    categoryNameBn: "চাল",
    categoryIcon: "🍚",
    unit: "kg",
    image: "🍚",
    today: 96,
    yesterday: 93,
    lastWeek: 90,
    lastMonth: 88,
    change: { dir: "up", pct: 3.2 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 94, max: 100 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 95, max: 102 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 92, max: 98 },
      { market: "আম্বরখানা", division: "সিলেট", min: 95, max: 100 },
    ],
  },

  // শাকসবজি (Category: sobji)
  {
    id: 5,
    slug: "peyaj-deshi",
    nameBn: "দেশি পেঁয়াজ",
    category: "sobji",
    categoryNameBn: "সবজি",
    categoryIcon: "🥬",
    unit: "kg",
    image: "🧅",
    today: 54,
    yesterday: 46,
    lastWeek: 42,
    lastMonth: 40,
    change: { dir: "up", pct: 15.6 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 52, max: 58 },
      { market: "শ্যামবাজার", division: "ঢাকা", min: 50, max: 55 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 53, max: 60 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 48, max: 54 },
      { market: "আম্বরখানা", division: "সিলেট", min: 54, max: 60 },
      { market: "শিববাড়ি মোড়", division: "খুলনা", min: 50, max: 56 },
    ],
  },
  {
    id: 6,
    slug: "ada",
    nameBn: "আদা",
    category: "sobji",
    categoryNameBn: "সবজি",
    categoryIcon: "🥬",
    unit: "kg",
    image: "🫚",
    today: 85,
    yesterday: 78,
    lastWeek: 75,
    lastMonth: 70,
    change: { dir: "up", pct: 9.3 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 82, max: 90 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 84, max: 92 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 80, max: 86 },
      { market: "আম্বরখানা", division: "সিলেট", min: 85, max: 90 },
    ],
  },
  {
    id: 7,
    slug: "begun",
    nameBn: "বেগুন",
    category: "sobji",
    categoryNameBn: "সবজি",
    categoryIcon: "🥬",
    unit: "kg",
    image: "🍆",
    today: 44,
    yesterday: 43,
    lastWeek: 40,
    lastMonth: 38,
    change: { dir: "up", pct: 1.1 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 40, max: 48 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 42, max: 50 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 38, max: 45 },
      { market: "নতুন বাজার", division: "ময়মনসিংহ", min: 40, max: 46 },
    ],
  },
  {
    id: 8,
    slug: "kachamorich",
    nameBn: "কাঁচামরিচ",
    category: "sobji",
    categoryNameBn: "সবজি",
    categoryIcon: "🥬",
    unit: "kg",
    image: "🌶️",
    today: 92,
    yesterday: 105,
    lastWeek: 120,
    lastMonth: 150,
    change: { dir: "down", pct: 12.3 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 88, max: 98 },
      { market: "শ্যামবাজার", division: "ঢাকা", min: 85, max: 95 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 90, max: 102 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 82, max: 92 },
      { market: "আম্বরখানা", division: "সিলেট", min: 92, max: 100 },
    ],
  },
  {
    id: 9,
    slug: "roshun",
    nameBn: "রসুন",
    category: "sobji",
    categoryNameBn: "সবজি",
    categoryIcon: "🥬",
    unit: "kg",
    image: "🧄",
    today: 130,
    yesterday: 140,
    lastWeek: 150,
    lastMonth: 160,
    change: { dir: "down", pct: 7.1 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 125, max: 136 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 128, max: 138 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 120, max: 130 },
      { market: "চকবাজার", division: "বরিশাল", min: 125, max: 135 },
    ],
  },
  {
    id: 10,
    slug: "alu",
    nameBn: "আলু",
    category: "sobji",
    categoryNameBn: "সবজি",
    categoryIcon: "🥬",
    unit: "kg",
    image: "🥔",
    today: 35,
    yesterday: 37,
    lastWeek: 40,
    lastMonth: 42,
    change: { dir: "down", pct: 5.4 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 32, max: 38 },
      { market: "শ্যামবাজার", division: "ঢাকা", min: 30, max: 35 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 34, max: 40 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 28, max: 34 },
      { market: "রংপুর সদর", division: "রংপুর", min: 26, max: 32 },
    ],
  },
  {
    id: 11,
    slug: "tomato",
    nameBn: "টমেটো",
    category: "sobji",
    categoryNameBn: "সবজি",
    categoryIcon: "🥬",
    unit: "kg",
    image: "🍅",
    today: 60,
    yesterday: 65,
    lastWeek: 70,
    lastMonth: 80,
    change: { dir: "down", pct: 7.7 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 55, max: 65 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 58, max: 68 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 50, max: 60 },
    ],
  },

  // মাছ (Category: mach)
  {
    id: 12,
    slug: "rui-mach",
    nameBn: "রুই মাছ",
    category: "mach",
    categoryNameBn: "মাছ",
    categoryIcon: "🐟",
    unit: "kg",
    image: "🐟",
    today: 340,
    yesterday: 327,
    lastWeek: 310,
    lastMonth: 300,
    change: { dir: "up", pct: 4.0 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 330, max: 360 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 340, max: 370 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 310, max: 340 },
      { market: "আম্বরখানা", division: "সিলেট", min: 340, max: 380 },
      { market: "শিববাড়ি মোড়", division: "খুলনা", min: 320, max: 350 },
    ],
  },
  {
    id: 13,
    slug: "ilish-mach",
    nameBn: "ইলিশ মাছ",
    category: "mach",
    categoryNameBn: "মাছ",
    categoryIcon: "🐟",
    unit: "kg",
    image: "🐟",
    today: 1450,
    yesterday: 1380,
    lastWeek: 1350,
    lastMonth: 1300,
    change: { dir: "up", pct: 5.0 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 1400, max: 1550 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 1350, max: 1500 },
      { market: "আম্বরখানা", division: "সিলেট", min: 1450, max: 1600 },
      { market: "চকবাজার", division: "বরিশাল", min: 1250, max: 1400 },
    ],
  },
  {
    id: 14,
    slug: "katol-mach",
    nameBn: "কাতল মাছ",
    category: "mach",
    categoryNameBn: "মাছ",
    categoryIcon: "🐟",
    unit: "kg",
    image: "🐟",
    today: 380,
    yesterday: 390,
    lastWeek: 400,
    lastMonth: 390,
    change: { dir: "down", pct: 2.6 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 360, max: 400 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 370, max: 410 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 340, max: 380 },
    ],
  },
  {
    id: 15,
    slug: "pangas-mach",
    nameBn: "পাঙ্গাস মাছ",
    category: "mach",
    categoryNameBn: "মাছ",
    categoryIcon: "🐟",
    unit: "kg",
    image: "🐟",
    today: 190,
    yesterday: 200,
    lastWeek: 210,
    lastMonth: 200,
    change: { dir: "down", pct: 5.0 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 180, max: 200 },
      { market: "শ্যামবাজার", division: "ঢাকা", min: 175, max: 195 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 185, max: 210 },
      { market: "চকবাজার", division: "বরিশাল", min: 180, max: 200 },
    ],
  },

  // ডিম ও দুধ (Category: dim-dui)
  {
    id: 16,
    slug: "dim-farm",
    nameBn: "ডিম (ফার্মের মুরগি)",
    category: "dim-dui",
    categoryNameBn: "ডিম-দুধ",
    categoryIcon: "🥛",
    unit: "dozen",
    image: "🥚",
    today: 124,
    yesterday: 118,
    lastWeek: 115,
    lastMonth: 110,
    change: { dir: "up", pct: 4.7 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 120, max: 128 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 122, max: 130 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 116, max: 124 },
      { market: "আম্বরখানা", division: "সিলেট", min: 124, max: 132 },
    ],
  },
  {
    id: 17,
    slug: "makhon",
    nameBn: "মাখন (১০০ গ্রাম)",
    category: "dim-dui",
    categoryNameBn: "ডিম-দুধ",
    categoryIcon: "🥛",
    unit: "piece",
    image: "🧈",
    today: 145,
    yesterday: 139,
    lastWeek: 135,
    lastMonth: 130,
    change: { dir: "up", pct: 4.4 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 140, max: 150 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 142, max: 152 },
      { market: "আম্বরখানা", division: "সিলেট", min: 144, max: 155 },
    ],
  },
  {
    id: 18,
    slug: "gorur-dudh",
    nameBn: "তরল গরুর দুধ",
    category: "dim-dui",
    categoryNameBn: "ডিম-দুধ",
    categoryIcon: "🥛",
    unit: "litre",
    image: "🥛",
    today: 90,
    yesterday: 90,
    lastWeek: 85,
    lastMonth: 85,
    change: { dir: "flat", pct: 0.0 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 85, max: 95 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 88, max: 96 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 80, max: 90 },
    ],
  },

  // তেল (Category: tel)
  {
    id: 19,
    slug: "soyabean-tel",
    nameBn: "সয়াবিন তেল",
    category: "tel",
    categoryNameBn: "তেল",
    categoryIcon: "🛢️",
    unit: "litre",
    image: "🛢️",
    today: 175,
    yesterday: 175,
    lastWeek: 170,
    lastMonth: 170,
    change: { dir: "flat", pct: 0.0 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 170, max: 180 },
      { market: "খাতুনগঞ্জ", division: "চট্টগ্রাম", min: 168, max: 176 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 172, max: 178 },
      { market: "আম্বরখানা", division: "সিলেট", min: 174, max: 182 },
    ],
  },
  {
    id: 20,
    slug: "shorisha-tel",
    nameBn: "সরিষার তেল",
    category: "tel",
    categoryNameBn: "তেল",
    categoryIcon: "🛢️",
    unit: "litre",
    image: "🛢️",
    today: 260,
    yesterday: 250,
    lastWeek: 245,
    lastMonth: 240,
    change: { dir: "up", pct: 4.0 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 250, max: 270 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 255, max: 275 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 240, max: 260 },
    ],
  },
  {
    id: 21,
    slug: "palm-oil",
    nameBn: "পাম অয়েল",
    category: "tel",
    categoryNameBn: "তেল",
    categoryIcon: "🛢️",
    unit: "litre",
    image: "🛢️",
    today: 140,
    yesterday: 143,
    lastWeek: 145,
    lastMonth: 150,
    change: { dir: "down", pct: 2.1 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 136, max: 144 },
      { market: "খাতুনগঞ্জ", division: "চট্টগ্রাম", min: 135, max: 142 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 138, max: 145 },
    ],
  },

  // ডাল (Category: dal)
  {
    id: 22,
    slug: "moshur-dal",
    nameBn: "মশুর ডাল",
    category: "dal",
    categoryNameBn: "ডাল",
    categoryIcon: "🫘",
    unit: "kg",
    image: "🫘",
    today: 135,
    yesterday: 137,
    lastWeek: 140,
    lastMonth: 138,
    change: { dir: "down", pct: 1.5 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 130, max: 140 },
      { market: "খাতুনগঞ্জ", division: "চট্টগ্রাম", min: 128, max: 138 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 130, max: 136 },
      { market: "আম্বরখানা", division: "সিলেট", min: 134, max: 142 },
    ],
  },
  {
    id: 23,
    slug: "mug-dal",
    nameBn: "মুগ ডাল",
    category: "dal",
    categoryNameBn: "ডাল",
    categoryIcon: "🫘",
    unit: "kg",
    image: "🫘",
    today: 160,
    yesterday: 155,
    lastWeek: 150,
    lastMonth: 150,
    change: { dir: "up", pct: 3.2 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 155, max: 168 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 158, max: 170 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 150, max: 162 },
    ],
  },
  {
    id: 24,
    slug: "chola-dal",
    nameBn: "ছোলা ডাল",
    category: "dal",
    categoryNameBn: "ডাল",
    categoryIcon: "🫘",
    unit: "kg",
    image: "🫘",
    today: 105,
    yesterday: 105,
    lastWeek: 102,
    lastMonth: 100,
    change: { dir: "flat", pct: 0.0 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 100, max: 110 },
      { market: "খাতুনগঞ্জ", division: "চট্টগ্রাম", min: 98, max: 108 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 100, max: 106 },
    ],
  },

  // মাংস (Category: mangsho)
  {
    id: 25,
    slug: "gorur-mangsho",
    nameBn: "গরুর মাংস",
    category: "mangsho",
    categoryNameBn: "মাংস",
    categoryIcon: "🍗",
    unit: "kg",
    image: "🥩",
    today: 750,
    yesterday: 750,
    lastWeek: 750,
    lastMonth: 720,
    change: { dir: "flat", pct: 0.0 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 730, max: 780 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 740, max: 790 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 700, max: 750 },
      { market: "আম্বরখানা", division: "সিলেট", min: 750, max: 800 },
    ],
  },
  {
    id: 26,
    slug: "khashir-mangsho",
    nameBn: "খাসির মাংস",
    category: "mangsho",
    categoryNameBn: "মাংস",
    categoryIcon: "🍗",
    unit: "kg",
    image: "🥩",
    today: 1100,
    yesterday: 1050,
    lastWeek: 1050,
    lastMonth: 1000,
    change: { dir: "up", pct: 4.8 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 1080, max: 1150 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 1100, max: 1180 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 1050, max: 1120 },
    ],
  },
  {
    id: 27,
    slug: "broiler-murgi",
    nameBn: "ব্রয়লার মুরগি",
    category: "mangsho",
    categoryNameBn: "মাংস",
    categoryIcon: "🍗",
    unit: "kg",
    image: "🍗",
    today: 185,
    yesterday: 195,
    lastWeek: 200,
    lastMonth: 210,
    change: { dir: "down", pct: 5.1 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 180, max: 195 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 182, max: 198 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 175, max: 188 },
      { market: "চকবাজার", division: "বরিশাল", min: 180, max: 192 },
    ],
  },
  {
    id: 28,
    slug: "deshi-murgi",
    nameBn: "দেশি মুরগি",
    category: "mangsho",
    categoryNameBn: "মাংস",
    categoryIcon: "🍗",
    unit: "kg",
    image: "🍗",
    today: 480,
    yesterday: 460,
    lastWeek: 450,
    lastMonth: 440,
    change: { dir: "up", pct: 4.3 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 460, max: 500 },
      { market: "কাজীর দেউড়ি", division: "চট্টগ্রাম", min: 470, max: 510 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 440, max: 480 },
    ],
  },

  // মসলা (Category: mosla)
  {
    id: 29,
    slug: "shukna-morich",
    nameBn: "শুকনা মরিচ",
    category: "mosla",
    categoryNameBn: "মসলা",
    categoryIcon: "🌶️",
    unit: "kg",
    image: "🌶️",
    today: 380,
    yesterday: 390,
    lastWeek: 400,
    lastMonth: 420,
    change: { dir: "down", pct: 2.6 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 360, max: 400 },
      { market: "খাতুনগঞ্জ", division: "চট্টগ্রাম", min: 350, max: 390 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 360, max: 395 },
    ],
  },
  {
    id: 30,
    slug: "jira",
    nameBn: "জিরা",
    category: "mosla",
    categoryNameBn: "মসলা",
    categoryIcon: "🌶️",
    unit: "kg",
    image: "🌿",
    today: 750,
    yesterday: 720,
    lastWeek: 700,
    lastMonth: 680,
    change: { dir: "up", pct: 4.2 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 720, max: 780 },
      { market: "খাতুনগঞ্জ", division: "চট্টগ্রাম", min: 710, max: 760 },
      { market: "আম্বরখানা", division: "সিলেট", min: 740, max: 800 },
    ],
  },
  {
    id: 31,
    slug: "daruchini",
    nameBn: "দারুচিনি",
    category: "mosla",
    categoryNameBn: "মসলা",
    categoryIcon: "🌶️",
    unit: "kg",
    image: "🪵",
    today: 520,
    yesterday: 540,
    lastWeek: 550,
    lastMonth: 560,
    change: { dir: "down", pct: 3.7 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 500, max: 540 },
      { market: "খাতুনগঞ্জ", division: "চট্টগ্রাম", min: 490, max: 530 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 510, max: 550 },
    ],
  },
  {
    id: 32,
    slug: "holud-gura",
    nameBn: "হলুদ গুঁড়া",
    category: "mosla",
    categoryNameBn: "মসলা",
    categoryIcon: "🌶️",
    unit: "kg",
    image: "🧂",
    today: 320,
    yesterday: 320,
    lastWeek: 315,
    lastMonth: 310,
    change: { dir: "flat", pct: 0.0 },
    markets: [
      { market: "কারওয়ান বাজার", division: "ঢাকা", min: 310, max: 335 },
      { market: "খাতুনগঞ্জ", division: "চট্টগ্রাম", min: 300, max: 330 },
      { market: "সাহেব বাজার", division: "রাজশাহী", min: 305, max: 325 },
    ],
  },
];

/**
 * Robust JSON fetcher with timeout and status code check.
 * Strictly tries BASE_URL_1 first, then BASE_URL_2.
 * If both fail / return rate limit HTML error, gracefully returns fallback.
 */
async function safeFetchJson<T>(endpoint: string, fallback: T): Promise<T> {
  const baseUrls = [PRIMARY_API_URL, BASE_URL_OLD_1, BASE_URL_OLD_2];

  for (const base of baseUrls) {
    try {
      const url = `${base}${endpoint}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const text = await res.text();
        // Ensure it's valid JSON, not HTML error
        if (text.startsWith("{") || text.startsWith("[")) {
          const json = JSON.parse(text);
          if (json && (Array.isArray(json) || typeof json === "object")) {
            return json as T;
          }
        }
      }
    } catch {
      // Try next alternative URL
    }
  }

  // Graceful fallback when remote URLs are rate-limited or down
  return fallback;
}

export async function fetchProducts(): Promise<Product[]> {
  return safeFetchJson<Product[]>(
    "/products",
    FALLBACK_PRODUCTS
  );
}

export async function fetchCategories(): Promise<Category[]> {
  return safeFetchJson<Category[]>(
    "/categories",
    FALLBACK_CATEGORIES
  );
}

export async function fetchProductsByCategory(categorySlug: string): Promise<Product[]> {
  const fallbackList = FALLBACK_PRODUCTS.filter((p) => p.category === categorySlug);
  return safeFetchJson<Product[]>(
    `/products?category=${categorySlug}`,
    fallbackList
  );
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  // If slug is numeric, /products/:id directly works on new API
  if (/^\d+$/.test(slug)) {
    const directResult = await safeFetchJson<Product | null>(
      `/products/${slug}`,
      null
    );
    if (directResult && directResult.nameBn) {
      return directResult;
    }
  }

  // Search through all products list (handles string slugs e.g. sorno-machi-chal or shwarnamachi-chal)
  const allProds = await fetchProducts();
  const found = allProds.find((p) => p.slug === slug || p.id.toString() === slug);
  if (found) {
    return found;
  }

  // Fallback check
  return (
    FALLBACK_PRODUCTS.find((p) => p.slug === slug || p.id.toString() === slug) || null
  );
}
