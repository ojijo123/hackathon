// components/SavingsChart.tsx

import InputCard from './InputCard';

export default function SavingsChart() {
  return (
    <InputCard title="Savings Projection">
      {/* Placeholder for the chart visualization. 
          You would use a library like 'react-chartjs-2' or 'recharts' here. */}
      <div className="flex justify-center items-center h-48 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">
                  </p>
      </div>
    </InputCard>
  );
}