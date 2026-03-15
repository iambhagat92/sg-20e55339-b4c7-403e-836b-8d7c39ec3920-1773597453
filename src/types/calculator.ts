export interface CalculatorInput {
  id: string;
  label: string;
  type: "number" | "select" | "text" | "date";
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  required?: boolean;
  defaultValue?: string | number;
  unit?: string;
  helpText?: string;
}

export interface CalculatorOutput {
  id: string;
  label: string;
  format?: "number" | "currency" | "percentage" | "time" | "text";
  currency?: string;
  decimals?: number;
  unit?: string;
}

export interface FormulaStep {
  description: string;
  formula: string;
  variables: Record<string, string>;
}

export interface CalculatorExample {
  title: string;
  description: string;
  inputs: Record<string, number | string>;
  outputs: Record<string, number | string>;
  explanation: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedCalculator {
  id: string;
  title: string;
  slug: string;
  category: string;
}

export interface CalculatorCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  calculators: string[];
}

export interface CalculatorData {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  subCategory?: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  introText: string;
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  formula: FormulaStep[];
  examples: CalculatorExample[];
  faqs: FAQItem[];
  relatedCalculators: string[];
  featured?: boolean;
  premium?: boolean;
  lastUpdated: string;
}