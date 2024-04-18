import React from "react";
import AdminLayoutProvider from "../../components/AdminComponents_V2/AdminLayoutProvider";

const Settings = () => {
  return (
    <AdminLayoutProvider
      headerComponent={
        <h3 className="text-lg font-semibold text-duber-navyBlue">
          App Settings
        </h3>
      }
    ></AdminLayoutProvider>
  );
};

export default Settings;
