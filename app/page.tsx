"use client"

import { Layout } from "@/components/layout"

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h p-6">
        <svg viewBox="0 0 200 200" className="w-48 h-48 mb-8" xmlns="http://www.w3.org/2000/svg">
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
        <h1 className="text-3xl font-bold mb-6">ماشین حساب فرمول</h1>
        <p className="text-center text-muted-foreground mb-8">
          لطفاً یک فرمول را از منوی کناری انتخاب کنید تا محاسبات را انجام دهید.
        </p>
      </div>
    </Layout>
  )
}

