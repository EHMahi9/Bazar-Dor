import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "বাজার দর | প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের বাজার মূল্য",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সঠিক বাজার দর, দামের ওঠানামা এবং বাজারভিত্তিক বিশ্লেষণ জানুন সবার আগে।",
  keywords: ["বাজার দর", "Bazar Dor", "Price Tracking", "Daily Essentials", "Bangladesh Market Price"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="dark h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        <Providers>
          <Navbar />
          <main className="grow pt-28 sm:pt-32">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
