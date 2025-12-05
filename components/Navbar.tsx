// components/Navbar.tsx
'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';

// IMPORT NEW MODAL COMPONENT
import AuthModal from './AuthModal'; 

import { 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config'; 

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // State to control the visibility of the authentication modal
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <nav className="w-full bg-white border-b shadow-sm">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/fincheque.png"
              alt="FinCheque Logo"
              width={150}
              height={100}
              priority
            />
          </Link>

          {/* Navigation Links and Auth Button */}
          <div className="flex items-center gap-6">
            <Link 
              href="/dashboard" 
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Dashboard
            </Link>

            <Link 
              href="/profile" 
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Profile
            </Link>

            {/* Conditional Auth Button */}
            {loading ? (
              <div className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            ) : user ? (
              // User is logged in: Show Log Out
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-150"
              >
                Log Out
              </button>
            ) : (
              // User is NOT logged in: Show Sign Up / Log In (Blue Button)
              <button
                onClick={() => setIsModalOpen(true)} // <-- Open the modal
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150"
              >
                Sign Up / Log In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal component is rendered here */}
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}