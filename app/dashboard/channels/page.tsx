"use client";

import { useEffect, useState } from "react";
import { channels } from "@/lib/signals";

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

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useSignalValue } from "signals-react-safe";
import { get } from "@/lib/requests";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const api_channels = await get("/youtube-channels");
      channels.value = api_channels;
    })();
  }, []);

  const items = useSignalValue(channels);

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
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="border shadow-sm rounded-lg">
          <DataTable loading={loading} columns={columns} data={items} />
        </div>
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

function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
