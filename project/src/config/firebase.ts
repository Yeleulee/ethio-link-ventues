import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCuzJUCQtKKhevPVouuOTSaoCwr_fcKqFM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ethio-link-ventures.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ethio-link-ventures",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ethio-link-ventures.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "788592980180",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:788592980180:web:af6cf419b2cbfd7d260b41",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-WDYNW8M6DZ"
};

let app;
let auth;
let googleProvider;
let analytics = null;

try {
  // Initialize Firebase with error handling
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  
  // Configure Google provider
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
  
  // Initialize Analytics only in browser environment
  if (typeof window !== 'undefined') {
    try {
      analytics = getAnalytics(app);
    } catch (analyticsError) {
      console.warn('Failed to initialize Firebase Analytics:', analyticsError);
    }
  }
  
  // For development: check if we need to use emulators
  if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
    try {
      // Check if emulator is running before connecting
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      console.log('Using Auth Emulator at http://localhost:9099');
    } catch (emulatorError) {
      console.warn('Failed to connect to Auth Emulator:', emulatorError);
    }
  }
  
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Create stub/mock implementations if Firebase fails to initialize
  if (!app) {
    console.warn('Creating fallback Firebase app');
    app = {} as any;
  }
  
  if (!auth) {
    console.warn('Creating fallback auth implementation');
    // Create a mock auth object that won't crash the app
    auth = {
      currentUser: null,
      onAuthStateChanged: (callback: any) => { 
        callback(null);
        return () => {}; 
      },
      signInWithEmailAndPassword: async () => { 
        throw new Error('Auth service unavailable'); 
      },
      createUserWithEmailAndPassword: async () => { 
        throw new Error('Auth service unavailable'); 
      },
      signOut: async () => { 
        return Promise.resolve(); 
      }
    } as any;
  }
  
  if (!googleProvider) {
    console.warn('Creating fallback Google provider');
    googleProvider = {} as GoogleAuthProvider;
  }
}

export { app, auth, googleProvider, analytics }; 