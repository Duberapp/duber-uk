import React from "react";
import { ClockIcon, BanknotesIcon, LifebuoyIcon, WalletIcon } from "@heroicons/react/24/outline";

const ContentBoxes = (props) => {
  return (
    <div className="w-full md:flex pt-20 pb-10">
     <img
        src="/assets/Pink Rounded Rectangle.svg"
        alt="Shape 4"
        className="w-32 hidden md:block absolute left-[-20px] top-[750px] rotate-180 z-0 md:left-[-20px] md:top-[1100px] lg:left-0 lg:top-[1150px] "
      />
      <img
        src="/assets/Teal Rectangle.svg"
        alt="Shape 5"
        className="w-full hidden md:block absolute  right-[-100px] top-[1000px] sm:top-[1000px] md:right-[-350px] md:top-[800px] lg:w-[1200px] lg:right-[-130px] lg:top-[900px]"
      />
      <img
        src="/assets/Dot Ornament.svg"
        alt="Shape 6"
        className="w-90 hidden md:block absolute left-0 top-[1300px] md:left-[-100px] lg:left-0 lg:top-[1400px]"
      />
      <img
        src="/assets/Blue Circle.svg"
        alt="Shape 7"
        className="w-90 hidden lg:block absolute top-[1600px] right-20"
      />
      <div className="my-auto flex justify-center md:justify-start md:w-1/2 sm:pb-8 md:pb-0">
        {/*Titles*/}
        <div className="space-y-5 z-10">
          <h2 className="text-navyBlue text-2xl text-center w-72 mx-auto z-10 sm:text-3xl sm:w-96 md:w-full md:text-4xl md:text-left md:w-[350px] md:mx-0">
            Why become a Duber Drone Pilot?
          </h2>
          <h3 className="text-center text-base font-normal text-slate-500 w-80 mx-auto sm:w-[500px] md:text-left md:w-[350px]">
            Pilots who use Duber come from all industries, setting their own
            schedule to make work fit into their lives.
          </h3>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex-row sm:flex space-y-5 sm:space-x-5 pb-5 sm:pb-0">
          {/*Titles & Button Coloum*/}
          <div className="space-y-4 space-x-4 bg-white rounded-2xl p-4 drop-shadow-md flex z-10 h-fit sm:w-1/2 md:block md:space-x-0 lg:py-10">
            <div className="bg-primaryBlueLight rounded-2xl p-3 my-auto md:mx-auto md:w-fit">
              <ClockIcon className="w-12 h-12 text-primaryBlue stroke-2 lg:w-16 lg:h-16" />
            </div>
            <div className="w-auto flex-row lg:space-y-4">
              <h4 className="font-navyBlue text-lg md:text-center sm:w-32 lg:text-xl lg:w-48 md:mx-auto">
                Set your own hours
              </h4>
              <p className="text-base font-normal text-slate-500 md:text-center lg:w-60 lg:mx-auto">
                If you become a pilot using Duber, you decide when and how often
                you fly.
              </p>
            </div>
          </div>
          <div className="space-y-4 space-x-4 bg-white rounded-2xl p-4 drop-shadow-md flex z-10 h-fit sm:w-1/2 md:block md:space-x-0 lg:py-10">
            <div className="bg-orange-100 rounded-2xl p-3 my-auto md:mx-auto md:w-fit">
              <WalletIcon className="w-12 h-12 text-orange-500 stroke-2 lg:w-16 lg:h-16" />
            </div>
            <div className="w-auto flex-row lg:space-y-4">
              <h4 className="font-navyBlue text-lg sm:w-32 md:text-center lg:text-xl lg:w-48 md:mx-auto">
                Get paid anytime Fast
              </h4>
              <p className="text-base font-normal text-slate-500 md:text-center lg:w-60 lg:mx-auto">
                We’ll transfer your earnings from jobs fortnightly. or cash out
                in the app daily.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex-row sm:flex space-y-5 sm:space-x-5 pb-5 sm:pb-0">
          {/*Titles & Button Coloum*/}
          <div className="space-y-4 space-x-4 bg-white rounded-2xl p-4 drop-shadow-md flex z-10 h-fit sm:w-1/2 md:block md:space-x-0 lg:py-10">
            <div className="bg-pink-100 rounded-2xl p-3 my-auto md:mx-auto md:w-fit">
              <BanknotesIcon className="w-12 h-12 text-pink-500 stroke-2 lg:w-16 lg:h-16" />
            </div>
            <div className="w-auto flex-row lg:space-y-4">
              <h4 className="font-navyBlue text-lg md:text-center lg:text-xl lg:w-48 lg:mx-auto">
                Transparent & Competitive fees
              </h4>
              <p className="text-base font-normal text-slate-500 md:text-center lg:w-60 lg:mx-auto">
                We pay our pilots 60% of the job value, plus the tips. Duber
                keeps the remaining 40%.
              </p>
            </div>
          </div>
          <div className="space-y-4 space-x-4 bg-white rounded-2xl p-4 drop-shadow-md flex z-10 h-fit sm:w-1/2 md:block md:space-x-0 lg:py-10">
            <div className="bg-green-100 rounded-2xl p-3 my-auto md:mx-auto md:w-fit">
              <LifebuoyIcon className="w-12 h-12 text-green-500 stroke-2 lg:w-16 lg:h-16" />
            </div>
            <div className="w-auto flex-row lg:space-y-4">
              <h4 className="font-navyBlue text-lg md:text-center lg:text-xl lg:w-48 lg:mx-auto">
                Get support and training
              </h4>
              <p className="text-base font-normal text-slate-500 md:text-center lg:w-60 lg:mx-auto">
                Our support team are always with you. We offer training to
                improve you drone skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentBoxes;
