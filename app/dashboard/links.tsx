"use client";

import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HelpCircle, PictureInPicture, Video } from "lucide-react";
import { FaDrawPolygon } from "react-icons/fa6";
import { Icon } from "@iconify-icon/react";

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
        <Icon
          height={22}
          width={22}
          className="text-red-500"
          icon="mingcute:youtube-fill"
        />
        Youtube Groups
      </Link>
      <Link
        className={twMerge(
          path.includes("channels") && "bg-gray-100 dark:bg-gray-800",
          "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50"
        )}
        href="/dashboard/channels"
      >
        <Icon height={22} width={22} icon="pixelarticons:device-tv" />
        Channels
      </Link>
      <Link
        className={twMerge(
          path.includes("dashboard/crunchyroll") &&
            "bg-gray-100 dark:bg-gray-800",
          "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50"
        )}
        href="/dashboard/crunchyroll"
      >
        <Icon
          height={22}
          width={22}
          className="text-[#F47521]"
          icon="simple-icons:crunchyroll"
        />
        Crunchyroll Groups
      </Link>
      <Link
        className={twMerge(
          path.includes("tutorial") && "bg-gray-100 dark:bg-gray-800",
          "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50"
        )}
        target="_blank"
        href="https://www.youtube.com/watch?v=2S1y5RxFUMc?utm_source=groupify_dashboard"
      >
        <HelpCircle />
        Tutorial
      </Link>
    </>
  );
}
