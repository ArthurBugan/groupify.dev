import Navbar from "@/components/old/navbar";
import Hero from "@/components/old/hero";
import SectionTitle from "@/components/old/section-title";
import Benefits from "@/components/old/benefits";
import Video from "@/components/old/video";
import Faq from "@/components/old/faq";
import Cta from "@/components/old/cta";
import Footer from "@/components/old/footer";
import { headers } from "next/headers";

import { getDictionary } from "@/get-dictionary";
import {
  benefitOne,
  benefitTwo,
  benefitOnePT,
  benefitTwoPT,
} from "@/components/old/data";
import { get } from "@/lib/requests";
import type { Locale } from "../i18n-config";

export default async function Home() {
  const headersList = headers();
  const accept = headersList.get("accept-language");

  const locale: { language: Locale } = await get("/language", {
    "accept-language": accept,
  });

  const dictionary = await getDictionary(locale?.language);

  return (
    <>
      <Navbar dictionary={dictionary} />
      <Hero dictionary={dictionary} />

      <SectionTitle
        pretitle={dictionary.benefits.pretitle}
        title={dictionary.benefits.title}
      >
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          {dictionary.benefits.subtitle}
        </p>
      </SectionTitle>

      <p id={dictionary.navigation[0]} />
      <Benefits data={dictionary.lang == "pt" ? benefitOnePT : benefitOne} />
      <Benefits
        imgPos="right"
        data={dictionary.lang == "pt" ? benefitTwoPT : benefitTwo}
      />

      <p id={dictionary.navigation[1]} />
      <SectionTitle
        pretitle={dictionary.functionality.pretitle}
        title={dictionary.functionality.title}
      >
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          {dictionary.functionality.subtitle}
        </p>
      </SectionTitle>

      <Video />

      <SectionTitle
        pretitle={dictionary.faq.pretitle}
        title={dictionary.faq.title}
      >
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          {dictionary.faq.subtitle}
        </p>
      </SectionTitle>

      <Faq lang={dictionary.lang} />
      <Cta dictionary={dictionary} />
      <Footer dictionary={dictionary} />
    </>
  );
}
