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

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useSignalValue } from "signals-react-safe";
import { get, post } from "@/lib/requests";

import { DeleteAccount } from "@/components/delete-account";
import { Youtube } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const youtube_session = await get("/check-google-session");

        if (youtube_session.success === "true") {
          let api_channels = await get("/youtube-channels");

          if (api_channels.length === 0) {
            const sync = await post("/sync-channels-from-youtube", {});

            api_channels = await get("/youtube-channels");
          }

          channels.value = api_channels;
        }

        setLoading(false);
      } catch (error: any) {
        setLoading(false);

        channels.value = [];

        if (error?.responseBody?.error === "Session not found") {
          toast({
            duration: 3000,
            variant: "destructive",
            title: "Link your Youtube Account",
            action: (
              <ToastAction altText="Link">
                <a
                  href={`https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20profile%20email%20https://www.googleapis.com/auth/youtube.readonly&client_id=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}&response_type=code&access_type=offline&prompt=consent&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/auth/google_callback`}
                >
                  Link it
                </a>
              </ToastAction>
            ),
            description: "Link it and be able to organize your groups",
          });
        }

        if (error?.status === 401) {
          return router.replace("/login");
        }
      }
    })();
  }, []);

  const items = useSignalValue(channels);

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
        {loading && (
          <div className="flex flex-row">
            <Loader />
            <span className="font-bold text-lg ml-4">Loading</span>
          </div>
        )}

        <DataTable
          emptyStateMessage="Click on the button below to link your Youtube channel and Sync the your Youtube Subscriptions"
          loading={loading}
          columns={columns}
          data={items}
          onRowClick={(row) =>
            window.open(
              `https://youtube.com/channel/${row?.original?.url.replace(
                "@",
                ""
              )}`
            )
          }
        />

        <div className="grid  grid-cols-1 lg:grid-cols-3">
          <a
            className={`${
              items.length === 0 && loading === false ? "block" : "hidden"
            }`}
            href={`https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20profile%20email%20https://www.googleapis.com/auth/youtube.readonly&client_id=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}&response_type=code&access_type=offline&prompt=consent&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/auth/google_callback`}
          >
            <Card className="w-full max-w-3xl mx-auto">
              <CardHeader className="pb-4">
                <CardTitle>Link your youtube subscriptions</CardTitle>
                <CardDescription>
                  Click here to link your Youtube account and sync all your
                  subscriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="sm">
                  Link it!
                </Button>
              </CardContent>
            </Card>
          </a>

          <Card className={`${items.length > 0 ? "block" : "hidden"}`}>
            <CardHeader className="pb-4">
              <CardTitle>Update the channel list</CardTitle>
              <CardDescription>
                Click here if you want to re-sync your Youtube Subscription list
                here on Groupify
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={async () => {
                  setLoading(true);

                  toast({
                    duration: 3000,
                    variant: "success",
                    title: "Resync is progress",
                    description: "Please await! Dont leave the page",
                  });

                  const sync = await post("/sync-channels-from-youtube", {});
                  const api_channels = await get("/youtube-channels");

                  channels.value = api_channels;
                  setLoading(false);

                  toast({
                    duration: 3000,
                    variant: "success",
                    title: "Resync is done",
                    description: "You can now organize all your channels",
                  });
                }}
                className="w-full"
                size="sm"
              >
                Re-Sync
              </Button>
            </CardContent>
          </Card>
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
