# 🛒 বাজার দর (BazarDor) — নিত্যপ্রয়োজনীয় পণ্যের বাজার মূল্য ট্র্যাকিং প্ল্যাটফর্ম

[![Next.js](https://img.shields.io/badge/Next.js-16.3.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![BetterAuth](https://img.shields.io/badge/BetterAuth-v1.7.6-emerald?style=for-the-badge)](https://better-auth.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

> **বাজার দর (BazarDor)** হলো একটি আধুনিক, দ্রুতগতির ও রেসপনসিভ ফুলস্ট্যাক ওয়েব অ্যাপ্লিকেশন, যার মাধ্যমে বাংলাদেশের সাধারণ ভোক্তাগণ প্রতিদিনের চাল, ডাল, তেল, শাকসবজি, মাছ ও মাংসের মতো নিত্যপ্রয়োজনীয় পণ্যের পাইকারি ও খুচরা বাজার দর, দামের ওঠানামা এবং বিভাগীয় বাজারভিত্তিক তুলনামূলক তথ্য সহজে এক নজরে যাচাই করতে পারেন।

---

## 🔗 লাইভ লিংক ও রিপোজিটরি (Submission Links)

- 🌐 **লাইভ ওয়েবসাইট (Live URL):** [https://bazar-dor-mahi.vercel.app](https://bazar-dor-mahi.vercel.app)
- 💻 **গিটহাব রিপোজিটরি (GitHub Repo):** [https://github.com/EHMahi9/Bazar-Dor](https://github.com/EHMahi9/Bazar-Dor)
- 📡 **অফিশিয়াল লাইভ ডেটা API (Official API):** [https://openapi.programming-hero.com/api/bazardor](https://openapi.programming-hero.com/api/bazardor)

---

## 🌟 প্রধান ৫টি মূল বৈশিষ্ট্য (Key Features)

1. **🔴 লাইভ মারকুই প্রাইস টিকার ও রিয়েল-টাইম ডাটা (Live Price Ticker Marquee):**
   - নেভবারের নিচে একটি নিরবচ্ছিন্ন স্ক্রলিং টিকার বার যা প্রতিদিনের প্রতিটি পণ্যের নাম, আজকের দর এবং শতাংশ হারে দাম বাড়া (▲) বা কমার (▼) ট্রেন্ড সরাসরি প্রদর্শন করে। হোভার করলে টিকারটি সাময়িক থেমে যায়।

2. **📈 আজ দাম বেড়েছে ও কমেছে (Top Risers & Fallers Sections):**
   - হোম পেজে গতকালের তুলনায় আজকের বাজারে সবচেয়ে বেশি দাম বৃদ্ধি পাওয়া শীর্ষ ৬টি পণ্য (**Section A — “আজ দাম বেড়েছে ▲”**) এবং সবচেয়ে বেশি দাম হ্রাস পাওয়া শীর্ষ ৬টি পণ্য (**Section B — “আজ দাম কমেছে ▼”**) আলাদা সেকশনে ট্রেন্ড ইন্ডিকেটরসহ প্রদর্শিত হয়।

3. **🔍 বাংলা সংখ্যাভিত্তিক নিখুঁত সর্টিং ও ফিল্টারিং (Bangla Numeral Numeric Sorting & Search):**
   - সব পণ্যের তালিকায় যেকোনো পণ্য নাম দিয়ে সার্চ করা, ক্যাটাগরিভিত্তিক ফিল্টার করা এবং **“সাজান: ডিফল্ট | দাম: কম থেকে বেশি | দাম: বেশি থেকে কম”** ড্রপডাউনের মাধ্যমে বাংলা সংখ্যার প্রকৃত গাণিতিক মানের ভিত্তিতে নিখুঁত সর্টিং সুবিধা।

4. **🔐 BetterAuth ও সুরক্ষিত প্রটেক্টেড রাউট (BetterAuth with Protected Route Guard):**
   - BetterAuth ও MongoDB-এর মাধ্যমে ইমেইল/পাসওয়ার্ড ও সোশ্যাল লগইন (Google, GitHub) ব্যবস্থা। পণ্যের বিস্তারিত পাতা (`/product/[slug]`) একটি প্রটেক্টেড রাউট—লগইন ছাড়া প্রবেশ করতে চাইলে স্বয়ংক্রিয়ভাবে টোস্ট নোটিফিকেশন প্রদর্শন করে এবং রিডাইরেক্ট করে।

5. **🏙️ বিভাগ ও বাজারভিত্তিক আজকের দর এবং প্রোফাইল আপডেট (Market Analysis & Profile Update):**
   - প্রতিটি পণ্যের বিস্তারিত পাতায় সর্বনিম্ন, গড় ও সর্বোচ্চ দামের পাশাপাশি বাংলাদেশের বিভিন্ন বিভাগ (ঢাকা, চট্টগ্রাম, রাজশাহী, সিলেট ইত্যাদি) ও পাইকারি/খুচরা বাজারের তুলনামূলক টেবিল।
   - প্রোফাইল পেজ (`/profile`) থেকে সরাসরি `/profile/update` রাউটে গিয়ে ব্যবহারকারীর নাম পরিবর্তন ও রিয়েলটাইম আপডেটের সুবিধা (BetterAuth `updateUser` API Integration)।

---

## 🛠️ ব্যবহৃত প্রযুক্তিসমূহ (Technologies Used)

| প্রযুক্তি | কাজের ক্ষেত্র |
| :--- | :--- |
| **Next.js 16 (App Router)** | আধুনিক React ফ্রেমওয়ার্ক, সার্ভার/ক্লায়েন্ট আর্কিটেকচার ও ডায়নামিক রাউটিং |
| **TypeScript** | টাইপ সেফটি ও কোডের নির্ভরযোগ্যতা |
| **Tailwind CSS v4** | রেসপনসিভ ডিজাইন ও স্টাইলিং |
| **Hero UI / Custom UI** | ক্লিন ও মডার্ন ইউজার ইন্টারফেস |
| **BetterAuth** | আধুনিক অথেনটিকেশন ইঞ্জিন (ইমেইল/পাসওয়ার্ড, সোশ্যাল লগইন, সেশন গার্ড) |
| **MongoDB Atlas** | ব্যবহারকারী ও সেশন ডাটাবেজ স্টোরেজ |
| **React Hot Toast** | মসৃণ ও ব্যবহারকারী-বান্ধব টোস্ট নোটিফিকেশন |
| **Lucide React** | নান্দনিক ও আধুনিক আইকন সেট |

---

## 📋 পেজ ও রাউটিং বিবরণী (Pages & Routes)

| রাউট | বিবরণ | সুরক্ষা অবস্থা |
| :--- | :--- | :--- |
| `/` | হোম পেজ — ব্যানার, টিকার, দাম বৃদ্ধির শীর্ষ পণ্য, দাম হ্রাসের শীর্ষ পণ্য, সব পণ্যের গ্রিড | উন্মুক্ত |
| `/category/[slug]` | ক্যাটাগরি পেজ — চাল, ডাল, তেল, সবজি, মাছ ইত্যাদির তালিকা, সর্টিং ও স্কেলিটন | উন্মুক্ত |
| `/product/[slug]` | পণ্য বিশ্লেষণ — সারাংশ, সর্বনিম্ন/গড়/সর্বোচ্চ দর, ঐতিহাসিক তুলনা, বাজারভিত্তিক তালিকা | 🔒 প্রটেক্টেড (লগইন আবশ্যক) |
| `/sign-in` & `/signin` | সাইন ইন পেজ — ইমেইল/পাসওয়ার্ড এবং সোশ্যাল লগইন | উন্মুক্ত |
| `/sign-up` & `/signup` | সাইন আপ পেজ — নতুন অ্যাকাউন্ট তৈরি ও স্বয়ংক্রিয় লগইন রিডাইরেক্ট | উন্মুক্ত |
| `/profile` | আমার প্রোফাইল — ব্যবহারকারীর তথ্য, মেম্বারশিপ এবং আপডেট বাটন | 🔒 প্রটেক্টেড |
| `/profile/update` | প্রোফাইল আপডেট — BetterAuth ব্যবহার করে নাম পরিবর্তন | 🔒 প্রটেক্টেড |
| `/about` | আমাদের সম্পর্কে — প্ল্যাটফর্ম পরিচিতি ও মূল লক্ষ্য | উন্মুক্ত |
| `404 (Not Found)` | কাস্টম ৪০৪ ফ্রেন্ডলি পেজ ও হোম পেজে ফিরে যাওয়ার বাটন | উন্মুক্ত |

---

## 🚀 লোকাল সেটআপ ও ইন্সটলেশন (Local Setup Guide)

### ১. ক্লোন করুন:
```bash
git clone https://github.com/EHMahi9/Bazar-Dor.git
cd Bazar-Dor
```

### ২. ডিপেন্ডেন্সি ইন্সটল করুন:
```bash
npm install
```

### ৩. এনভায়রনমেন্ট ভেরিয়েবল সেটআপ (`.env`):
প্রজেক্টের রুট ডিরেক্টরিতে একটি `.env` ফাইল তৈরি করুন:
```env
BETTER_AUTH_SECRET=your_better_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/?appName=BazarDor
```

### ৪. ডেভেলপমেন্ট সার্ভার চালু করুন:
```bash
npm run dev
```
ব্রাউজারে [http://localhost:3000](http://localhost:3000) ভিজিট করুন।

---

## 🌐 ডিপ্লয়মেন্ট নির্দেশনা (Deployment Guide)

প্রজেক্টটি Vercel এ ডিপ্লয় করার জন্য:
1. কোড GitHub রিপোজিটরিতে পুশ করুন।
2. [Vercel Dashboard](https://vercel.com) এ গিয়ে `Add New Project` সিলেক্ট করুন।
3. GitHub রিপোজিটরিটি ইমপোর্ট করুন।
4. **Environment Variables** সেকশনে `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (আপনার Vercel ডোমেইন), এবং `BETTER_AUTH_DB_URL` যোগ করুন।
5. **Deploy** বাটনে ক্লিক করুন। ডায়নামিক রাউটসমূহ (`/product/[slug]` এবং `/category/[slug]`) কোনো ৪MD রিফ্রেশ এরর ছাড়াই সরাসরি কাজ করবে।

---

## 👨‍💻 প্রণয়নে

- **ব্যাচ:** Batch 14 (Assignment 7)
- **প্রজেক্টের নাম:** বাজার দর (Bazar Dor)
- **ডেভেলপার:** Ebnul Hasan Mahi (ইবনুল হাসান মাহী) — [@EHMahi9](https://github.com/EHMahi9)
