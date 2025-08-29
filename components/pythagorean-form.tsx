"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HelpCircle, Triangle } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface TriangleScenario {
  type: "hypotenuse" | "leg1" | "leg2";
  label: string;
  description: string;
  color: string;
  value: number;
  calculation: string;
}

export function PythagoreanForm() {
  const [side1, setSide1] = useState<number>(3);
  const [side2, setSide2] = useState<number>(4);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const calculateScenarios = (): TriangleScenario[] => {
    const scenarios: TriangleScenario[] = [];

    const hypotenuse = Math.sqrt(side1 * side1 + side2 * side2);
    scenarios.push({
      type: "hypotenuse",
      label: "اگر نتیجه وتر باشد",
      description: "هر دو ضلع ساق هستند",
      color: "#ef4444",
      value: hypotenuse,
      calculation: `c = √(${side1}² + ${side2}²) = √(${side1 * side1} + ${
        side2 * side2
      }) = √${side1 * side1 + side2 * side2} = ${hypotenuse.toFixed(4)}`,
    });

    if (side1 === side2) {
      return scenarios;
    }

    let missingLeg;
    let smallerSide;
    let label = "اگر ضلع اول وتر باشد";
    let description = "ضلع دوم ساق است";
    if (side1 > side2) {
      missingLeg = Math.sqrt(side1 * side1 - side2 * side2);
      smallerSide = side2;
      label = "اگر ضلع اول وتر باشد";
      description = "ضلع دوم ساق است";
    } else {
      missingLeg = Math.sqrt(side2 * side2 - side1 * side1);
      smallerSide = side1;
      label = "اگر ضلع دوم وتر باشد";
      description = "ضلع اول ساق است";
    }
    if (smallerSide < missingLeg) {
      scenarios.push({
        type: "leg1",
        label,
        description,
        color: "#3b82f6",
        value: missingLeg,
        calculation: `c = √(${side1}² - ${side2}²) = √(${side1 * side1} - ${
          side2 * side2
        }) = √${side1 * side1 - side2 * side2} = ${missingLeg.toFixed(4)}`,
      });
    }

    if (smallerSide > missingLeg) {
      scenarios.push({
        type: "leg2",
        label,
        description,
        color: "#10b981",
        value: missingLeg,
        calculation: `c = √(${side2}² - ${side1}²) = √(${side2 * side2} - ${
          side1 * side1
        }) = √${side2 * side2 - side1 * side1} = ${missingLeg.toFixed(4)}`,
      });
    }

    return scenarios;
  };

  const handleInputChange = (side: "side1" | "side2", value: string) => {
    const numValue = value === "" ? 0 : Number.parseFloat(value);
    if (side === "side1") {
      setSide1(numValue);
    } else {
      setSide2(numValue);
    }
  };

  const scenarios = calculateScenarios();

  return (
    <Card className="max-w-4xl mx-auto my-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Triangle className="h-6 w-6" />
            فرمول قضیه فیثاغورس
          </CardTitle>
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <HelpCircle className="h-5 w-5" />
                  <span className="sr-only">راهنما</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[60vh]">
                <SheetHeader>
                  <SheetTitle>فرمول قضیه فیثاغورس</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  <p>
                    این فرمول برای محاسبه ضلع سوم مثلث قائم‌الزاویه استفاده
                    می‌شود.
                  </p>
                  <div>
                    <h4 className="font-bold mb-2">فرمول:</h4>
                    <p className="text-sm">a² + b² = c² (که c وتر است)</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">نحوه استفاده:</h4>
                    <p className="text-sm">
                      دو ضلع را وارد کنید و تمام حالت‌های ممکن نمایش داده
                      می‌شود. هر رنگ نشان‌دهنده یک حالت مختلف است.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">مثال:</h4>
                    <p dir="ltr" className="text-left text-sm">
                      اگر a=3 و b=4 باشد، c=5 خواهد بود
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Modal>
              <ModalTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <HelpCircle className="h-5 w-5" />
                  <span className="sr-only">راهنما</span>
                </Button>
              </ModalTrigger>
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>فرمول قضیه فیثاغورس</ModalTitle>
                </ModalHeader>
                <div className="mt-4 space-y-4">
                  <p>
                    این فرمول برای محاسبه ضلع سوم مثلث قائم‌الزاویه استفاده
                    می‌شود.
                  </p>
                  <div>
                    <h4 className="font-bold mb-2">فرمول:</h4>
                    <p className="text-sm">a² + b² = c² (که c وتر است)</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">نحوه استفاده:</h4>
                    <p className="text-sm">
                      دو ضلع را وارد کنید و تمام حالت‌های ممکن نمایش داده
                      می‌شود. هر رنگ نشان‌دهنده یک حالت مختلف است.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">مثال:</h4>
                    <p dir="ltr" className="text-left text-sm">
                      اگر a=3 و b=4 باشد، c=5 خواهد بود
                    </p>
                  </div>
                </div>
              </ModalContent>
            </Modal>
          )}
        </div>
        <CardDescription>a² + b² = c² (که c وتر است)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="side1">ضلع اول</Label>
            <Input
              id="side1"
              type="number"
              inputMode="numeric"
              value={side1}
              onChange={(e) => handleInputChange("side1", e.target.value)}
              placeholder="مثال: 3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="side2">ضلع دوم</Label>
            <Input
              id="side2"
              type="number"
              inputMode="numeric"
              value={side2}
              onChange={(e) => handleInputChange("side2", e.target.value)}
              placeholder="مثال: 4"
            />
          </div>
        </div>

        <div className="flex justify-center my-8">
          <div className="relative w-48 h-32">
            <svg
              width="192"
              height="128"
              viewBox="0 0 192 128"
              className="absolute inset-0"
            >
              <line
                x1="16"
                y1="112"
                x2="176"
                y2="112"
                stroke="#3b82f6"
                strokeWidth="3"
              />
              <line
                x1="16"
                y1="112"
                x2="16"
                y2="16"
                stroke="#10b981"
                strokeWidth="3"
              />
              <line
                x1="16"
                y1="16"
                x2="176"
                y2="112"
                stroke="#ef4444"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">نتایج ممکن:</h3>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            {scenarios.map((scenario, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border-2"
                style={{ borderColor: scenario.color }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: scenario.color }}
                  />
                  <h4 className="font-semibold">{scenario.label}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {scenario.description}
                </p>
                <div
                  className="text-xl font-bold mb-2"
                  style={{ color: scenario.color }}
                >
                  {scenario.value.toFixed(4)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {scenario.calculation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
