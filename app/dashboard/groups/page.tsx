"use client";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { sendToBackgroundViaRelay } from "@plasmohq/messaging";
import { channels } from "@/lib/signals";

import { Button } from "@/components/ui/button";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

import { get } from "@/lib/requests";
import { getFamily } from "@/lib/utils";
import { DynamicIcon } from "@/components/ui/icon";
import ThemeChanger from "@/components/old/theme-switch";
import { EditGroup } from "@/components/edit-group";

import { groups, groups_channels } from "@/lib/signals";
import { useSignalValue } from "signals-react-safe";

type Item = {
  id: string;
  icon: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export default function Page() {
  const router = useRouter();
  const group = useSignalValue(groups);
  const channel = useSignalValue(groups_channels);

  useEffect(() => {
    (async () => {
      try {
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(";");

        let token = ca.find((c) => c.includes("auth-token"))?.trim?.() || "";

        const { status } = await sendToBackgroundViaRelay({
          extensionId: process.env.NEXT_PUBLIC_EXTENSION_ID,
          name: "save-auth" as never,
          body: {
            token: token,
            uid: "lala",
            refreshToken: "lalala",
          },
        });

        console.log("status", status);

        channels.value = status;

        const data = await get(`/groups`);
        groups.value = data;

        let group_channel: any = {};

        for (let g of data) {
          const channel = await get(`/channels/${g.id}`);

          if (typeof group_channel[g.id] === "undefined") {
            group_channel[g.id] = {};
            group_channel[g.id] = channel;
          } else {
            group_channel[g.id] = channel;
          }
        }

        groups_channels.value = group_channel;
      } catch (error: any) {
        if (error?.status === 401) {
          return router.replace("/login");
        }
      }
    })();
  }, []);

  console.log("groups_channels", groups_channels.value);

  return (
    <>
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <Button className="lg:hidden" size="icon" variant="outline">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
        <div className="w-full flex-1">
          <form>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                placeholder="Search groups..."
                type="search"
              />
            </div>
          </form>
        </div>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead className="max-w-[150px]">Name</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created At
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Updated At
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  N° Channels
                </TableHead>
                <TableHead>Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {group?.map((item: Item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <DynamicIcon
                      className="text-primary"
                      lib={getFamily(item.icon)}
                      icon={item.icon}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.createdAt}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.updatedAt}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {groups_channels.value[item.id]?.length}
                  </TableCell>
                  <TableCell className="w-[80px]">
                    <EditGroup
                      type="edit"
                      formValues={{ ...item, channels: [] }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <EditGroup formValues={{ channels: [] }} type="add" />
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
