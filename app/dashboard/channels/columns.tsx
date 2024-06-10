"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type Item = {
  id: string;
  thumbnail: string | any;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => {
      return (
        <Image
          className="rounded-full"
          alt="Logo of the Youtube channel"
          width={24}
          height={24}
          src={row.getValue("thumbnail")}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      return (
        <>
          {new Date(row.getValue("createdAt")).toLocaleDateString()}{" "}
          {new Date(row.getValue("createdAt")).toLocaleTimeString()}
        </>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
    cell: ({ row }) => {
      return (
        <>
          {new Date(row.getValue("updatedAt")).toLocaleDateString()}{" "}
          {new Date(row.getValue("updatedAt")).toLocaleTimeString()}
        </>
      );
    },
  },
];
