import Image from 'next/image';
import React from 'react'
import { CallToAction, ContentBox } from '..'

const ContentLeft = () => {
  return (
    <div className="mt-20 md:grid grid-cols-2 pb-10">
      <div className="sm:relative text-center md:text-left space-y-6 sm:pb-8 md:pb-0">
        <p className="text-navyBlue text-2xl text-center w-72 mx-auto z-10 sm:text-3xl sm:w-96 md:text-left md:w-full md:text-4xl">
          What aerial operations do duber pilots cover?
        </p>
        <p className="md:mt-4 sm:mt-1 mt-4 text-base font-normal text-navyBlue opacity-70">
          Our <b>skilled pilots</b> are trained to handle a wide range of aerial
          operations, including <b>aerial photography and videography, surveying
          and mapping, inspections,</b> and more.<br/><br/>We use advanced drones and
          cutting-edge technology to provide high-quality aerial imagery and
          data for businesses and organizations. So whatever your aerial needs
          may be, trust the experts at Duber Drone to get the job done. Book a
          pilot on our website today and see the difference our services can
          make.
        </p>
        <div className="md:absolute md:bottom-0 flex justify-center md:justify-start">
          <div className="w-72">
            <CallToAction buttonLink="/hire" buttonName="Book Now From £250" />
          </div>
        </div>
      </div>
      <div className="flex justify-center md:justify-end lg:bg-primaryTealLight rounded-full">
        <div className="w-3/4 mt-8 sm:mt-0 space-y-5">
          <ContentBox
            title="Roof / Building Inspections"
            description="Our pilots are trained to capture data that allow surveyors & roofers to carry out detail inspections."
          />
          <ContentBox
            title="Construction Site Updates"
            description="Book in regular flights to capture photos and videos of the progress of your site"
          />
          <ContentBox
            title="Photography & Videography"
            description="Having a wedding or any other social event? Hire a pilot to get aerial footage."
          />
          <ContentBox
            title="Real Estate Marketing"
            description="Selling a property? superchrage you listing with aerial footage for a fresh new prespective."
          />
        </div>
      </div>
    </div>
  );
}

export default ContentLeft
