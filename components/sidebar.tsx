import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Calculator,
  Circle,
  CircleIcon as CircleSquare,
  CornerUpLeft,
  Download,
  Menu,
  Pipette,
  Square,
  X,
} from "lucide-react";
import { ThemeSwitcher } from "@/app/providers";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
  };

  const formulas = [
    {
      id: "steel-sheet",
      name: "فرمول محاسبه وزنی ورق فولادی",
      icon: Square,
      path: "/formulas/steel-sheet",
    },
    {
      id: "rebar",
      name: "فرمول محاسبه وزنی میلگرد",
      icon: Circle,
      path: "/formulas/rebar",
    },
    {
      id: "rectangular-tube",
      name: "فرمول محاسبه وزنی قوطی تخت",
      icon: Pipette,
      path: "/formulas/rectangular-tube",
    },
    {
      id: "square-tube",
      name: "فرمول محاسبه وزنی قوطی مربع",
      icon: CircleSquare,
      path: "/formulas/square-tube",
    },
    {
      id: "angle-iron",
      name: "فرمول محاسبه وزنی نبشی",
      icon: CornerUpLeft,
      path: "/formulas/angle-iron",
    },
    {
      id: "pipe-profile",
      name: "فرمول محاسبه وزنی لوله و پروفیل",
      icon: Menu,
      path: "/formulas/pipe-profile",
    },
  ];

  return (
    <>
      <aside className="hidden md:flex w-72 flex-col border-l bg-background">
        <div className="flex h-14 items-center border-b px-4">
          <span>فرمول ها</span>
        </div>
        <ScrollArea className="flex-1">
          <nav className="grid gap-1 px-2 py-4">
            {formulas.map((formula) => (
              <Link
                key={formula.id}
                href={formula.path}
                className={cn(
                  "flex flex-row-reverse justify-between items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === formula.path
                    ? "bg-accent text-accent-foreground"
                    : "transparent"
                )}
              >
                <formula.icon className="h-5 w-5" />
                <span className="flex-grow text-right">{formula.name}</span>
              </Link>
            ))}
          </nav>
        </ScrollArea>
        {deferredPrompt && (
          <div className="p-4 border-t">
            <Button
              onClick={installApp}
              className="w-full flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              نصب برنامه
            </Button>
          </div>
        )}
        <ThemeSwitcher />
      </aside>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-72 p-0">
          <div className="flex h-14 items-center border-b px-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold"
              onClick={() => setOpen(false)}
            >
              <Calculator className="h-6 w-6" />
              <span>فرمول‌ها</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="mr-auto"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">بستن</span>
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <nav className="grid gap-1 px-2 py-4">
              {formulas.map((formula) => (
                <Link
                  key={formula.id}
                  href={formula.path}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex flex-row-reverse justify-between items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === formula.path
                      ? "bg-accent text-accent-foreground"
                      : "transparent"
                  )}
                >
                  <formula.icon className="h-5 w-5" />
                  <span className="flex-grow text-right">{formula.name}</span>
                </Link>
              ))}
            </nav>
          </ScrollArea>
          {deferredPrompt && (
            <div className="p-4 border-t">
              <Button
                onClick={installApp}
                className="w-full flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                نصب برنامه
              </Button>
            </div>
          )}

          <ThemeSwitcher />
        </SheetContent>
      </Sheet>
    </>
  );
}
