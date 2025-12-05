// app/page.tsx

import Navbar from '@/components/Navbar';
import FinancialForm from '@/components/FinancialForm';
import AIResponse from '@/components/AIResponse';
import SavingsChart from '@/components/SavingsChart';
import { initialPlan, initialFormData } from '@/lib/type'; // Assuming you define these

export default function LandingPage() {
  // In a real app, 'plan' and 'formData' would be managed by state (useState)
  // and updated after form submission and API call.

  const plan = initialPlan; // Placeholder data
  const formData = initialFormData; // Placeholder data

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-10">
          <h1 className="text-2xl font-semibold text-gray-800">
            Empowering young Kenyans to save, invest, and plan.
          </h1>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-150">
            Start Your Plan
          </button>
        </header>

        {/* Tab Navigation Placeholder */}
        <div className="flex justify-center space-x-8 mb-8 text-lg text-gray-600 border-b pb-2">
          <span className="font-bold text-blue-600 border-b-2 border-blue-600">Savings</span>
          <span>MMF Advice</span>
          <span>SACCO Guidance</span>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Form */}
          <FinancialForm formData={formData} /> {/* Pass state management props here */}

          {/* Right Column: AI Response & Chart */}
          <div>
            <AIResponse plan={plan} />
            <SavingsChart />
          </div>
        </div>
      </main>
    </div>
  );
}

