import React, { useState, useRef } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const Accordion = ({ title, content }) => {
  const [isOpened, setOpened] = useState(false);
  const [height, setHeight] = useState("0px");
  const contentElement = useRef(null);

  const HandleOpening = () => {
    setOpened(!isOpened);
    setHeight(!isOpened ? `${contentElement.current.scrollHeight}px` : "0px");
  };
  return (
    <div onClick={HandleOpening} className="mb-10 mx-auto w-full">
      <div
        className={
          "bg-blue-50 p-8 flex justify-between text-navyBlue text-sm sm:text-xl rounded-2xl -mb-5"
        }
      >
        <p className="font-medium text-base">{title}</p>
        {!isOpened ? (
          <ChevronDownIcon className="w-5 h-5" />
        ) : (
          <ChevronUpIcon className="w-5 h-5" />
        )}
      </div>
      <div
        ref={contentElement}
        style={{ height: height }}
        className="bg-blue-50 overflow-hidden transition-all duration-200 rounded-b-2xl"
      >
        <p className="px-8 pb-8 font-normal text-sm">{content}</p>
      </div>
    </div>
  );
};

export default Accordion;
