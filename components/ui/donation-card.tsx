"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Heart } from "lucide-react";

export default function Component() {
  const [donationAmount, setDonationAmount] = useState(5);

  return (
    <Card className="w-full max-w-sm overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 shadow-lg border border-purple-200 dark:border-purple-800">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">
            Fuel Groupify
          </h2>
          <div className="relative">
            <Heart className="w-8 h-8 text-pink-500 dark:text-pink-400" />
            <Heart className="w-8 h-8 text-pink-500 dark:text-pink-400 absolute inset-0 animate-ping opacity-75" />
          </div>
        </div>
        <p className="text-sm text-purple-600 dark:text-purple-300 mb-4">
          Your support powers our innovation
        </p>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Amount:
            </span>
            <span className="text-3xl font-extrabold text-purple-800 dark:text-purple-100">
              ${donationAmount}
            </span>
          </div>
          <Slider
            min={1}
            max={50}
            step={1}
            value={[donationAmount]}
            onValueChange={(value) => setDonationAmount(value[0])}
            className="w-full"
          />
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <a
          href={`https://ko-fi.com/scriptingarthur/donate?amount=${donationAmount}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button className="w-full bg-purple-600 dark:text-white/80 dark:bg-purple-900 text-white hover:bg-purple-700 dark:hover:bg-purple-700 font-bold py-3 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
            Donate ${donationAmount} Now
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
