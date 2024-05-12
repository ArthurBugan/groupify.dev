"use client";

import { useRouter } from "next/navigation";
import { sendToBackgroundViaRelay } from "@plasmohq/messaging";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

import { get } from "@/lib/requests";
import { useEffect, useState } from "react";
import { getFamily } from "@/lib/utils";
import { DynamicIcon } from "@/components/ui/icon";

type Item = {
  id: string;
  icon: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export default function Page() {
  const router = useRouter();
  const [items, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await get("/groups", {
          "Content-Type": "application/json",
        });

        setData(data);

        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(";");

        ca.find((c) => c.includes("auth-token"))?.trim?.();

        await sendToBackgroundViaRelay({
          extensionId: "jnfmgkehbfbcajcpcfhjbcjdjffiejln",
          name: "save-auth" as never,
          body: {
            token: ca,
            uid: "lala",
            refreshToken: "lalala",
          },
        });
      } catch (error: any) {
        if (error?.status === 401) {
          return router.replace("/login");
        }
      }
    })();
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Created At</TableHead>
              <TableHead className="hidden md:table-cell">Updated At</TableHead>
              <TableHead className="hidden md:table-cell">
                N° Channels
              </TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item: Item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <DynamicIcon
                    className="text-primary"
                    lib={getFamily(item.icon)}
                    icon={item.icon}
                  />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.updatedAt}
                </TableCell>
                <TableCell className="hidden md:table-cell">0</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
