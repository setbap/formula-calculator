"use client";

import { Layout } from "@/components/layout";
import Link from "next/link";
import { Square, Circle, Pipette, CornerUpLeft } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      <div className="relative flex flex-col items-center justify-center min-h-[60vh] p-6">
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* hero glow */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(28rem 20rem at 0% 0%, hsl(var(--primary) / 0.34), transparent 70%), radial-gradient(24rem 18rem at 100% 20%, hsl(var(--chart-5) / 0.44), transparent 65%)",
            }}
          />
          {/* floating orb */}
          <div
            className="absolute left-10 top-10 h-40 w-40 rounded-full blur-3xl animate-float-slower"
            style={{
              background:
                "radial-gradient(circle, hsl(var(--chart-4)/0.35), transparent 60%)",
            }}
          />
        </div>
        <svg
          viewBox="0 0 200 200"
          className="w-36 h-36 mb-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="80" fill="#3b82f6" />
          <text
            x="100"
            y="140"
            fontSize="120"
            fontWeight="bold"
            textAnchor="middle"
            fill="white"
            fontFamily="Arial, sans-serif"
          >
            M
          </text>
        </svg>
        <h1 className="text-3xl font-bold mb-3">ماشین حساب فرمول</h1>
        <p className="text-center text-muted-foreground mb-10">
          لطفاً یک فرمول را از منوی کناری انتخاب کنید تا محاسبات را انجام دهید.
        </p>
        <div className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
          <Link
            href="/formulas/steel-sheet"
            className="group flex items-center justify-between rounded-lg border bg-card p-4 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            <span>ورق فولادی</span>
            <Square className="h-4 w-4 opacity-60 group-hover:opacity-100" />
          </Link>
          <Link
            href="/formulas/rebar"
            className="group flex items-center justify-between rounded-lg border bg-card p-4 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            <span>میلگرد</span>
            <Circle className="h-4 w-4 opacity-60 group-hover:opacity-100" />
          </Link>
          <Link
            href="/formulas/rectangular-tube"
            className="group flex items-center justify-between rounded-lg border bg-card p-4 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            <span>قوطی تخت</span>
            <Pipette className="h-4 w-4 opacity-60 group-hover:opacity-100" />
          </Link>
          <Link
            href="/formulas/square-tube"
            className="group flex items-center justify-between rounded-lg border bg-card p-4 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            <span>قوطی مربع</span>
            <Square className="h-4 w-4 opacity-60 group-hover:opacity-100" />
          </Link>
          <Link
            href="/formulas/angle-iron"
            className="group flex items-center justify-between rounded-lg border bg-card p-4 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            <span>نبشی</span>
            <CornerUpLeft className="h-4 w-4 opacity-60 group-hover:opacity-100" />
          </Link>
          <Link
            href="/formulas/pipe-profile"
            className="group flex items-center justify-between rounded-lg border bg-card p-4 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            <span>لوله و پروفیل</span>
            <Pipette className="h-4 w-4 opacity-60 group-hover:opacity-100" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
