import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";

import { Links } from "./links";
import { Heart } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <Image
                src="/images/logo.svg"
                alt="N"
                width="32"
                height="32"
                className="w-5"
              />
              <span className="">Groupify</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Links />
            </nav>
          </div>

          <div className="mt-auto p-4 space-y-4 relative">
            <Card className="w-full max-w-md overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white">
              <a target="_blank" href="https://ko-fi.com/scriptingarthur">
                <div className="bg-black opacity-10 z-0" />
                <CardHeader className="relative z-10">
                  <CardTitle className="text-3xl font-extrabold text-center mb-2">
                    Be a Hero Today!
                  </CardTitle>
                  <p className="text-center text-lg font-medium">
                    Your kindness can move mountains
                  </p>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="relative">
                      <Heart
                        className="w-24 h-24 text-red-400"
                        fill="currentColor"
                      />
                      <Heart className="w-24 h-24 text-red-400 absolute inset-0" />
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-black tracking-tighter">
                        From $1
                      </span>
                    </div>
                    <p className="text-xl font-semibold text-center max-w-xs">
                      You help me bring more cool features to Groupify
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="relative z-10">
                  <Button className="w-full bg-white text-purple-600 hover:bg-purple-100 font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                    Donate Now
                  </Button>
                </CardFooter>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-20 z-0" />
              </a>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-screen lg:w-auto">{children}</div>
    </div>
  );
}
