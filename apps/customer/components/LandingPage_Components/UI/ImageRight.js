import Image from "next/image";
import React from "react";

const ImageRight = (props) => {
  return (
    <div className="grid md:grid-cols-2 grid-flow-row-dense my-8 md:space-x-10 justify-items-center items-center text-center md:text-left">
      <div className="max-w-xs text-navyBlue">
        <p className="text-xl uppercase font-bold">{props.title}</p>
        <p className="md:mt-8 mt-4 text-sm font-normal pb-5 md:pb-0">
          {props.description}
        </p>
      </div>
      <div className="w-72">
        <Image alt="Map of UK" src={props.image} width={350} height={426} />
      </div>
    </div>
  );
};

export default ImageRight;
