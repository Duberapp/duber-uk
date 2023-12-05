import React from "react";

const VideoLeft = (props) => {
  return (
    <div className="w-full flex flex-col-reverse pt-10 pb-10 sm:pt-36 sm:pb-36 md:flex-row ">
      <img src="/assets/Teal Small Rectangle.svg" alt="Shape 8" className="w-32 hidden lg:block absolute right-[800px] top-[1850px]"/>
      <img src="/assets/Pink Circle.svg" alt="Shape 9" className="w-32 hidden lg:block absolute right-[1000px] top-[2050px]"/>
      <div className="my-auto flex justify-center rounded-2xl w-full md:w-2/5 z-10">
        {/*Titles & Button Coloum*/}
        <iframe
          src="https://player.vimeo.com/video/765742387?h=adedff070b&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          title="How to use the duber pilot app"
          className="w-[450px] h-[250px]"
        ></iframe>
      </div>
      <div className="my-auto flex w-full pb-10 md:pb-0 md:w-3/5">
        {/*Titles & Button Coloum*/}
        <div className="space-y-5 z-10 mx-auto md:ml-16">
          <h2 className="text-navyBlue text-2xl text-center w-64 mx-auto z-10 sm:text-3xl sm:w-96 md:w-[400px] md:mx-0 md:text-4xl md:text-left lg:w-[500px]">
            How working for Duber Works
          </h2>
          <h3 className="text-center text-base font-normal text-slate-500 w-80 mx-auto sm:w-[500px] md:w-[400px] md:text-left lg:w-[550px]">
            Watch this video to see what happens once you’ve joined Duber,
            here’s what to expect:
          </h3>
        </div>
      </div>
    </div>
  );
};

export default VideoLeft;
