"use client";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignalValue } from "signals-react-safe";
import { Star } from "lucide-react";

import { sendToBackgroundViaRelay } from "@plasmohq/messaging";

import { Button } from "@/components/ui/button";
import { columns } from "./columns";

import {
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogClose,
  Dialog,
} from "@/components/ui/dialog";

import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

import { get } from "@/lib/requests";
import ThemeChanger from "@/components/old/theme-switch";

import { groups, groups_channels, channels, ratings } from "@/lib/signals";
import Link from "next/link";
import { DataTable } from "@/components/data-table";
import { EditGroup } from "@/components/edit-group";
import { DeleteAccount } from "@/components/delete-account";

type Item = {
  id: string;
  icon: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export default function Page() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [detect, setDetect] = useState<boolean>();
  const [hover, setHover] = useState(0);
  const rating = useSignalValue<{ value: boolean }>(ratings);
  const group = useSignalValue(groups);
  const channel = useSignalValue(groups_channels);

  const logout = () => {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    location.reload();
  };

  const support = () => {
    window.open("https://www.youtube.com/watch?v=2S1y5RxFUMc");
  };

  useEffect(() => {
    function detectExtensionUsingImage(
      extensionId: string | undefined,
      callback: Function
    ) {
      if (window?.navigator?.userAgent?.indexOf?.("Safari") != -1) {
        return false;
      }

      if (window?.navigator?.userAgent?.indexOf?.("Firefox") != -1) {
        return;
      }

      const img = new Image();
      const src = `chrome-extension://${extensionId}/assets/icon.png`;
      img.src = src;
      img.onload = function () {
        callback(true);
      };
      img.onerror = function () {
        callback(false);
      };
    }

    detectExtensionUsingImage(
      process.env.NEXT_PUBLIC_EXTENSION_ID,
      (isInstalled: boolean) => {
        setDetect(isInstalled);
      }
    );

    (async () => {
      try {
        if (channels.value.length === 0) {
          const api_channels = await get("/youtube-channels");
          channels.value = api_channels;
        }

        setLoading(true);
        const data = await get(`/groups`);
        groups.value = data;
        setLoading(false);

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

  useEffect(() => {
    (async () => {
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");

      let token = ca.find((c) => c.includes("auth-token"))?.trim?.() || "";

      await sendToBackgroundViaRelay({
        extensionId: process.env.NEXT_PUBLIC_EXTENSION_ID,
        name: "save-auth" as never,
        body: {
          token: token,
        },
      });
    })();
  }, []);

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <>
      <Dialog modal={true} open={rating.value === true}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Rate Groupify</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p className="text-lg">
              Are you enjoying Groupify? Leave a comment and rating on your
              browser{" "}
            </p>
            {window?.navigator?.userAgent.indexOf("Safari") != -1 &&
            window?.navigator?.userAgent.indexOf("Chrome") == -1 ? (
              <Link
                target="_blank"
                className="font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-300"
                href="https://apps.apple.com/br/app/groupify-yt-subscriptions/id6714452813?l=en-GB?utm_source=leave-rating"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full p-1 ${
                      hover >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => {
                      rating.value = false;
                      window.open(
                        "https://chromewebstore.google.com/detail/groupify-organize-youtube/dmdgaegnpjnnkcbdngfgkhlehlccbija?utm_source=leave-rating"
                      );
                    }}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`Rate ${star} stars out of 5`}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        hover >= star ? "fill-current" : "fill-none"
                      }`}
                    />
                  </button>
                ))}
              </Link>
            ) : (
              <></>
            )}
            {window?.navigator?.userAgent.indexOf("Firefox") != -1 ? (
              <Link
                target="_blank"
                className="font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-300"
                href="https://addons.mozilla.org/en-US/firefox/addon/groupify-yt-organize/?utm_source=leave-rating"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full p-1 ${
                      hover >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => {
                      rating.value = false;
                      window.open(
                        "https://chromewebstore.google.com/detail/groupify-organize-youtube/dmdgaegnpjnnkcbdngfgkhlehlccbija?utm_source=leave-rating"
                      );
                    }}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`Rate ${star} stars out of 5`}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        hover >= star ? "fill-current" : "fill-none"
                      }`}
                    />
                  </button>
                ))}
              </Link>
            ) : (
              <></>
            )}
            {window?.navigator?.userAgent.indexOf("Chrome") != -1 ? (
              <Link
                target="_blank"
                className="font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-300"
                href="https://chromewebstore.google.com/detail/groupify-organize-youtube/dmdgaegnpjnnkcbdngfgkhlehlccbija?utm_source=leave-rating"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full p-1 ${
                      hover >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => {
                      rating.value = false;
                      window.open(
                        "https://chromewebstore.google.com/detail/groupify-organize-youtube/dmdgaegnpjnnkcbdngfgkhlehlccbija?utm_source=leave-rating"
                      );
                    }}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`Rate ${star} stars out of 5`}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        hover >= star ? "fill-current" : "fill-none"
                      }`}
                    />
                  </button>
                ))}
              </Link>
            ) : (
              <></>
            )}
          </DialogDescription>
          <DialogFooter>
            <DialogClose
              onClick={() => {
                rating.value = false;
                setDetect(true);
              }}
              asChild
            >
              <Button>
                <p>Rate!</p>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
            <DropdownMenuSeparator />
            <DeleteAccount />
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4">
        <DataTable loading={loading} columns={columns} data={group} />
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
