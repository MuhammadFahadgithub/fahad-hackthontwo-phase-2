/**
 * Better Auth configuration for Next.js frontend.
 *
 * Configures JWT-based authentication with Neon PostgreSQL.
 * Constitution Principle II: Authentication & JWT Security
 */
import { betterAuth } from "better-auth";
import { Pool } from "pg";

// Database connection for Better Auth
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  // Database configuration
  database: {
    provider: "postgresql",
    pool: pool,
  },

  // Email/password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
    minPasswordLength: 8,
  },

  // JWT configuration
  jwt: {
    secret: process.env.BETTER_AUTH_SECRET!,
    expiresIn: "7d", // Token expiration (7 days)
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days in seconds
    updateAge: 60 * 60 * 24, // Update session every 24 hours
  },

  // Base URL
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  // Callbacks
  callbacks: {
    async signIn({ user, account }) {
      // Custom logic on sign in
      console.log(`User ${user.email} signed in`);
      return true;
    },
    async signOut({ session }) {
      // Custom logic on sign out
      console.log(`Session ${session.id} signed out`);
    },
  },
});

export type Auth = typeof auth;
