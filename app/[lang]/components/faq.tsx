"use client";

import React from "react";
import Container from "./container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

interface FaqProps {
  lang: string;
}

const Faq: React.FC<FaqProps> = ({ lang }) => {
  let faq = lang === "en" ? faqData : faqDataPt;

  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faq.map((item) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg dark:bg-slate-900 dark:hover:bg-slate-800 bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
};

const faqData = [
  {
    question: "Is this browser extension completely free to use?",
    answer: "Yes, this browser extension is free to use.",
  },
  {
    question: "Can I donate to the project if I like it?",
    answer: () => (
      <div className="flex flex-row">
        <p>Yes, you can </p>
        <a
          className="ml-1 text-indigo-600 hover:text-indigo-900 underline"
          href="https://ko-fi.com/scriptingarthur"
        >
          Support the project.
        </a>
      </div>
    ),
  },
  {
    question: "Is there any other way to help? ",
    answer: () => (
      <div className="flex flex-row">
        <p>If you're happy remember to star the project on github</p>
        <a
          className="ml-1 text-indigo-600 hover:text-indigo-900 underline"
          href="https://github.com/ArthurBugan/groupify"
        >
          Star us.
        </a>
      </div>
    ),
  },
];

const faqDataPt = [
  {
    question: "Essa extensão de navegador é totalmente gratuita?",
    answer: "Sim, essa extensão de navegador é gratuita para usar.",
  },
  {
    question: "Posso fazer uma doação para o projeto se eu gostar?",
    answer: () => (
      <div className="flex flex-row">
        <p>Sim, você pode </p>
        <a
          className="ml-1 text-indigo-600 hover:text-indigo-900 underline"
          href="https://ko-fi.com/scriptingarthur"
        >
          Apoiar o projeto.
        </a>
      </div>
    ),
  },
  {
    question: "Existe alguma outra maneira de ajudar?",
    answer: () => (
      <div className="flex flex-row">
        <p>
          Se você está satisfeito, lembre-se de dar uma estrela ao projeto no
          GitHub
        </p>
        <a
          className="ml-1 text-indigo-600 hover:text-indigo-900 underline"
          href="https://github.com/ArthurBugan/groupify"
        >
          Nos dê uma estrela.
        </a>
      </div>
    ),
  },
];

export default Faq;
