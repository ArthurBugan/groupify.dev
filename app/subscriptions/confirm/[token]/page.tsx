"use client";

import Link from "next/link";
import { post } from "@/lib/requests";
import { useEffect } from "react";

function DashboardLayout({ params: { token } }: { params: { token: String } }) {
  useEffect(() => {
    try {
      post(`/subscription/confirm/${token}`, JSON.stringify({}), {
        "Content-Type": "application/json",
      });
    } catch (error: any) {}
  });

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Email Confirmed!
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Your account is now active.
          </p>
        </div>
        <div className="flex justify-center" />
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">
            You can now log in to your account and start using our platform.
          </p>
          <Link
            className="mt-4 inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="/login"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
