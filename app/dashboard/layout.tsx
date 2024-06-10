import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

import { Links } from "./links";
import ClipboardCard from "@/components/clipboard-card";

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
          <div className="mt-auto p-4 space-y-4">
            <Card>
              <a
                target="_blank"
                href="https://patreon.com/scriptingarthur?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink"
              >
                <CardHeader className="pb-4">
                  <CardTitle>Join My Patreon!</CardTitle>
                  <CardDescription>
                    Enjoy my work? Join my Patreon for exclusive content and
                    perks. Your support helps me create more of what you love.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" size="sm">
                    Donate via Patreon
                  </Button>
                </CardContent>
              </a>
            </Card>
            <Card>
              <a target="_blank" href="https://ko-fi.com/scriptingarthur">
                <CardHeader className="pb-4">
                  <CardTitle>Support My Work on Ko-fi!</CardTitle>
                  <CardDescription>
                    Love my content? Buy me a coffee on Ko-fi! Your support
                    keeps me motivated and helps fund my next big project.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" size="sm">
                    Donate
                  </Button>
                </CardContent>
              </a>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}
