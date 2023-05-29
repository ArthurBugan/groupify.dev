import React from "react";
import Container from "./container";

interface SectionTitleProps {
  align?: string;
  pretitle?: string;
  title?: string;
  children?: JSX.Element;
}

const SectionTitle: React.FC<SectionTitleProps> = (props) => {
  return (
    <Container
      className={`flex w-full flex-col mt-4 ${
        props.align === "left" ? "" : "items-center justify-center text-center"
      }`}
    >
      <>
        {props.pretitle && (
          <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
            {props.pretitle}
          </div>
        )}

        {props.title && (
          <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
            {props.title}
          </h2>
        )}

        {props.children && props.children}
      </>
    </Container>
  );
};

export default SectionTitle;
