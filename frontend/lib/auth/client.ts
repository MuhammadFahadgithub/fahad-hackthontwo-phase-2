/**
 * Authentication client functions.
 *
 * Provides client-side authentication functions using Better Auth.
 * Constitution Principle II: Authentication & JWT Security
 */
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3000",
});

// Export auth functions for easy use
export const signUp = authClient.signUp;
export const signIn = authClient.signIn;
export const signOut = authClient.signOut;
export const getSession = authClient.getSession;
export const useSession = authClient.useSession;
