import React from "react";
import AdminLayoutProvider from "../../../components/AdminComponents_V2/AdminLayoutProvider";
import { useRouter } from "next/router";

const Bookings = () => {
  const router = useRouter();

  return (
    <AdminLayoutProvider
      headerType={"root"}
      headerComponent={
        <h3 className="text-lg font-semibold text-duber-navyBlue">Bookings</h3>
      }
    >
      <button onClick={() => router.push("/admin-dashboard/bookings/123")}>
        Go to sub page
      </button>
    </AdminLayoutProvider>
  );
};

export default Bookings;
