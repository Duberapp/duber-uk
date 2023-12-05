import Image from "next/image";
import React from "react";

const ReviewBar = (props) => {
  return (
    <div className="w-full flex py-24 pb-10 space-x-20">
      <div className="w-full pl-5 md:pl-0">
        {/*Titles & Button Coloum*/}
        <div className="space-y-5 z-10">
          <h2 className="text-navyBlue text-2xl w-72 z-10 sm:text-3xl sm:w-96 md:w-full md:text-4xl">
            Earn £150 per job
          </h2>
          <h3 className="text-base font-normal text-slate-500 w-72">
            £150 is the minimum fee, and can earn up to 60% of the job value.
          </h3>
        </div>
      </div>
      <div className="my-auto hidden md:block w-full"><Image
            alt="Logos"
            src="/assets/Logos.jpg"
            width={720}
            height={60}/></div>
    </div>
  );
};

export default ReviewBar;
