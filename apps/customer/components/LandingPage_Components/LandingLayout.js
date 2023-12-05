import React from "react";
import BottomFooter from "./UI/BottomFooter";
import NavBar from "./UI/NavBar";

const LandingLayout = ({ children, constructionMode }) => {
  return (
    <div>
      <NavBar constructionMode={constructionMode} />
      <div className="max-w-[1050px] m-auto justify-between items-center p-4 text-base font-semibold">
        {children}
      </div>
      <BottomFooter constructionMode={constructionMode} />
    </div>
  );
};

export default LandingLayout;
