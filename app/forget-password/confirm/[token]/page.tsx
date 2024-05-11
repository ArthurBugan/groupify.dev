import "server-only";

import Navbar from "@/components/old/navbar";
import ForgetPasswordConfirmation from "./ForgetPasswordConfirmation";

import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

export default async function ForgetPasswordConfirmationPage({
  params: { lang, token },
}: {
  params: { lang: Locale; token: String };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Navbar showLanguage={false} dictionary={dictionary} />
      <ForgetPasswordConfirmation token={token} />
    </>
  );
}
