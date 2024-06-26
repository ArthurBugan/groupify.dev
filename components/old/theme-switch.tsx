"use client";
import { get } from "@/lib/requests";
import posthog from "posthog-js";

import React, { useEffect, useState } from "react";
import { language } from "@/lib/signals";

const ThemeChanger = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    get("/language").then((data) => {
      if (data) {
        language.value = data.language;
      }
    });
  }, []);

  useEffect(() => {
    if (
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_POST_HOG_ID
    ) {
      posthog.init(process.env.NEXT_PUBLIC_POST_HOG_ID, {
        api_host: "https://app.posthog.com",
      });
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      return setTheme("dark");
    }

    document.documentElement.classList.remove("dark");
    return setTheme("light");
  }, []);

  if (theme === "") return null;

  return (
    <div className="flex items-center">
      {theme === "dark" ? (
        <button
          onClick={() => {
            document.documentElement.classList.remove("dark");
            setTheme("light");
          }}
          className="text-gray-300 rounded-full outline-none focus:outline-none"
        >
          <span className="sr-only">Light Mode</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </button>
      ) : (
        <button
          onClick={() => {
            document.documentElement.classList.add("dark");
            setTheme("dark");
          }}
          className="text-gray-500 rounded-full outline-none focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus:ring-opacity-20"
        >
          <span className="sr-only">Dark Mode</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ThemeChanger;
