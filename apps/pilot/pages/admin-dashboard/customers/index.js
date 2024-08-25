import React, { useEffect, useState } from "react";
import AdminLayoutProvider from "../../../components/AdminComponents_V2/AdminLayoutProvider";
import { UserTypeFilterValues, SubscriptionTypeValues } from "global-constants";
import { FilterDropdown, CustomerCard, Loading } from "ui";
import { useRouter } from "next/router";
import axios from "axios";
import { adminAPIBaseURL } from "../../../utils/adminAPI_SDK";

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const Customers = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState(null);
  const [subscriptionFilter, setSubscriptionFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [staticCustomerData, setStaticCustomerData] = useState([]);
  const [customers, setCustomers] = useState([]);

  // load data
  async function customersRequest() {
    const res = await axios({
      baseURL: adminAPIBaseURL,
      url: `/customers`,
    });

    return res.data;
  }

  async function loadData() {
    try {
      setLoading(true);

      const data = await customersRequest();
      if (data.error) throw data.error;

      setCustomers(data.data.customers);
      setStaticCustomerData(data.data.customers);
      // console.log(data.data.customers);

      setLoading(false);
    } catch (err) {
      toast({
        title: "Something Went Wrong !",
        description: err?.response?.data?.error || err.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  }

  const handleViewCustomer = (customerId) => {
    router.push(`/admin-dashboard/customers/${customerId}`);
  };

  // Effects
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let timeoutId;

    if (!searchTerm) {
      setCustomers(staticCustomerData);
      return;
    }

    function searchData() {
      if (!searchTerm) {
        setCustomers(staticCustomerData);
        return;
      }

      const searchString =
        typeof searchTerm === "string" ? searchTerm : String(searchTerm);

      const isNumeric = /^\d+$/.test(searchString);

      if (isNumeric) {
        // If searchTerm is numeric,
        // Search object in customers array with simillar ID to searchID
        const searchId = parseInt(searchString);

        const filteredCustomers = customers.filter(
          (cust) => cust.customer_id === searchId
        );

        setCustomers(filteredCustomers);
      } else {
        // If searchTerm is not numeric,
        // Search object in customers array with simillar name to searchString
        const filteredCustomers = customers.filter((cust) =>
          cust.name.toLowerCase().includes(searchString.toLowerCase())
        );

        setCustomers(filteredCustomers);
      }
    }

    timeoutId = setTimeout(searchData, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    if (userFilter === null || !userFilter || userFilter === "") {
      setCustomers(staticCustomerData);
      return;
    }

    const filteredCustomers = staticCustomerData.filter(
      (cust) => cust.userType === userFilter.toProperCase()
    );

    setCustomers(filteredCustomers);
  }, [userFilter]);

  useEffect(() => {
    if (
      subscriptionFilter === null ||
      !subscriptionFilter ||
      subscriptionFilter === ""
    ) {
      setCustomers(staticCustomerData);
      return;
    }

    const filteredCustomers = staticCustomerData.filter((cust) => {
      if (subscriptionFilter === "inactive") {
        return cust.subscriptions === 0;
      } else if (subscriptionFilter === "active") {
        return cust.subscriptions !== 0;
      }
    });

    setCustomers(filteredCustomers);
  }, [subscriptionFilter]);

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
      {loading ? (
        <div className="w-full h-full flex items-center justify-center flex-1">
          <div className="mt-6 bg-slate-50 p-3 rounded-full shadow-lg">
            <Loading className="h-6 w-6 animate-spin text-duber-navyBlue" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {customers &&
            customers.length > 0 &&
            customers.map((cust) => (
              <CustomerCard
                key={cust.customer_id}
                name={cust.name}
                totalBookings={cust.total_bookings}
                userType={cust.userType}
                subscriptions={
                  cust.subscriptions === 0 ? "None" : cust.subscriptions
                }
                customerID={cust.customer_id}
                onView={() => handleViewCustomer(cust.customer_id)}
              />
            ))}
        </div>
      )}
    </AdminLayoutProvider>
  );
};

export default Customers;
