"use client";

import React, { ReactNode } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

// Theme Switcher Component
export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center h-16 justify-between w-full p-4 border-t border-border">
      <span className="text-sm font-medium">تم</span>
      <div className="flex gap-1">
        <button
          onClick={() => setTheme("light")}
          className={`p-2 rounded-md ${
            theme === "light"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
          aria-label="حالت روشن"
        >
          <Sun size={16} />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`p-2 rounded-md ${
            theme === "dark"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
          aria-label="حالت تاریک"
        >
          <Moon size={16} />
        </button>
        <button
          onClick={() => setTheme("system")}
          className={`p-2 rounded-md ${
            theme === "system"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
          aria-label="حالت سیستم"
        >
          <Monitor size={16} />
        </button>
      </div>
    </div>
  );
};

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", (e) => {
      handleBeforeInstallPrompt(e);
    });

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {showInstallPrompt && (
        <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-primary text-primary-foreground flex justify-between items-center">
          <p>این برنامه را به صفحه اصلی خود اضافه کنید</p>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md"
              onClick={() => setShowInstallPrompt(false)}
            >
              بعداً
            </button>
            <button
              className="px-4 py-2 bg-accent text-accent-foreground rounded-md"
              onClick={async () => {
                if (deferredPrompt) {
                  deferredPrompt.prompt();
                  const { outcome } = await deferredPrompt.userChoice;
                  setDeferredPrompt(null);
                  setShowInstallPrompt(false);
                }
              }}
            >
              نصب
            </button>
          </div>
        </div>
      )}
      {children}
      <Toaster />
    </ThemeProvider>
  );
};

export default Providers;
