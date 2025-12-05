// components/InputCard.tsx

import { ReactNode } from 'react';

interface InputCardProps {
  title: string;
  children: ReactNode;
}

export default function InputCard({ title, children }: InputCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
        {title}
      </h2>
      {children}
    </div>
  );
}