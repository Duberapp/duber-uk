import React from "react";
import dynamic from "next/dynamic";
import Map from "./UI/Map";
import Navbar from "./UI/Navbar";
import ImagesGrid from "./UI/ImagesGrid";
import AnnotationTools from "./UI/AnnotationTools";

const ImageInspection = dynamic(() => import("./UI/maps/ImageInspection"), {
  ssr: false,
});

const InspectionLayout = (props) => {

  return (
    <div className="relative h-screen p-3 space-y-5">
      <Navbar/>
      <div className="flex space-x-5">
        <div className="w-3/5 flex bg-gray-100 rounded-xl shadow-box">
          <div className="w-[30%] bg-white rounded-bl-xl"><AnnotationTools/></div>
          <div className="w-[70%]">
            <ImageInspection />
          </div>
        </div>
        <div className="w-2/5">
          <Map />
        </div>
      </div>

      <ImagesGrid/>
    </div>
  );
};

export default InspectionLayout;
