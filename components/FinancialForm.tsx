// components/FinancialForm.tsx
'use client'

import Button from './Button';
import InputCard from './InputCard';
import { FormData } from '@/lib/type'; // Assuming types.ts defines FormData

interface FinancialFormProps {
  formData: FormData;
  // In a real app, you'd also pass handleChange and handleSubmit functions
}

export default function FinancialForm({ formData }: FinancialFormProps) {
  return (
    <InputCard title="Financial Plan Form">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        {/* Monthly Income Input */}
        <div>
          <label htmlFor="income" className="block text-sm font-medium text-gray-700">
            Monthly Income
          </label>
          <input
            id="income"
            type="number"
            value={formData.income}
            readOnly // Replace with onChange handler in a real app
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-lg"
          />
        </div>

        {/* Expenses Input */}
        <div>
          <label htmlFor="expenses" className="block text-sm font-medium text-gray-700">
            Expenses
          </label>
          <input
            id="expenses"
            type="number"
            value={formData.expenses}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-lg"
          />
        </div>

        {/* Savings Label/Input */}
        <div>
          <label htmlFor="savings" className="block text-sm font-medium text-gray-700">
            Savings
          </label>
          <input
            id="savings"
            type="text"
            value={formData.savings}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-lg"
            placeholder="e.g., KES 30,000"
          />
        </div>

        {/* Goal Input */}
        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
            Goal
          </label>
          <input
            id="goal"
            type="text"
            value={formData.goal}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-lg"
          />
        </div>

        <Button type="submit">Generate Plan</Button>
      </form>
    </InputCard>
  );
}