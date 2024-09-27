"use client";

import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HelpCircle, PictureInPicture, Video } from "lucide-react";

export function Links() {
  const path = usePathname();

  return (
    <>
      <Link
        className={twMerge(
          path.includes("groups") && "bg-gray-100 dark:bg-gray-800",
          "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50"
        )}
        href="/dashboard/groups"
      >
        <Video className="h-4 w-4" />
        Groups
      </Link>
      <Link
        className={twMerge(
          path.includes("channels") && "bg-gray-100 dark:bg-gray-800",
          "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50"
        )}
        href="/dashboard/channels"
      >
        <PictureInPicture className="h-4 w-4" />
        Channels
      </Link>
      <Link
        className={twMerge(
          path.includes("tutorial") && "bg-gray-100 dark:bg-gray-800",
          "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50"
        )}
        target="_blank"
        href="https://www.youtube.com/watch?v=qPte0llTKM0?utm_source=groupify_dashboard"
      >
        <HelpCircle className="h-4 w-4" />
        Tutorial
      </Link>
    </>
  );
}
