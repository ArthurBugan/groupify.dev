"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";

import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { post } from "@/lib/requests";

import { useForm, SubmitHandler } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password-input";

type Inputs = {
  password: string;
  password_confirmation: string;
};

export default function ForgetPasswordConfirmation({
  token,
}: {
  token: String;
}) {
  const [error, setError] = useState({ error: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setError({ error: "" });

    try {
      await post(`/forget-password/confirm/${token}`, JSON.stringify(data), {
        "Content-Type": "application/json",
      });

      router.push("/success/new-password");
    } catch (error: any) {
      console.log(error);
      setError(error);
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Reset your password
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Enter your new password to reset it.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {" "}
          <div>
            <Label htmlFor="password">New Password</Label>
            <PasswordInput
              id="password"
              placeholder="super secret"
              required
              {...register("password")}
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <PasswordInput
              id="password_confirmation"
              required
              placeholder="super secret"
              {...register("password_confirmation")}
            />
          </div>
          <Button disabled={loading} className="w-full" type="submit">
            Reset password
          </Button>
        </form>
        <div className="text-center">
          <Link
            className="text-sm font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-300"
            href="/login"
          >
            Back to sign in
          </Link>
        </div>
        {error.error && (
          <Alert variant="default">
            <AlertTitle>Oops, something went wrong!</AlertTitle>
            <AlertDescription>
              Please check your password and new password and try again.
            </AlertDescription>
          </Alert>
        )}
        {loading && <Loader />}
      </div>
    </div>
  );
}
