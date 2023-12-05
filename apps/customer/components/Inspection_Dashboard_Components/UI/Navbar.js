import { Bars4Icon, Squares2X2Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import dubericon from "../../../public/assets/Duber Icon.svg";

const Navbar = (props) => {
  return (
    <div className="flex bg-navyBlue rounded-xl p-2 sm:py-3 sm:px-3 lg:px-5 justify-between">
      {/*Welcome Message*/}
      <div className="my-auto hidden lg:block">
        <p className="text-base font-semibold text-white">
          Hey Jamie
          <br />
          <span className="font-normal">Welcome Back</span>
        </p>
      </div>

      {/*Search and view*/}
      <div className="flex space-x-3 lg:space-x-5">
        <div className="bg-white p-2 rounded-xl my-auto w-[55vw] sm:w-[40vw]">
          <input
            className="w-full outline-none text-sm md:text-base"
            type="text"
            placeholder="Search inspections (by address or order id)"
          />
        </div>
        <div className="flex text-white my-auto space-x-2">
          <Squares2X2Icon
            className={`hover:text-primaryTeal my-auto w-8 h-8 sm:h-10 sm:w-10 ${props.view === "grid" ? "text-primaryTeal" : ""}`}
            onClick={() => props.onViewChange("grid")}
          />
          <Bars4Icon
            className={`hover:text-primaryTeal my-auto w-8 h-8 sm:h-10 sm:w-10 ${props.view === "list" ? "text-primaryTeal" : ""}`}
            onClick={() => props.onViewChange("list")}
          />
        </div>
      </div>

      {/*Title and Icon*/}
      <div className="flex space-x-3 lg:space-x-8">
        <div className="my-auto hidden sm:block">
          <h1 className="font-semibold text-white text-lg md:text-xl">
            Visual Inspections
          </h1>
        </div>
        <div className="my-auto w-10 h-10">
          <Image alt="logo" src={dubericon} width={40} height={40} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
