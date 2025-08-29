import type { FormulaType } from "./types";

export const formulas: FormulaType[] = [
  {
    id: "pythagorean-theorem",
    name: "فرمول قضیه فیثاغورس",
    englishName: "Pythagorean Theorem",
    formula: "a² + b² = c² (که c وتر است)",
    description:
      "این فرمول برای محاسبه ضلع سوم مثلث قائم‌الزاویه استفاده می‌شود. با داشتن دو ضلع، ضلع سوم محاسبه می‌شود. اگر یکی از اعداد وارد شده وتر باشد، سیستم به طور خودکار تشخیص می‌دهد.",
    example: "اگر a=3 و b=4 باشد، c=5 خواهد بود",
    parameters: [
      { name: "side1", label: "ضلع اول", unit: "", defaultValue: 3 },
      { name: "side2", label: "ضلع دوم", unit: "", defaultValue: 4 },
    ],
    calculate: (values) => {
      const { side1, side2 } = values;
      const a = Math.min(side1, side2);
      const b = Math.max(side1, side2);

      // Check if the larger value could be the hypotenuse
      // If a² + b² > b², then b is not the hypotenuse, so we need to find the hypotenuse
      const aSquared = a * a;
      const bSquared = b * b;

      if (aSquared + bSquared > bSquared) {
        // Both are legs, calculate hypotenuse
        return Math.sqrt(aSquared + bSquared);
      } else {
        // The larger value is the hypotenuse, calculate the missing leg
        return Math.sqrt(bSquared - aSquared);
      }
    },
  },
  {
    id: "steel-sheet",
    name: "فرمول محاسبه وزنی ورق فولادی",
    englishName: "Steel Sheet Weight Formula",
    formula: "طول (متر) × عرض (متر) × ضخامت (میلی متر) × 7.85",
    description:
      "این فرمول برای محاسبه وزن ورق فولادی استفاده می‌شود. با ضرب طول، عرض و ضخامت ورق در ضریب 7.85 (چگالی فولاد)، وزن ورق به کیلوگرم به دست می‌آید.",
    example: "6 × 1.5 × 25 × 7.85 = 1766.25 کیلوگرم",
    parameters: [
      { name: "length", label: "طول", unit: "m", defaultValue: 6 },
      { name: "width", label: "عرض", unit: "m", defaultValue: 1.5 },
      { name: "thickness", label: "ضخامت", unit: "mm", defaultValue: 25 },
    ],
    calculate: (values) => {
      return values.length * values.width * values.thickness * 7.85;
    },
  },
  {
    id: "rebar",
    name: "فرمول محاسبه وزنی میلگرد",
    englishName: "Rebar Weight Formula",
    formula: "قطر (میلی متر) × قطر (میلی متر) × طول (متر) × 0.00617",
    description:
      "این فرمول برای محاسبه وزن میلگرد استفاده می‌شود. با ضرب مجذور قطر میلگرد در طول و ضریب 0.00617، وزن میلگرد به کیلوگرم به دست می‌آید.",
    example: "20 × 20 × 6 × 0.00617 = 14.808 کیلوگرم",
    parameters: [
      { name: "diameter", label: "قطر", unit: "mm", defaultValue: 20 },
      { name: "length", label: "طول", unit: "m", defaultValue: 6 },
    ],
    calculate: (values) => {
      return values.diameter * values.diameter * values.length * 0.00617;
    },
  },
  {
    id: "rectangular-tube",
    name: "فرمول محاسبه وزنی قوطی تخت",
    englishName: "Rectangular Tube Weight Formula",
    formula: "(طول + عرض لبه) × 2 × ضخامت (میلی متر) × طول (متر) × 0.00785",
    description:
      "این فرمول برای محاسبه وزن قوطی تخت (پروفیل مستطیلی) استفاده می‌شود. با محاسبه محیط مقطع و ضرب آن در ضخامت، طول و ضریب 0.00785، وزن قوطی به کیلوگرم به دست می‌آید.",
    example: "(100 + 50) × 2 × 5 × 6 × 0.00785 = 70.65 کیلوگرم",
    parameters: [
      { name: "length", label: "طول", unit: "mm", defaultValue: 100 },
      { name: "width", label: "عرض لبه", unit: "mm", defaultValue: 50 },
      { name: "thickness", label: "ضخامت", unit: "mm", defaultValue: 5 },
      { name: "tubeLength", label: "طول قوطی", unit: "m", defaultValue: 6 },
    ],
    calculate: (values) => {
      return (
        (values.length + values.width) *
        2 *
        values.thickness *
        values.tubeLength *
        0.00785
      );
    },
  },
  {
    id: "square-tube",
    name: "فرمول محاسبه وزنی قوطی مربع",
    englishName: "Square Tube Weight Formula",
    formula: "عرض × 4 × ضخامت (میلی متر) × طول (متر) × 0.00785",
    description:
      "این فرمول برای محاسبه وزن قوطی مربع (پروفیل مربعی) استفاده می‌شود. با محاسبه محیط مقطع و ضرب آن در ضخامت، طول و ضریب 0.00785، وزن قوطی به کیلوگرم به دست می‌آید.",
    example: "50 × 4 × 5 × 6 × 0.00785 = 47.1 کیلوگرم",
    parameters: [
      { name: "width", label: "عرض", unit: "mm", defaultValue: 50 },
      { name: "thickness", label: "ضخامت", unit: "mm", defaultValue: 5 },
      { name: "length", label: "طول", unit: "m", defaultValue: 6 },
    ],
    calculate: (values) => {
      return values.width * 4 * values.thickness * values.length * 0.00785;
    },
  },
  {
    id: "angle-iron",
    name: "فرمول محاسبه وزنی نبشی",
    englishName: "Angle Iron Weight Formula",
    formula: "((عرض لبه × 2) - ضخامت (میلی متر)) × ضخامت × طول (متر) × 0.00785",
    description:
      "این فرمول برای محاسبه وزن نبشی استفاده می‌شود. با محاسبه سطح مقطع و ضرب آن در طول و ضریب 0.00785، وزن نبشی به کیلوگرم به دست می‌آید.",
    example: "(50 × 2 - 5) × 5 × 6 × 0.00785 = 35.325 کیلوگرم",
    parameters: [
      { name: "width", label: "عرض لبه", unit: "mm", defaultValue: 50 },
      { name: "thickness", label: "ضخامت", unit: "mm", defaultValue: 5 },
      { name: "length", label: "طول", unit: "m", defaultValue: 6 },
    ],
    calculate: (values) => {
      return (
        (values.width * 2 - values.thickness) *
        values.thickness *
        values.length *
        0.00785
      );
    },
  },
  {
    id: "pipe-profile",
    name: "فرمول محاسبه وزنی لوله و پروفیل",
    englishName: "Pipe & Profile Weight Formula",
    formula: "ضخامت × طول × 0.02466 × (قطر - ضخامت)",
    description:
      "این فرمول برای محاسبه وزن لوله و پروفیل استفاده می‌شود. با محاسبه سطح مقطع و ضرب آن در طول و ضریب مناسب، وزن لوله به کیلوگرم به دست می‌آید.",
    example: "(114 - 4) × 4 × 6 × 0.02466 = 65.1024 کیلوگرم",
    parameters: [
      { name: "diameter", label: "قطر", unit: "mm", defaultValue: 114 },
      { name: "thickness", label: "ضخامت", unit: "mm", defaultValue: 4 },
      { name: "length", label: "طول", unit: "m", defaultValue: 6 },
    ],
    calculate: (values) => {
      return (
        (values.diameter - values.thickness) *
        values.thickness *
        values.length *
        0.02466
      );
    },
  },
];

export function getFormulaById(id: string): FormulaType | undefined {
  return formulas.find((formula) => formula.id === id);
}
