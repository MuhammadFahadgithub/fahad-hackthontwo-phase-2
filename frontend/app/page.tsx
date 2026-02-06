/**
 * Home page.
 *
 * Landing page with links to signup and login.
 */
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Welcome to Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            A secure, multi-user todo application with JWT-based authentication.
          </p>
          <div className="space-y-3">
            <Link href="/signup" className="block">
              <Button className="w-full" variant="primary">
                Sign Up
              </Button>
            </Link>
            <Link href="/login" className="block">
              <Button className="w-full" variant="secondary">
                Log In
              </Button>
            </Link>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            <p className="font-semibold mb-2">Features:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Secure JWT authentication</li>
              <li>User data isolation</li>
              <li>Password hashing with bcrypt</li>
              <li>Constitution-compliant security</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
