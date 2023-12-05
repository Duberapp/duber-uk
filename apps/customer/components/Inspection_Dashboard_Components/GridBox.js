import React from "react";
import GridView from "./UI/GridView";
import ListView from "./UI/ListView";

const GridBox = ({ view }) => {
  return (
    <div className="w-full h-[40%] grid grid-cols-1 gap-2 sm:grid-cols-2">
      <div>
        <p className="font-semibold text-base md:text-xl text-navyBlue pb-2">
          Your Inspections By Duber Pilots
        </p>
        {view === "grid" ? <GridView /> : <ListView />}
      </div>
      <div>
        <p className="font-semibold text-base md:text-xl text-navyBlue pb-2">
          Your Uploaded Inspections
        </p>
        <div className="w-full h-[40vh] overflow-auto rounded-xl shadow-box">
          <p>coming soon</p>
      </div>
    </div>
    </div>
  );
};

export default GridBox;
