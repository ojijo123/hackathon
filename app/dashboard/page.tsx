// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config'; 

// Import Components and Types
import Navbar from '@/components/Navbar';
import AIResponse from '@/components/AIResponse';
import SavingsChart from '@/components/SavingsChart';
import LoadingSpinner from '@/components/LoadingSpinner'; // Assuming you'll create this
import { FinancialPlan } from '@/lib/type'; // Import your interface

// Mock Data (Replace with data fetched from your backend/database)
const mockFinancialPlan: FinancialPlan = {
  monthlySavings: 'KES 15,000',
  timeframe: '9 months',
  action: 'Increase income through side hustle or reduce non-essential spending by 15%',
  mmfTools: 'NCBA Money Market Fund (High Liquidity)',
  saccoTools: 'Mhasibu SACCO (Good returns on long-term deposits)',
};


export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Authentication Check (Route Protection)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Redirect unauthenticated user to the home page or login
        router.push('/'); 
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // 2. Loading and Unauthorized State
  if (loading || !user) {
    // Show a spinner while checking auth status
    return (
      <div className="flex items-center justify-center min-h-screen">
        {/* You'll need to create the LoadingSpinner component */}
        <LoadingSpinner /> 
        <p className="ml-4 text-lg text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  // 3. Render Dashboard Content
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back, {user.email?.split('@')[0] || 'User'}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Your personalized financial overview and plan results.
          </p>
        </header>

        {/* --- Key Metrics and Chart Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Example Key Metric Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
            <p className="text-sm text-gray-500">Total Savings Target</p>
            <p className="text-2xl font-bold text-gray-900">KES 120,000</p>
          </div>
          
          {/* Example Key Metric Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600">
            <p className="text-sm text-gray-500">Savings Rate</p>
            <p className="text-2xl font-bold text-gray-900">30%</p>
          </div>

          {/* Example Key Metric Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-600">
            <p className="text-sm text-gray-500">Next Review</p>
            <p className="text-2xl font-bold text-gray-900">March 2026</p>
          </div>
        </div>

        {/* --- AI Plan and Chart --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: AI Response (Plan Summary) */}
          <AIResponse plan={mockFinancialPlan} />

          {/* Right Column: Savings Chart */}
          <SavingsChart />
        </div>
      </main>
    </div>
  );
}