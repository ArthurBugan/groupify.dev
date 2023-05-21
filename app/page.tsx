import Navbar from "./components/navbar";
import Hero from "./components/hero";
import SectionTitle from "./components/section-title";
import Benefits from "./components/benefits";
import { benefitOne, benefitTwo } from "./components/data";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <SectionTitle
        pretitle="Groupify Benefits"
        title=" Why should you use this landing page"
      >
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          Groupify is a free landing page & marketing website template for
          startups and indie projects. Its built with Next.js & TailwindCSS. And
          its completely open-source.
        </p>
      </SectionTitle>
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />
    </>
  );
}
