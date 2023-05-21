import Image from "next/image";
import React from "react";
import Container from "./container";

const Testimonials = () => {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <div className="lg:col-span-2 xl:col-auto">
          <div className="flex flex-col justify-between w-full h-full dark:bg-slate-900 bg-gray-100 px-14 rounded-2xl py-14">
            <p className="text-2xl leading-normal ">
              Share a real{" "}
              <Mark>
                <span>testimonial</span>
              </Mark>
              that hits some of your benefits from one of your popular customer.
            </p>

            <Avatar
              image="/images/user1.jpg"
              name="Sarah Steiner"
              title="VP Sales at Google"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full dark:bg-slate-900 bg-gray-100 px-14 rounded-2xl py-14">
            <p className="text-2xl leading-normal ">
              Make sure you only pick the{" "}
              <Mark>
                <span>right sentence</span>
              </Mark>
              to keep it short and simple.
            </p>

            <Avatar
              image="/images/user2.jpg"
              name="Dylan Ambrose"
              title="Lead marketer at Netflix"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full dark:bg-slate-900 bg-gray-100 px-14 rounded-2xl py-14">
            <p className="text-2xl leading-normal ">
              This is an{" "}
              <Mark>
                <span>awesome</span>
              </Mark>{" "}
              landing page template I&apos;ve seen. I would use this for
              anything.
            </p>

            <Avatar
              image="/images/user3.jpg"
              name="Gabrielle Winn"
              title="Co-founder of Acme Inc"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

interface AvatarProps {
  image: string;
  name: string;
  title: string;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <Image src={props.image} width="40" height="40" alt="Avatar" />
      </div>
      <div>
        <div className="text-lg font-medium">{props.name}</div>
        <div className="text-gray-600 dark:text-gray-400">{props.title}</div>
      </div>
    </div>
  );
};

interface MarkProps {
  children: JSX.Element;
}

const Mark: React.FC<MarkProps> = (props) => {
  return (
    <>
      {" "}
      <mark className="text-indigo-600 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-600 dark:bg-indigo-600 dark:text-indigo-200">
        {props.children}
      </mark>{" "}
    </>
  );
};

export default Testimonials;
