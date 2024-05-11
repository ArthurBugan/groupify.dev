import "server-only";

import Navbar from "@/components/old/navbar";
import Login from "./Login";

import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

export default async function LoginPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Navbar showLanguage={false} dictionary={dictionary} />
      <Login />
    </>
  );
}
