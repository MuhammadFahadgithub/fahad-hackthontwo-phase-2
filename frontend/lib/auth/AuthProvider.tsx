/**
 * Authentication Provider Context.
 *
 * Provides global authentication state across the application.
 * Constitution Principle II: Authentication & JWT Security
 * Constitution Principle III: User Identity & Isolation
 */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "./client";

interface User {
  id: number;
  email: string;
  name: string | null;
  emailVerified: boolean;
}

interface Session {
  user: User;
  token: string;
  expiresAt: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = async () => {
    try {
      const result = await getSession();
      if (result.data) {
        setSession(result.data);
      } else {
        setSession(null);
      }
    } catch (error) {
      console.error("Failed to refresh session:", error);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint (optional, for consistency)
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Logout API call failed:", error);
      // Continue with client-side logout even if API call fails
    } finally {
      // Clear token from localStorage
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_token_expires");

      // Clear session state
      setSession(null);

      // Redirect to login page
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  const value: AuthContextType = {
    session,
    user: session?.user || null,
    token: session?.token || null,
    isAuthenticated: !!session,
    isLoading,
    refreshSession,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
