"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase, isMockMode } from "./supabase";

export interface UserSession {
  email: string;
  role: "admin" | "public_visitor";
}

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginAsMock: (email: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = "gowthamsasuke2005@gmail.com";
const MOCK_SESSION_KEY = "zenitsu_mock_session";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync session state on load
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);

      if (isMockMode) {
        // Mock Sandbox Authentication Mode
        try {
          const stored = window.localStorage.getItem(MOCK_SESSION_KEY);
          if (stored) {
            setUser(JSON.parse(stored));
          }
        } catch (e) {
          console.error("Failed to read mock auth session", e);
        }
        setLoading(false);
      } else {
        // Real Supabase Authentication Mode
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user?.email) {
            setUser({
              email: session.user.email,
              role: session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "admin" : "public_visitor",
            });
          }

          // Listen for active auth changes
          const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event: any, session: any) => {
              if (session?.user?.email) {
                setUser({
                  email: session.user.email,
                  role: session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "admin" : "public_visitor",
                });
              } else {
                setUser(null);
              }
              setLoading(false);
            }
          );

          return () => {
            subscription.unsubscribe();
          };
        } catch (error) {
          console.error("Supabase auth check error", error);
          setLoading(false);
        }
      }
    };

    initializeAuth();
  }, []);

  // Google Sign-In helper
  const loginWithGoogle = async () => {
    if (isMockMode) {
      // Direct mock fallback: simulate a redirect and log in as admin
      await loginAsMock(ADMIN_EMAIL);
    } else {
      // Trigger genuine Supabase Google Auth
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    }
  };

  // Mock Developer sign-in helper
  const loginAsMock = async (email: string): Promise<boolean> => {
    setLoading(true);
    const sanitizedEmail = email.trim().toLowerCase();
    const sessionUser: UserSession = {
      email: sanitizedEmail,
      role: sanitizedEmail === ADMIN_EMAIL.toLowerCase() ? "admin" : "public_visitor",
    };
    
    // Store in LocalStorage
    try {
      window.localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(sessionUser));
      
      // Inject standard server-side cookie so that Next.js middleware is aware of the session in mock mode!
      document.cookie = `zenitsu-mock-role=${sessionUser.role}; path=/; max-age=86400; SameSite=Lax`;
      
      setUser(sessionUser);
      setLoading(false);
      return true;
    } catch (e) {
      console.error(e);
      setLoading(false);
      return false;
    }
  };

  // Logout helper
  const logout = async () => {
    setLoading(true);
    if (isMockMode) {
      try {
        window.localStorage.removeItem(MOCK_SESSION_KEY);
        // Clear mock cookie
        document.cookie = "zenitsu-mock-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        setUser(null);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    } else {
      await supabase.auth.signOut();
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, loginAsMock, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
