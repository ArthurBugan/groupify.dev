import Image from "next/image";
import Link from "next/link";
import UseClient from "@/components/ui/use-client";

import { Links } from "./links";
import SpotifyCard from "@/components/ui/spotify-card";
import DonationCard from "@/components/ui/donation-card";

export default function SidecarContent() {
  return (
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

      <div className="mt-auto p-4 space-y-2 relative">
        <SpotifyCard />
        <UseClient>
          <DonationCard />
        </UseClient>
      </div>
    </div>
  );
}
