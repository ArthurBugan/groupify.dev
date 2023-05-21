import Link from "next/link";
import Image from "next/image";
import React from "react";
import Container from "./container";

export default function Footer() {
  const navigation = ["Product", "Features", "Pricing", "Company", "Blog"];
  return (
    <div className="relative">
      <Container>
        <>
          <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-slate-700 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div>
                {" "}
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100"
                >
                  <Image
                    src="/images/logo.svg"
                    alt="N"
                    width="32"
                    height="32"
                    className="w-8"
                  />
                  <span>Groupify</span>
                </Link>
              </div>

              <div className="max-w-md mt-4 text-gray-500 dark:text-gray-400">
                Groupify is a free browser extension for chromium based browsers
                to manage your Youtube subscribers list. Its built with Plasmo &
                TailwindCSS
              </div>
            </div>

            <div>
              <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
                {navigation.map((item, index) => (
                  <Link
                    key={index}
                    href="/"
                    className="w-full px-4 py-2 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-slate-700"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div className="">
              <div>Follow us</div>
              <div className="flex mt-5 space-x-5">
                <a
                  className="dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-slate-700"
                  href="https://twitter.com/BuganArthur?utm_source=groupify-lp"
                  target="_blank"
                  rel="noopener"
                >
                  <span className="sr-only">Twitter</span>
                  <Twitter />
                </a>
                <a
                  className="dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-slate-700"
                  href="https://chrome.google.com/webstore/detail/groupify/dmdgaegnpjnnkcbdngfgkhlehlccbija?utm_source=groupify-lp"
                  target="_blank"
                  rel="noopener"
                >
                  <span className="sr-only">Facebook</span>
                  <WebStore />
                </a>
                <a
                  className="dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-slate-700"
                  href="https://github.com/ArthurBugan/groupify?utm_source=groupify-lp"
                  target="_blank"
                  rel="noopener"
                >
                  <span className="sr-only">Instagram</span>
                  <Github />
                </a>
                <a
                  className="dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-slate-700"
                  href="https://linkedin.com/in/arthur-paloczy-bugan?utm_source=groupify-lp"
                  target="_blank"
                  rel="noopener"
                >
                  <span className="sr-only">Linkedin</span>
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>

          <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
            Copyright © {new Date().getFullYear()}. Made with ♥ by{" "}
            <a
              className="text-indigo-500 hover:text-indigo-900 dark:hover:text-slate-200"
              href="https://web3templates.com/"
              target="_blank"
              rel="noopener"
            >
              Arthur Bugan
            </a>
            <div>
              Illustrations from{" "}
              <a
                className="text-indigo-500 hover:text-indigo-900 dark:hover:text-slate-200"
                href="https://undraw.co"
                target="_blank"
                rel="noopener "
              >
                unDraw
              </a>
            </div>
          </div>
        </>
      </Container>
    </div>
  );
}

const Twitter = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z" />
  </svg>
);
const WebStore = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
    />
  </svg>
);
const Github = ({ size = 24 }) => (
  <svg
    role="img"
    width="24"
    height="24"
    className="w-6 h-6"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>GitHub</title>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
  </svg>
);
const Linkedin = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
  </svg>
);
