"use client";

import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  // PWA install prompt
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Handle PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

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
    </ThemeProvider>
  );
};

export default Providers;
