"use client";

import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import ThemeChanger from "./theme-switch";
import DashboardMenu from "../ui/dashboard-menu";

const DisclosureComponents = ({ showLanguage, dictionary }: any) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div className="flex-1	flex lg:hidden flex-wrap items-center justify-between w-full lg:w-auto">
            <Link href={"/"}>
              <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                <span>
                  <Image
                    src="/images/logo.svg"
                    alt="G"
                    width="32"
                    height="32"
                    className="w-8"
                  />
                </span>
                <span>Groupify</span>
              </span>
            </Link>

            <div className="flex flex-1 flex-row">
              <Disclosure.Button
                aria-label="Toggle Menu"
                className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-slate-100 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-indigo-600"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {open && (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                    />
                  )}
                  {!open && (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  )}
                </svg>
              </Disclosure.Button>
            </div>

            <div className="lg:hidden block flex-none ml-4">
              <ThemeChanger />
            </div>

            <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
              <>
                <DashboardMenu />
                {dictionary.navigation?.map((item: any, index: any) => (
                  <Link
                    key={item}
                    href={"/#" + item}
                    className="w-full inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                  >
                    {item}
                  </Link>
                ))}
                {dictionary.pages?.map((menu: any, index: any) => (
                  <Link
                    key={menu.slug}
                    href={"/" + menu.slug}
                    className="w-full inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                  >
                    {menu.name}
                  </Link>
                ))}
                <Link
                  about="_blank"
                  href="https://chrome.google.com/webstore/detail/groupify/dmdgaegnpjnnkcbdngfgkhlehlccbija?utm_source=groupify-lp"
                  className="w-full inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  Install for free
                </Link>
              </>
            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default DisclosureComponents;
