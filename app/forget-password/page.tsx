import "server-only";

import Navbar from "@/components/old/navbar";
import ForgetPassword from "./ForgetPassword";

import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

export default async function ForgetPasswordPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Navbar showLanguage={false} dictionary={dictionary} />
      <ForgetPassword />
    </>
  );
}
