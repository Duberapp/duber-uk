import React from "react";
import AdminLayoutProvider from "../../../components/AdminComponents_V2/AdminLayoutProvider";
import { useRouter } from "next/router";

const Bookings = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  return <AdminLayoutProvider />;
};

export default Bookings;
