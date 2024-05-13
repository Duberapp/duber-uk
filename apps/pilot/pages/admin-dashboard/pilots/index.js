import React from "react";
import AdminLayoutProvider from "../../../components/AdminComponents_V2/AdminLayoutProvider";

const Pilots = () => {
  return (
    <AdminLayoutProvider
      headerComponent={
        <h3 className="text-lg font-semibold text-duber-navyBlue">
          Drone Pilots
        </h3>
      }
    ></AdminLayoutProvider>
  );
};

export default Pilots;
