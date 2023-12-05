import React, { useState, useEffect } from "react";
import {
  AdminProvider,
  DashboardLayout,
  LoadingSpinner,
  JobDetails_Sidebar,
  DropdownSelector,
} from "../../../../components";
import JobCard from "../../../../components/Dashboard_Components/JobCard";
import { getJobListing } from "../../../../config/supabaseFunctions";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const Index = () => {
  const [orders_solid, setOrders_solid] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState(filterItems[0]);

  // Initialize Data
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        const { data, error } = await getJobListing();

        if (error) throw new Error("Fetch jobs failed !");

        console.log(data);
        setOrders_solid(data);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Handle Filter
  useEffect(() => {
    let filteredList = filterList(orders_solid, activeFilter);
    setOrders(filteredList);
  }, [activeFilter]);

  return (
    <AdminProvider>
      <DashboardLayout>
        {loading && (
          <div className="w-full h-full flex items-center justify-center">
            <LoadingSpinner width={9} height={9} color="teal-500" />
          </div>
        )}

        {!loading && Object.keys(orders).length !== 0 && (
          <div className="flex">
            <div className="w-full mr-[375px] px-3 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                  <p className="text-xl font-semibold">Order</p>

                  {/* Filter */}
                  <DropdownSelector
                    filterItems={filterItems}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Link href="/dashboard" legacyBehavior>
                    <a className="font-medium text-xs text-gray-400">
                      Go to Job Listing
                    </a>
                  </Link>
                  <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-y-5 p-6 bg-white rounded-2xl">
                {orders.map((order) => (
                  <JobCard key={order.JobID} data={order} />
                ))}
              </div>
            </div>

            <div className="">
              <JobDetails_Sidebar />
            </div>
          </div>
        )}
      </DashboardLayout>
    </AdminProvider>
  );
};

export default Index;

const filterItems = [
  { id: 1, label: "Every Status" },
  { id: 2, label: "Available" },
  { id: 3, label: "Live" },
  { id: 4, label: "Completed" },
];

const filterList = (list, term) => {
  switch (term.label) {
    case "Every Status":
      return list;

    case "":
      return list;

    default:
      return list.filter((job) => job.status === term.label);
  }
};
