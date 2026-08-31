export type CalculatorCategory = 
  | 'ceilings' 
  | 'construction' 
  | 'real-estate';

export interface CategoryInfo {
  id: CalculatorCategory;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  badge: string;
  iconName: string;
  count: number;
}

export interface InputFieldDefinition {
  id: string;
  label: string;
  description?: string;
  unit: string;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  category?: 'dimensions' | 'materials' | 'parameters' | 'financial';
  options?: { label: string; value: number }[];
}

export interface ResultItem {
  id: string;
  label: string;
  value: number | string;
  formatted: string;
  unit?: string;
  isPrimary?: boolean;
  highlight?: 'emerald' | 'amber' | 'neutral';
  description?: string;
  breakdownPct?: number;
}

export interface CalculationSummaryStep {
  label: string;
  formula: string;
  value: string;
}

export interface MethodologyData {
  howItWorks: string;
  whatIsIncluded: string[];
  importantAssumptions: string[];
  professionalNote: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  totalInterest: number;
  balance: number;
}

export interface CalculatorDefinition {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: CalculatorCategory;
  categoryName: string;
  iconName: string;
  shortDescription: string;
  badge?: string;
  keywords: string[];
  inputs: InputFieldDefinition[];
  methodology: MethodologyData;
  faqs: FAQItem[];
  relatedCalculatorIds: string[];
  calculate: (inputs: Record<string, number>) => {
    primaryResult: ResultItem;
    secondaryResults: ResultItem[];
    summarySteps: CalculationSummaryStep[];
    amortizationSchedule?: AmortizationRow[];
    customData?: Record<string, any>;
  };
}
