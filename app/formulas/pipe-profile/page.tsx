"use client";

import { Layout } from "@/components/layout";
import { FormulaForm } from "@/components/formula-form";
import { getFormulaById } from "@/lib/formulas";

export default function PipeProfilePage() {
  const formula = getFormulaById("pipe-profile");
  if (!formula) throw new Error("Formula not found");

  return (
    <Layout>
      <FormulaForm formula={formula} />
    </Layout>
  );
}
