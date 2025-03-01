"use client";

import { Layout } from "@/components/layout";
import { FormulaForm } from "@/components/formula-form";
import { getFormulaById } from "@/lib/formulas";

export default function SteelSheetPage() {
  const formula = getFormulaById("steel-sheet");
  if (!formula) throw new Error("Formula not found");

  return (
    <Layout>
      <FormulaForm formula={formula} />
    </Layout>
  );
}
