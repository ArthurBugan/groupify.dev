"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PasswordInput } from "@/components/ui/password-input";

import { language } from "@/lib/signals";

import { post } from "@/lib/requests";

import { useForm, SubmitHandler } from "react-hook-form";
import { useSignalValue } from "signals-react-safe";

import pt from "../../dictionaries/pt.json";
import en from "../../dictionaries/en.json";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [error, setError] = useState({ error: "" });
  const [loading, setLoading] = useState(false);
  const lang = useSignalValue(language);
  const router = useRouter();

  let dictionary = lang === "pt" ? pt : en;

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
      router.push("/dashboard/groups");
    } catch (error: any) {
      setError(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg">
            {dictionary.login.description}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Email Address
                </Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    required
                    type="email"
                    className="h-12 text-base rounded-xl border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    {...register("email")}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {dictionary.login.password}
                </Label>
                <div className="mt-2">
                  <PasswordInput 
                    id="password" 
                    required 
                    className="h-12 text-base rounded-xl border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    {...register("password")} 
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              
              <Link
                href="/forget-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
              >
                {dictionary.login.forget_password}
              </Link>
            </div>

            <Button 
              disabled={loading} 
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
              type="submit"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                dictionary.login.signin
              )}
            </Button>
          </form>

          {/* Error Alert */}
          {error.error && (
            <div className="mt-6">
              <Alert variant="default" className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                <AlertTitle className="text-red-800 dark:text-red-400">{dictionary.login.error_title}</AlertTitle>
                <AlertDescription className="text-red-700 dark:text-red-300">{dictionary.login.error_body}</AlertDescription>
              </Alert>
            </div>
          )}

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {dictionary.login.no_account}{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
              >
                {dictionary.login.register}
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Protected by industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
