import React, { useState } from "react";
import AdminLayoutProvider from "../../../components/AdminComponents_V2/AdminLayoutProvider";
import { useRouter } from "next/router";
import { FilterDropdown, JobCard } from "ui";
import { BookingStatusFilterValues, PilotExpertises } from "global-constants";

const Bookings = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterExpertise, setFilterExpertise] = useState("");

  const handleViewBooking = (jobId, preventRoute) => {
    router.push(`/admin-dashboard/bookings/8144516`);
  };

  return (
    <AdminLayoutProvider
      headerComponent={
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-x-5">
            <h3 className="text-lg font-semibold text-duber-navyBlue">
              Bookings
            </h3>

            <input
              type="text"
              placeholder="Search Booking, Customer & Pilot ID"
              className="placeholder:text-slate-400 placeholder:font-medium placeholder:text-sm text-slate-700 bg-transparent w-96 outline-none text-sm font-semibold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-x-3">
            <FilterDropdown
              placeholder="Filter by Status"
              dropdownLabel="Select Booking Status to Filter"
              items={BookingStatusFilterValues}
              value={filterStatus}
              setValue={setFilterStatus}
            />
            <FilterDropdown
              placeholder="Filter by Expertise"
              dropdownLabel="Select Pilot Expertise to Filter"
              items={PilotExpertises}
              value={filterExpertise}
              setValue={setFilterExpertise}
            />
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-y-5">
        <JobCard
          expertise="marketing"
          jobID={"12345"}
          jobDate={new Date()}
          isAdmin
          jobLocation="59, Washbrook Road, Portsmouth, UK"
          jobStatus="Available"
          onClick={handleViewBooking}
        />
        <JobCard
          expertise="marketing"
          jobID={"12345"}
          jobDate={new Date()}
          isAdmin
          jobLocation="59, Washbrook Road, Portsmouth, UK"
          jobStatus="Available"
          onClick={handleViewBooking}
        />
        <JobCard
          expertise="marketing"
          jobID={"12345"}
          jobDate={new Date()}
          isAdmin
          jobLocation="59, Washbrook Road, Portsmouth, UK"
          jobStatus="Available"
          onClick={handleViewBooking}
        />
        <JobCard
          expertise="marketing"
          jobID={"12345"}
          jobDate={new Date()}
          isAdmin
          jobLocation="59, Washbrook Road, Portsmouth, UK"
          jobStatus="Available"
          onClick={handleViewBooking}
        />
        <JobCard
          expertise="marketing"
          jobID={"12345"}
          jobDate={new Date()}
          isAdmin
          jobLocation="59, Washbrook Road, Portsmouth, UK"
          jobStatus="Available"
          onClick={handleViewBooking}
        />
      </div>
    </AdminLayoutProvider>
  );
};

export default Bookings;
