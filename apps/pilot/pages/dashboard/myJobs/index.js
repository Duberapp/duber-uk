import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  DashboardLayout,
  JobListLayout,
  LoadingSpinner,
  BillingAlert,
} from "../../../components";
import { errorToast } from "../../../components/UI/Toast";
import { getJobListing } from "../../../config/supabaseFunctions";

const MyJobs = () => {
  const [jobListing, setJobListing] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize pilot jobs
  useEffect(() => {
    const initializeMyJobs = async () => {
      try {
        setLoading(true);

        const { data, error } = await getJobListing();
        if (error) throw new Error("Error: Cannot fetch pilot jobs");

        setJobListing(data);
        setLoading(false);
      } catch (err) {
        errorToast(err.message);
      }
    };

    // Run functions
    initializeMyJobs();
  }, []);

  return (
    <DashboardLayout
      headerComponent={
        <div className="lg:hidden w-full z-10 fixed flex items-center justify-center bg-white shadow-md">
          <img
            src={"/assets/Duber logo.svg"}
            alt="logo"
            className="w-32 mt-4 mb-4"
          />
        </div>
      }
    >
      <Toaster position="top-center" />

      {loading && (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner width={12} height={12} color={"teal-500"} />
        </div>
      )}
      {!loading && (
        <div className="">
          <BillingAlert />
          <JobListLayout data={jobListing} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyJobs;
