import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  User
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { createUserProfile, updateUserLastLogin, getUserProfile, UserProfile } from '../services/database';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  loginWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const signup = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Create a user profile in Firestore
      await createUserProfile(result.user.uid, email);
      return result;
    } catch (err) {
      console.error("Signup error:", err);
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // Update last login timestamp
      if (result.user) {
        await updateUserLastLogin(result.user.uid);
      }
      return result;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Check if this is a new user and create profile if needed
      const profile = await getUserProfile(result.user.uid);
      if (!profile) {
        await createUserProfile(result.user.uid, result.user.email || '');
      } else {
        await updateUserLastLogin(result.user.uid);
      }
      
      return result;
    } catch (err) {
      console.error("Google login error:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      return await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
      throw err;
    }
  };

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);
        
        // If user is logged in, get their profile data
        if (user) {
          try {
            const profile = await getUserProfile(user.uid);
            setUserProfile(profile);
          } catch (profileError) {
            console.error("Error fetching user profile:", profileError);
          }
        } else {
          setUserProfile(null);
        }
        
        setLoading(false);
      }, (error) => {
        console.error("Auth state change error:", error);
        setError(error);
        setLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      console.error("Auth initialization error:", err);
      setError(err as Error);
      setLoading(false);
      return () => {};
    }
  }, []);

  // If there was an error initializing Firebase auth, still render the app
  // but with a null user (logged out state)
  if (error) {
    console.warn("Auth initialization error, continuing in logged-out state:", error);
  }

  const value = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 