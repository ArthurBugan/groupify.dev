import Image from "next/image";

import React from "react";
import Container from "./container";

interface BenefitsProps {
  imgPos?: string;
  data: {
    imgPos?: string;
    title?: string;
    desc?: string;
    image: string;
    bullets: any[];
  };
}

const Benefits: React.FC<BenefitsProps> = (props) => {
  const { data } = props;
  return (
    <>
      <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap">
        <>
          <div
            className={`flex items-center justify-center w-full lg:w-1/2 ${
              props.imgPos === "right" ? "lg:order-1" : ""
            }`}
          >
            <div>
              <Image
                src={data.image}
                width="521"
                height="1"
                alt="Benefits"
                priority
                className={"object-cover w-auto"}
              />
            </div>
          </div>

          <div
            className={`flex flex-wrap items-center w-full lg:w-1/2 ${
              data.imgPos === "right" ? "lg:justify-end" : ""
            }`}
          >
            <div>
              <div className="flex flex-col w-full mt-4">
                <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
                  {data.title}
                </h3>

                <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
                  {data.desc}
                </p>
              </div>

              <div className="w-full mt-5">
                {data.bullets.map((item, index) => (
                  <Benefit key={index} title={item.title} icon={item.icon}>
                    {item.desc}
                  </Benefit>
                ))}
              </div>
            </div>
          </div>
        </>
      </Container>
    </>
  );
};

interface BenefitProps {
  icon: JSX.Element;
  title: string;
  children: JSX.Element;
}

const Benefit: React.FC<BenefitProps> = (props) => {
  return (
    <>
      <div className="flex items-start space-x-3 hover:bg-slate-200 dark:hover:bg-slate-900 p-4 rounded">
        <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 ">
          {React.cloneElement(props.icon, {
            className: "w-7 h-7 text-indigo-50",
          })}
        </div>
        <div>
          <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
            {props.title}
          </h4>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            {props.children}
          </p>
        </div>
      </div>
    </>
  );
};

export default Benefits;
