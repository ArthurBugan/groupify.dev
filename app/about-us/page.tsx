import Image from "next/image";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Navbar from "@/components/old/navbar";
import { getDictionary } from "@/get-dictionary";
import Footer from "@/components/old/footer";

export default async function AboutUs() {
  const dictionary = await getDictionary("en");

  return (
    <>
      <Navbar showLanguage={false} dictionary={dictionary} />
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container relative p-8 mx-auto xl:px-0">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                  Groupify
                </h1>
              </div>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Groupify is a powerful, free browser extension designed for
                Chromium-based browsers that simplifies managing YouTube
                subscriptions. It enables users to organize their YouTube
                channels into customizable groups and lists, seamlessly
                integrating into the YouTube sidebar for easy access. This tool
                is particularly user-friendly and fully open-source, making it
                accessible to anyone who wants to streamline their YouTube
                experience. By grouping subscriptions, users can effortlessly
                keep track of their favorite channels and enjoy a more organized
                YouTube interface.
              </p>
            </div>
            <Image
              alt="Groupify"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height="550"
              src="/images/logo.svg"
              width="550"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12">
        <div className="container relative p-8 mx-auto xl:px-0">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Story
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Groupify was founded in 2023 hoping to someday become one of the
                best extensions to organize youtube channels and control your
                subscribers.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Values
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Be open source and free for ever
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Team
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We dont have a team Its open source anyone can become a team
                member
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer dictionary={dictionary} />
    </>
  );
}
