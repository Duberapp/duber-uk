import React from "react";
import AdminLayoutProvider from "../../../components/AdminComponents_V2/AdminLayoutProvider";
import { useRouter } from "next/router";

const SinglePilot = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AdminLayoutProvider
      headerComponent={
        <h3 className="text-lg font-semibold text-duber-navyBlue">{id}</h3>
      }
    ></AdminLayoutProvider>
  );
};

export default SinglePilot;
