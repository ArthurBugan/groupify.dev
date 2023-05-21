import Navbar from "./components/navbar";
import Hero from "./components/hero";
import SectionTitle from "./components/section-title";
import Benefits from "./components/benefits";
import Video from "./components/video";
import Testimonials from "./components/testimonials";
import Faq from "./components/faq";
import Cta from "./components/cta";
import Footer from "./components/footer";

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

      <SectionTitle
        pretitle="Watch a video"
        title="Learn how to fullfil your needs"
      >
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          This section is to highlight a promo or demo video of your product.
          Analysts says a landing page with video has 3% more conversion rate.
          So, don&apos;t forget to add one. Just like this.
        </p>
      </SectionTitle>

      <Video />

      <SectionTitle
        pretitle="Testimonials"
        title="Here's what our customers said"
      >
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          Testimonails is a great way to increase the brand trust and awareness.
          Use this section to highlight your popular customers.
        </p>
      </SectionTitle>

      <Testimonials />

      <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          Answer your customers possible questions here, it will increase the
          conversion rate as well as support or chat requests.
        </p>
      </SectionTitle>

      <Faq />
      <Cta />
      <Footer />
    </>
  );
}
