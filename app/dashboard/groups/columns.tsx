"use client";

import { DynamicIcon } from "@/components/ui/icon";

import { getFamily } from "@/lib/utils";

import { ColumnDef } from "@tanstack/react-table";

import { EditGroup } from "@/components/edit-group";
import { DeleteGroup } from "@/components/delete-group";

export type Item = {
  id: string;
  icon: string | any;
  name: string;
  createdAt: string;
  updatedAt: string;
  nChannels: number;
};

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => {
      return (
        <DynamicIcon
          className="text-primary"
          lib={getFamily(row.getValue("icon"))}
          icon={row.getValue("icon")}
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { original } = row;

      return (
        <div className="flex flex-row space-x-2">
          <EditGroup type="edit" formValues={{ ...original, channels: [] }} />
          <DeleteGroup formValues={{ ...original, channels: [] }} />
        </div>
      );
    },
  },
];
