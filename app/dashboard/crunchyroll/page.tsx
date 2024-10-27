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
    window.open("https://www.youtube.com/watch?v=A2UDaMMP0Uk");
  };

  return (
    <>
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
