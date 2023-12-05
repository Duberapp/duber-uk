import { MapPinIcon, PencilIcon, ShareIcon } from "@heroicons/react/24/outline";
import React from "react";

const AnnotationTools = () => {
  return (
    <div className="w-full flex bg-navyBlue rounded-tl-xl">
      <div className="text-primaryTeal text-sm px-3 py-5">
        <p>Add annotation:</p>
      </div>
      <div className="flex w-full my-auto justify-evenly">
        <MapPinIcon className="w-5 h-5 text-primaryTeal" />
        <PencilIcon className="w-5 h-5 text-primaryTeal" />
        <ShareIcon className="w-5 h-5 text-primaryTeal"/>
      </div>
    </div>
  );
};

export default AnnotationTools;
