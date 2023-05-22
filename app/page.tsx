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

      <SectionTitle pretitle="Groupify Benefits" title=" With this extension:">
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          You can use this cool YouTube extension to create collections that fit
          perfectly into the YouTube layout. It's a super easy way to manage
          your YouTube subscriptions. And Its completely open-source.
        </p>
      </SectionTitle>

      <p id="product" />
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />

      <p id="features" />
      <SectionTitle
        pretitle="Watch a video"
        title="Learn how to use the extension"
      >
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          Don't miss out on any of our product's incredible features! Watch this
          video to learn how to extract the best that our product has to offer.
        </p>
      </SectionTitle>

      <Video />

      <SectionTitle
        pretitle="Testimonials"
        title="Here's what our customers said"
      >
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          See what our users are talking about
        </p>
      </SectionTitle>

      <Testimonials />

      <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          Ensure you have no lingering doubts by checking our comprehensive FAQ
          section.
        </p>
      </SectionTitle>

      <Faq />
      <Cta />
      <Footer />
    </>
  );
}
