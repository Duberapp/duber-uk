import React from 'react'
import { BoltIcon, CheckBadgeIcon, GlobeEuropeAfricaIcon } from "@heroicons/react/24/solid";

const ThreeBoxes = (props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-3/4 mx-auto sm:w-full py-1 md:py-8 text-primaryBlue text-center font-normal text-xs">
      <div className="bg-primaryBlueLight space-y-2 p-8 rounded-md">
        <div className="flex justify-center">
          <BoltIcon className="w-12 h-12 bg-primaryBlue p-2 rounded-md text-white" />
        </div>
        <p className="font-extrabold text-base">{props.oneTitle}</p>
        <div>
          <p>{props.oneText}</p>
          <p>{props.oneText2}</p>
        </div>
      </div>
      <div className="bg-primaryBlueLight space-y-2 p-8 rounded-md">
        <div className="flex justify-center">
          <CheckBadgeIcon className="w-12 h-12 bg-primaryBlue p-2 rounded-md text-white" />
        </div>
        <p className="font-extrabold text-base">{props.twoTitle}</p>
        <div>
          <p>{props.twoText}</p>
          <p>{props.twoText2}</p>
        </div>
      </div>
      <div className="bg-primaryBlueLight space-y-2 p-8 rounded-md">
        <div className="flex justify-center">
          <GlobeEuropeAfricaIcon className="w-12 h-12 bg-primaryBlue p-2 rounded-md text-white" />
        </div>
        <p className="font-extrabold text-base">{props.threeTitle}</p>
        <div>
          <p>{props.threeText}</p>
          <p>{props.threeText2}</p>
        </div>
      </div>
    </div>
  );
}

export default ThreeBoxes