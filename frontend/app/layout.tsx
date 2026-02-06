/**
 * Root layout for the application.
 *
 * Wraps the entire application with AuthProvider for global auth state.
 * Constitution Principle II: Authentication & JWT Security
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App - Full-Stack Authentication",
  description: "Secure multi-user todo application with JWT authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
