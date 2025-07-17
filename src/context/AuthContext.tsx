
"use client";

import type { User } from "firebase/auth";
import { createContext, useState, useEffect, type ReactNode } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import type { LoginFormData } from "@/app/admin/login/page";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser && (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login')) {
        // Only redirect if not on login page and trying to access other admin pages
        // router.push("/admin/login"); // Commented out to let PrivateRoute handle it
      }
    });
    return () => unsubscribe();
  }, [router]);

  const login = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      // onAuthStateChanged will update user state and PrivateRoute/admin pages will redirect
    } catch (error) {
      setLoading(false);
      throw error; 
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null); // Explicitly set user to null
      router.push("/admin/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Error signing out: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
