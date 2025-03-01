export interface Parameter {
  name: string
  label: string
  unit: string
  defaultValue: number
}

export interface FormulaType {
  id: string
  name: string
  englishName: string
  formula: string
  description: string
  example: string
  parameters: Parameter[]
  calculate: (values: Record<string, number>) => number
}

