// components/AuthModal.tsx
'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc'; 
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/config'; 
import { useRouter } from 'next/navigation';

// Define the component's props
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isOpen) {
    return null;
  }

  // Helper function to format Firebase error messages
  const formatError = (message: string) => 
    message.replace('Firebase: Error (auth/', '').replace(').', '').replace(/-/g, ' ');

  // --- Email/Password Handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      
      onClose(); // Close modal on success
      router.push('/dashboard'); // Redirect
    } catch (err: any) {
      setError(formatError(err.message));
    } finally {
      setLoading(false);
    }
  };

  // --- Google Sign In Handler ---
  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      onClose();
      router.push('/dashboard');
    } catch (err: any) {
      setError(formatError(err.message));
    } finally {
      setLoading(false);
    }
  };
  
  const title = isLogin ? 'Sign In to Your Account' : 'Create a New Account';
  const buttonText = isLogin ? 'Sign In' : 'Sign Up';
  const toggleText = isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In';

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-75 flex items-center justify-center transition-opacity">
      
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-8 m-4">
        
        <div className="flex justify-end">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                &times; {/* Close Icon */}
            </button>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-sm text-gray-600 cursor-pointer hover:text-blue-600" onClick={() => setIsLogin(!isLogin)}>
            {toggleText}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-4 rounded relative text-sm" role="alert">
            <span className="block">{error}</span>
          </div>
        )}

        {/* Email/Password Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 disabled:opacity-50"
          >
            {loading ? 'Processing...' : buttonText}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="w-full border-t border-gray-300"></div>
          <div className="px-3 text-sm text-gray-500">OR</div>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        {/* --- Sign in with Google Button --- */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 disabled:opacity-50"
        >
          <FcGoogle className="w-5 h-5 mr-3" />
          {loading ? 'Loading...' : 'Sign in with Google'}
        </button>
        
      </div>
    </div>
  );
}