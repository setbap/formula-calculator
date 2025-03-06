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
        <div className="h-14 items-center hidden md:flex border-b px-4">
          <Link href="/" className="flex gap-2 ">
            <Calculator className="h-6 w-6 " />
            <h1 className="font-semibold">ماشین حساب فرمول</h1>
          </Link>
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
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
