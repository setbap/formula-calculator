"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Footer } from "./footer"

export function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6 md:hidden">
          <Button variant="outline" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">منو</span>
          </Button>
          <h1 className="font-semibold">ماشین حساب فرمول</h1>
        </header>
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

