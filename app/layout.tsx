import type React from "react";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const Providers = dynamic(
  () => import("./providers").then((mod) => mod.default),
  { ssr: false }
);

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-vazir",
});

export const metadata = {
  title: "ماشین حساب فرمول",
  description: "برنامه محاسبه فرمول‌های مهندسی",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import "./globals.css";
