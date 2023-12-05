import React from "react";


const SubTitle = (props) => {

  return (
    <div className="w-full pt-14 pb-10">
      <div className="my-auto flex justify-center">
        {/*Titles & Button Coloum*/}
        <div className="space-y-5 z-10">
          <h2 className="text-navyBlue text-2xl text-center w-72 mx-auto z-10 sm:text-3xl sm:w-96 md:w-full md:text-4xl">
            {props.title}
          </h2>
          <h3 className="text-center text-base font-normal text-slate-500 w-80 mx-auto sm:w-[500px]">
            {props.subTitle}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SubTitle;
