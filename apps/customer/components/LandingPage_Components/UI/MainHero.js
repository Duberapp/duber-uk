import React from "react";
import Lottie from "react-lottie";
import { CallToAction, VideoModal } from "..";
import * as animationData from "../../../public/assets/droneflying.json"

const MainHero = (props) => {

const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      }

  return (
    <div className="w-full md:flex space-x-4 my-16 relative">
      <div className="w-full md:w-1/2 h-auto my-auto md:px-0 flex justify-center md:justify-start">
        {/*Shapes*/}
        <img
          src="/assets/Dot Ornament.svg"
          alt="Shape 1"
          className="w-60 absolute left-0 top-48 sm:left-20 md:left-0 md:top-72 z-0"
        />
        <img
          src="/assets/Teal Circle.svg"
          alt="Shape 2"
          className="w-40 absolute right-0 top-[-80px] md:right-96 md:w-32 lg:right-[500px] lg:w-40 z-0"
        />
        <img
          src="/assets/Pink Rounded Rectangle.svg"
          alt="Shape 3"
          className="hidden absolute md:block md:right-[-80px] md:top-64 md:w-32 lg:w-40 lg:top-[250px] z-0"
        />

        {/*Titles & Button Coloum*/}
        <div className="space-y-8 lg:space-y-10 w-80 sm:w-[400px] Dot Ornament z-10">
          <h1 className="text-4xl text-center md:text-left text-navyBlue sm:text-5xl">
            {props.title}
          </h1>
          <h3 className="text-center md:text-left text-base font-normal text-slate-500">
            {props.subTitle}
          </h3>
          <div className="w-full flex flex-col sm:flex-row justify-center md:justify-start">
            <div>
              <CallToAction
                buttonLink={props.buttonLink}
                buttonName={props.buttonName}
              />
              <div className="text-xs mt-4 px-4 opacity-70 font-normal w-64 text-center mx-auto md:mx-0">
                <p>
                  {props.smallText}{" "}
                  <span className="font-bold">{props.boldText}</span>
                </p>
              </div>
            </div>
            <div>
              <VideoModal />
            </div>
          </div>
        </div>
      </div>
      {/*Image Coloum*/}
      <div className="w-full md:w-1/2 my-auto flex justify-end">
        <div className="hidden lg:flex">
          <Lottie options={defaultOptions} width={450} height={390} />
        </div>
        <div className="hidden md:flex lg:hidden">
          <Lottie options={defaultOptions} width={350} height={290} />
        </div>
      </div>
    </div>
  );
};

export default MainHero;
