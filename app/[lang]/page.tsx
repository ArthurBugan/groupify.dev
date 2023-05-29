import Navbar from "./components/navbar";
import Hero from "./components/hero";
import SectionTitle from "./components/section-title";
import Benefits from "./components/benefits";
import Video from "./components/video";
import Faq from "./components/faq";
import Cta from "./components/cta";
import Footer from "./components/footer";

import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import {
  benefitOne,
  benefitTwo,
  benefitOnePT,
  benefitTwoPT,
} from "./components/data";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

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
      <Benefits data={dictionary.lang == "pt-BR" ? benefitOnePT : benefitOne} />
      <Benefits
        imgPos="right"
        data={dictionary.lang == "pt-BR" ? benefitTwoPT : benefitTwo}
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
