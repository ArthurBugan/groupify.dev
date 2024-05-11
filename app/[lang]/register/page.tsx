import "server-only";

import Navbar from "@/components/old/navbar";
import Register from "./Register";

import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

export default async function RegisterPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Navbar showLanguage={false} dictionary={dictionary} />
      <Register />
    </>
  );
}
