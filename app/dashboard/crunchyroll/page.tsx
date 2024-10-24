"use client";

import { useEffect, useState } from "react";
import { channels } from "@/lib/signals";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

import ThemeChanger from "@/components/old/theme-switch";
import { DataTable } from "@/components/data-table";
import { get, post } from "@/lib/requests";

import { DeleteAccount } from "@/components/delete-account";
import { ArrowRight, CheckCircle, Youtube } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const logout = async () => {
    await post("/logout", {});
    location.reload();
  };

  const support = () => {
    window.open("https://www.youtube.com/watch?v=2S1y5RxFUMc");
  };

  return (
    <>
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <Button className="lg:hidden" size="icon" variant="outline">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
        <div className="w-full flex-1"></div>
        <ThemeChanger />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
              size="icon"
              variant="ghost"
            >
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="100" cy="100" r="90" fill="#F9E3C0" />
                <circle cx="100" cy="80" r="60" fill="#F2C78D" />
                <circle cx="80" cy="70" r="8" fill="#231F20" />
                <circle cx="120" cy="70" r="8" fill="#231F20" />
                <path
                  d="M 80 100 Q 100 120 120 100"
                  fill="none"
                  stroke="#231F20"
                  strokeWidth="4"
                />
                <rect x="80" y="110" width="40" height="60" fill="#F2C78D" />
                <rect x="60" y="110" width="20" height="40" fill="#F2C78D" />
                <rect x="120" y="110" width="20" height="40" fill="#F2C78D" />
                <rect x="85" y="170" width="15" height="30" fill="#F2C78D" />
                <rect x="100" y="170" width="15" height="30" fill="#F2C78D" />
              </svg>

              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={support}>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DeleteAccount />
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl font-bold">
              Introducing: Crunchyroll
            </CardTitle>
            <CardDescription>
              Soon create groups from animes on Crunchyroll
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Our new integration is just around the corner! In just a few more
              days, you'll be able to interact with Crunchyroll, create groups,
              and enjoy a seamless experience similar to what you're used to on
              YouTube, perfectly adapted to Crunchyroll's interface.
            </p>
            <h3 className="text-lg font-semibold mt-4">Key Features:</h3>
            <ul className="space-y-2">
              {[
                "Effortless Crunchyroll integration.",
                "Create and manage groups of animes",
                "Seamless user interface adaptation.",
                "Share your collections with your friends and collaborate.",
              ].map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-sm text-muted-foreground">Coming soon</p>
          </CardFooter>
        </Card>

        <Card className="w-full max-w-3xl mx-auto">
          <a target="_blank" href="https://ko-fi.com/scriptingarthur">
            <CardHeader className="pb-4">
              <CardTitle>Want more features?</CardTitle>
              <CardDescription>
                Buy me a coffee on Ko-fi! Your support keeps me motivated and
                helps fund my next big project.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="sm">
                Donate
              </Button>
            </CardContent>
          </a>
        </Card>
      </main>
    </>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
