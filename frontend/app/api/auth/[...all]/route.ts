/**
 * Better Auth API route handler.
 *
 * Handles all authentication requests (signup, login, logout, etc.)
 * Constitution Principle II: Authentication & JWT Security
 */
import { auth } from "@/lib/auth/config";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
