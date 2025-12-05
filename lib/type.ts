// lib/types.ts

// Define the structure for the user's input data
export interface FormData {
  income: number;
  expenses: number;
  savings: string;
  goal: string;
}

// Define the structure for the AI's output plan
export interface FinancialPlan {
  monthlySavings: string;
  timeframe: string;
  action: string;
  mmfTools: string;
  saccoTools: string;
}

// Placeholder/Initial Data
export const initialFormData: FormData = {
  income: 50000,
  expenses: 20000,
  savings: 'Buy a laptop',
  goal: 'Buy a laptop',
};

export const initialPlan: FinancialPlan = {
  monthlySavings: '8,500',
  timeframe: '6 months',
  action: 'reduce expenses by 10%',
  mmfTools: 'MMF (Cytonn, Old Mutual...)',
  saccoTools: 'UnaItas...',
};