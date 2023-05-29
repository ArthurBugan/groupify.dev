"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { i18n } from "../../../i18n-config";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function LocaleSwitcher() {
  const pathName = usePathname();

  const [locale, setLocale] = useState(pathName.replaceAll("/", ""));

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div>
      <Select
        onValueChange={() => {
          redirect(redirectedPathName(locale));
        }}
        value={locale}
      >
        <SelectTrigger aria-label="Select language" className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {i18n.locales.map((locale) => (
            <SelectItem className="cursor-pointer" key={locale} value={locale}>
              <Link href={redirectedPathName(locale)}>
                <Image
                  width={24}
                  height={24}
                  alt={`Flag for ${locale}`}
                  src={`images/${locale}.svg`}
                />
              </Link>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
