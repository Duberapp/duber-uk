import React from "react";
import { LoadingSpinner } from "./index";

const FullScreen_Loading = () => {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <LoadingSpinner width={8} height={8} color="primaryTeal" />
    </div>
  );
};

export default FullScreen_Loading;
