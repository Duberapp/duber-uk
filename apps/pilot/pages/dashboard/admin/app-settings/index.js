import React, { useEffect } from "react";
import AdminAppSettings from "../../../../components/Dashboard_Components/AdminAppSettings";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/admin/app-settings/referrals");
  }, []);

  return <AdminAppSettings></AdminAppSettings>;
};

export default Index;
