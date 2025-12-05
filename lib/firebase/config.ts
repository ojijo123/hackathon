// lib/firebase/config.ts

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

// 1. Firebase Configuration Object (Read from environment variables)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 2. Initialize Firebase App Conditionally
let app: FirebaseApp;

// Check if any Firebase app has already been initialized
if (getApps().length === 0) {
  // If no app exists, initialize the default app
  app = initializeApp(firebaseConfig);
} else {
  // If an app already exists (e.g., during hot reload or re-runs), retrieve it
  app = getApp();
}

// 3. Export Initialized Services
// 'app' is guaranteed to be initialized here.
export const auth: Auth = getAuth(app);

export { app };