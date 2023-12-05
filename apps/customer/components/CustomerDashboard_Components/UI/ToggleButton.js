import React from "react";

const ToggleButton = () => {
  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <label htmlFor="toggleB" className="flex items-center cursor-pointer">
          {/* <!-- toggle --> */}
          <div className="relative">
            {/* <!-- input --> */}
            <input type="checkbox" id="toggleB" className="sr-only" />
            {/* <!-- line --> */}
            <div className="block bg-[#e7e7e7] w-12 h-6 rounded-full"></div>
            {/* <!-- dot --> */}
            <div className="dot absolute left-1 top-1 bg-white shadow-lg w-4 h-4 rounded-full transition"></div>
          </div>
          {/* <!-- label --> */}
          <div className="ml-3 text-xs text-gray-700 font-normal">
            Remember Me
          </div>
        </label>
      </div>
    </div>
  );
};

export default ToggleButton;
