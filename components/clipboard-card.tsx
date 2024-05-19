"use client";

import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

import { useToast } from "@/components/ui/use-toast";

export default function ClipboardCard() {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        "0x795AF809fDf39458ab5a49639793c1a10BFaFF7B"
      );

      toast({
        duration: 3000,
        variant: "success",
        title: "Address copied.",
        description: "Thank you and keep using Groupify!",
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Donate Crypto</CardTitle>
        <CardDescription className="break-words">
          Use the address below to donate:{" "}
          <span className="font-bold">
            0x795AF809fDf39458ab5a49639793c1a10BFaFF7B
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" size="sm" onClick={copyToClipboard}>
          Copy address
        </Button>
      </CardContent>
    </Card>
  );
}
