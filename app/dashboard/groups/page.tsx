"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignalValue } from "signals-react-safe";

import { sendToBackgroundViaRelay } from "@plasmohq/messaging";

import { columns } from "./columns";

import { get, post } from "@/lib/requests";

import { groups, groups_channels, channels, ratings } from "@/lib/signals";
import { DataTable } from "@/components/data-table";
import { EditGroup } from "@/components/edit-group";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

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

  const rating = useSignalValue<{ value: boolean }>(ratings);
  const group = useSignalValue(groups);
  const channel = useSignalValue(groups_channels);
  const { toast } = useToast();

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

      try {
        const youtube_session = await get("/check-google-session");

        if (channels.value.length === 0) {
          const sync = await post("/sync-channels-from-youtube", {});
        }
      } catch (error: any) {
        setLoading(false);

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
      <main className="flex flex-1 flex-col gap-4 p-4">
        <DataTable
          onRowClick={() => null}
          loading={loading}
          columns={columns}
          data={group}
        />
        <EditGroup formValues={{ channels: [] }} type="add" />
      </main>
    </>
  );
}
