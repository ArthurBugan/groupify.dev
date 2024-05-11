"use client";

import Link from "next/link";
import Lottie from "react-lottie";

import * as animationData from "./success.json";

export default function ForgetPasswordSuccess() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <Lottie height={200} width={200} options={defaultOptions} />
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Email sent successful!
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Please check your email for further instructions.
          </p>
        </div>
        <div className="flex justify-center" />
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">
            We've sent you an email with instructions on how to reset your
            password. Please check your inbox and follow the steps to complete
            your registration.
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
