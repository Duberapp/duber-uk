import React from "react";
import AdminLayoutProvider from "../../components/AdminComponents_V2/AdminLayoutProvider";

const Customers = () => {
  return (
    <AdminLayoutProvider
      headerComponent={
        <h3 className="text-lg font-semibold text-duber-navyBlue">Customers</h3>
      }
    ></AdminLayoutProvider>
  );
};

export default Customers;
