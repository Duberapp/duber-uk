import React from "react";
import GridBox from "./GridBox";
import Map from "./UI/Map";
import Navbar from "./UI/Navbar";

const DashboardLayout = (props) => {
    
  const [view, setView] = React.useState("grid");

  return (
    <div className="relative h-screen p-3 space-y-5">
      <Navbar view={view} onViewChange={setView} />
      <Map />
      <GridBox view={view} />
    </div>
  );
};

export default DashboardLayout;
