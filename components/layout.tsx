"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Button } from "@/components/ui/button";
import { Calculator, Menu } from "lucide-react";
import { Footer } from "./footer";
import Link from "next/link";

export function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1">
        <div className="sticky top-0 z-20 hidden md:flex h-14 items-center border-b bg-background/80 backdrop-blur px-6 bg-gradient-to-l from-background/80 to-primary/5 dark:to-primary/10">
          <div className="w-full max-w-5xl flex items-center justify-between">
            <Link href="/" className="flex gap-2 items-center">
              <Calculator className="h-6 w-6" />
              <h1 className="font-semibold">ماشین حساب فرمول</h1>
            </Link>
          </div>
        </div>
        <header className=" top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6 md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">منو</span>
          </Button>
          <span>ماشین حساب فرمول‌ها</span>
        </header>
        <main className="relative flex-1 overflow-hidden">
          {/* Futuristic layered background */}
          <div className="pointer-events-none absolute inset-0 z-0">
            {/* grid lines */}
            <div
              className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(125,125,125,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(125,125,125,0.25) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* conic glow */}
            <div
              className="absolute -top-40 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl animate-spin-slower"
              style={{
                background:
                  "conic-gradient(from 180deg at 50% 50%, hsl(var(--chart-1)/0.12), hsl(var(--chart-2)/0.12), hsl(var(--chart-3)/0.12), hsl(var(--chart-4)/0.12), hsl(var(--chart-5)/0.12), hsl(var(--chart-1)/0.12))",
              }}
            />
            {/* radial spotlights */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(60rem 40rem at 110% -10%, hsl(var(--chart-1) / 0.18), transparent 40%), radial-gradient(40rem 30rem at -10% -10%, hsl(var(--chart-2) / 0.16), transparent 45%), radial-gradient(50rem 30rem at 50% 120%, hsl(var(--chart-3) / 0.14), transparent 40%)",
              }}
            />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-6 md:px-6 md:py-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
