"use client";

import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Links() {
  const path = usePathname();

  console.log(path);
  return (
    <>
      <Link
        className={twMerge(
          path.includes("groups") && "bg-gray-100 dark:bg-gray-800",
          "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50"
        )}
        href="/dashboard/groups"
      >
        <ShoppingCartIcon className="h-4 w-4" />
        Groups
      </Link>
      <Link
        className={twMerge(
          path.includes("channels") && "bg-gray-100 dark:bg-gray-800",
          "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50"
        )}
        href="/dashboard/channels"
      >
        <PackageIcon className="h-4 w-4" />
        Channels
      </Link>
    </>
  );
}

function PackageIcon(props: any) {
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
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function ShoppingCartIcon(props: any) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
