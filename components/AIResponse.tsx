// components/AIResponse.tsx

import InputCard from './InputCard';
import { FinancialPlan } from '@/lib/type'; // Assuming types.ts defines FinancialPlan

interface AIResponseProps {
  plan: FinancialPlan;
}

export default function AIResponse({ plan }: AIResponseProps) {
  return (
    <InputCard title="AI Personalized Financial Plan">
      <p className="mb-3">
        **Save {plan.monthlySavings} per month.**
      </p>
      <p className="mb-3">
        Your goal is achievable in **{plan.timeframe}** if you {plan.action}.
      </p>
      <p className="text-sm text-gray-600 mt-4">
        **Recommended tools:** <br />MMF: {plan.mmfTools}
        <br />SACCO: {plan.saccoTools}
      </p>
    </InputCard>
  );
}