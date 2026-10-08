import { Product, SortOption } from "@/types";

const banglaDigits: { [key: string]: string } = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
  ".": ".",
};

/**
 * Converts English numbers or digits string to Bengali numerals
 */
export function toBengaliNumber(val: number | string | null | undefined): string {
  if (val === null || val === undefined) return "০";
  const str = typeof val === "number" ? val.toString() : val;
  return str.replace(/[0-9]/g, (digit) => banglaDigits[digit] || digit);
}

const banglaDays = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

const banglaMonths = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

/**
 * Returns formatted today's date in Bengali
 * Example: বৃহস্পতিবার, ৮ অক্টোবর, ২০২৬
 */
export function getBanglaTodayDate(): string {
  const now = new Date();
  const dayName = banglaDays[now.getDay()];
  const dateNum = toBengaliNumber(now.getDate());
  const monthName = banglaMonths[now.getMonth()];
  const yearNum = toBengaliNumber(now.getFullYear());

  return `${dayName}, ${dateNum} ${monthName}, ${yearNum}`;
}

/**
 * Formats units into Bengali readable label
 */
export function formatUnit(unit?: string): string {
  if (!unit) return "প্রতি একক";
  const lower = unit.toLowerCase();
  if (lower === "kg" || lower === "কেজি") return "প্রতি কেজি";
  if (lower === "litre" || lower === "liter" || lower === "লিটার") return "প্রতি লিটার";
  if (lower === "dozen" || lower === "ডজন") return "প্রতি ডজন";
  if (lower === "piece" || lower === "পিস" || lower === "হালি") return "প্রতি পিস";
  return `প্রতি ${unit}`;
}

/**
 * Handles numeric sorting for products (handling Challenge C1)
 */
export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const cloned = [...products];
  if (sort === "price-asc") {
    return cloned.sort((a, b) => Number(a.today) - Number(b.today));
  }
  if (sort === "price-desc") {
    return cloned.sort((a, b) => Number(b.today) - Number(a.today));
  }
  return cloned;
}
