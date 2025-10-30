"use client"; // needed because we'll handle client-side sign-out

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function DashboardPage({ session }) {
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    setLoading(true);
    signOut({ callbackUrl: "/signin" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome, {session?.user?.name}!
        </h1>

        <p className="mb-6 text-gray-600">
          You are logged in as {session?.user?.email}
        </p>

        <button
          onClick={handleSignOut}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md w-full"
        >
          {loading ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </div>
  );
}
