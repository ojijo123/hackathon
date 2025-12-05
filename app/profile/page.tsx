// app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config'; 

// Import Components
import Navbar from '@/components/Navbar';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Authentication Check (Route Protection)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Redirect unauthenticated user to the login flow
        router.push('/'); 
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // 2. Loading and Unauthorized State
  if (loading || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner /> 
        <p className="mt-4 text-lg text-gray-600">Checking credentials...</p>
      </div>
    );
  }

  // Helper function to safely get the username
  const userName = user.displayName || user.email?.split('@')[0] || 'User';

  // 3. Render Profile Content
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          
          <header className="flex items-center space-x-6 mb-8 border-b pb-6">
            {/* User Photo */}
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={`${userName}'s profile`}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-3xl text-white font-bold">
                {userName[0].toUpperCase()}
              </div>
            )}
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {userName}'s Profile
              </h1>
              <p className="text-gray-500">
                Member since: {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </header>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Details</h2>

            {/* Email Field */}
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600 font-medium">Email Address:</span>
              <span className="text-gray-900">{user.email || 'Not Available'}</span>
            </div>

            {/* User ID Field */}
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600 font-medium">User ID (UID):</span>
              <span className="text-gray-900 truncate max-w-xs">{user.uid}</span>
            </div>
            
            {/* Provider Field */}
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600 font-medium">Authentication Provider:</span>
              <span className="text-gray-900 capitalize">
                {user.providerData[0]?.providerId.replace('.com', '') || 'Email/Password'}
              </span>
            </div>
          </section>

          <div className="mt-8 pt-6 border-t">
            <button
              // This button would typically lead to a form for changing email/password/name
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Update Profile Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}