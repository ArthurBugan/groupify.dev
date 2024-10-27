"use client";
import { post } from "@/lib/requests";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./dropdown-menu";

export default function MenuContent() {
  const logout = async () => {
    await post("/logout", {});
    location.reload();
  };

  const support = () => {
    window.open("https://www.youtube.com/watch?v=A2UDaMMP0Uk");
  };

  return (
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={support}>Support</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  );
}
