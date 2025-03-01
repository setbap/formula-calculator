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
import { HelpCircle } from "lucide-react";
import type { FormulaType } from "@/lib/types";
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
import { Button } from "@/components/ui/button";

interface FormulaFormProps {
  formula: FormulaType;
}

export function FormulaForm({ formula }: FormulaFormProps) {
  const [values, setValues] = useState<Record<string, number>>(
    formula.parameters.reduce((acc, param) => {
      acc[param.name] = param.defaultValue || 20;
      return acc;
    }, {} as Record<string, number>)
  );

  const [count, setCount] = useState(1);
  const [result, setResult] = useState<number>(0);
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

  useEffect(() => {
    calculateResult();
  }, [values, formula, count]);

  const calculateResult = () => {
    const calculatedResult = formula.calculate(values) * count;
    setResult(calculatedResult);
  };

  const handleInputChange = (paramName: string, value: string) => {
    const numValue = value === "" ? 0 : Number.parseFloat(value);
    setValues((prev) => ({ ...prev, [paramName]: numValue }));
  };

  const handleBlur = (paramName: string) => {
    if (values[paramName] === 0) {
      const defaultValue =
        formula.parameters.find((p) => p.name === paramName)?.defaultValue ||
        20;
      setValues((prev) => ({ ...prev, [paramName]: defaultValue }));
    }
  };

  return (
    <Card className="max-w-2xl mx-auto my-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{formula.name}</CardTitle>
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
                  <SheetTitle>{formula.name}</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  <p>{formula.description}</p>
                  <div>
                    <h4 className="font-bold mb-2">فرمول:</h4>
                    <p className="text-sm">{formula.formula}</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">مثال:</h4>
                    <p dir="ltr" className="text-left text-sm">
                      {formula.example}
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
                  <ModalTitle>{formula.name}</ModalTitle>
                </ModalHeader>
                <div className="mt-4 space-y-4">
                  <p>{formula.description}</p>
                  <div>
                    <h4 className="font-bold mb-2">فرمول:</h4>
                    <p className="text-sm">{formula.formula}</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">مثال:</h4>
                    <p dir="ltr" className="text-left text-sm">
                      {formula.example}
                    </p>
                  </div>
                </div>
              </ModalContent>
            </Modal>
          )}
        </div>
        <CardDescription>{formula.formula}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {formula.parameters.map((param) => (
            <div key={param.name} className="space-y-2">
              <Label htmlFor={param.name}>{param.label}</Label>
              <div className="relative">
                <Input
                  id={param.name}
                  type="number"
                  inputMode="numeric"
                  value={values[param.name]}
                  onChange={(e) =>
                    handleInputChange(param.name, e.target.value)
                  }
                  onBlur={() => handleBlur(param.name)}
                  className="pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-muted-foreground border-l">
                  {param.unit}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="count">تعداد</Label>
          <div className="relative">
            <Input
              id="count"
              type="number"
              inputMode="numeric"
              min={1}
              value={count}
              onChange={(e) =>
                setCount(
                  e.target.value === "" ? 1 : Number.parseInt(e.target.value)
                )
              }
              onBlur={() => count < 1 && setCount(1)}
              className="pl-12"
            />
            <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-muted-foreground border-l">
              عدد
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">نتیجه:</h3>
            <div className="text-xl font-bold">
              {result.toLocaleString("fa-IR")} کیلوگرم
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
