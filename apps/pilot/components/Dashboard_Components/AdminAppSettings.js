import React from "react";
import { AdminProvider, DashboardLayout } from "../";
import { useRouter } from "next/router";

const AdminAppSettings = ({ children }) => {
  const router = useRouter();

  return (
    <AdminProvider>
      <DashboardLayout>
        <div className="p-3">
          {/* Navigation Bar */}
          <div className="flex items-center gap-x-3 mb-8">
            <NavItem title={"Referrals"} endpointSlug={"referrals"} />
            <NavItem title={"Payment Data"} endpointSlug={"payment-data"} />
          </div>

          <div className="mx-2">{children}</div>
        </div>
      </DashboardLayout>
    </AdminProvider>
  );
};

export default AdminAppSettings;

const NavItem = ({ title, endpointSlug }) => {
  const router = useRouter();
  const isAction =
    window.location.pathname ===
    `/dashboard/admin/app-settings/${endpointSlug}`;

  return (
    <button
      onClick={() =>
        router.push(`/dashboard/admin/app-settings/${endpointSlug}`)
      }
      className={`px-4 py-2 text-sm rounded-full ${
        isAction
          ? "bg-navyBlue text-white"
          : "bg-transparent text-navyBlue border border-navyBlue"
      }`}
    >
      {title}
    </button>
  );
};
