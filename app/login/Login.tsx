"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PasswordInput } from "@/components/ui/password-input";

import { post } from "@/lib/requests";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
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
    const formData = new FormData();
    setError({ error: "" });

    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const resp = await post("/authorize", formData);
      localStorage.setItem("Authorization", resp.access_token);

      router.push("/dashboard/groups");
    } catch (error: any) {
      setError(error);
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email and password to access your account.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="email@example.com"
              required
              type="email"
              {...register("email")}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <PasswordInput id="password" required {...register("password")} />
          </div>
          <Button disabled={loading} className="w-full" type="submit">
            Sign in
          </Button>
        </form>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          <Link
            className="text-sm font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-300"
            href="/forget-password"
          >
            Forgot Password?
          </Link>
        </p>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            className="text-sm font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-300"
            href="/register"
          >
            Register
          </Link>
        </p>
        {error.error && (
          <Alert variant="default">
            <AlertTitle>Oops, something went wrong!</AlertTitle>
            <AlertDescription>
              Please check your email and password and try again.
            </AlertDescription>
          </Alert>
        )}
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default Login;
