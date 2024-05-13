import React, { useState } from "react";
import AdminLayoutProvider from "../../../components/AdminComponents_V2/AdminLayoutProvider";
import { UserTypeFilterValues, SubscriptionTypeValues } from "global-constants";
import { FilterDropdown, CustomerCard } from "ui";
import { useRouter } from "next/router";

const Customers = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState(null);
  const [subscriptionFilter, setSubscriptionFilter] = useState(null);

  const handleViewCustomer = (customerId) => {
    router.push(`/admin-dashboard/customers/${customerId}`);
  };

  return (
    <AdminLayoutProvider
      headerComponent={
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-x-5">
            <h3 className="text-lg font-semibold text-duber-navyBlue">
              Customers
            </h3>

            <input
              type="text"
              placeholder="Search Customer Name, ID"
              className="placeholder:text-slate-400 placeholder:font-medium placeholder:text-sm text-slate-700 bg-transparent w-96 outline-none text-sm font-semibold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-x-3">
            <FilterDropdown
              placeholder="Filter by User Type"
              dropdownLabel="Select type to filter customers"
              items={UserTypeFilterValues}
              value={userFilter}
              setValue={setUserFilter}
            />
            <FilterDropdown
              placeholder="Filter by Subscription Type"
              dropdownLabel="Select type to filter subscription type"
              items={SubscriptionTypeValues}
              value={subscriptionFilter}
              setValue={setSubscriptionFilter}
            />
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-y-4">
        <CustomerCard
          name="Jaime Harris"
          totalBookings={5}
          userType="guest"
          subscriptionType="inactive"
          customerID={234235}
          onView={handleViewCustomer}
        />
        <CustomerCard
          name="Jaime Harris"
          totalBookings={23}
          userType="account"
          subscriptions="23"
          customerID={345346}
          company="Premierseal"
          onView={handleViewCustomer}
        />
      </div>
    </AdminLayoutProvider>
  );
};

export default Customers;
