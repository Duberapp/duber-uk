import React from "react";
import Loader from "../../../public/assets/loader.json";

const LogoLoading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loader,
    renderer: "svg",
  };

  return (
    <div className="">
      {/* <Lottie
                options={defaultOptions}
                height={1366}
                width={768}
            /> */}
      Logo Loading Page
    </div>
  );
};

export default LogoLoading;
