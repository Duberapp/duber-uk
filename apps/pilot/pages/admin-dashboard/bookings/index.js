import React, { useEffect, useState } from "react";
import AdminLayoutProvider from "../../../components/AdminComponents_V2/AdminLayoutProvider";
import { useRouter } from "next/router";
import { FilterDropdown, JobCard, Loading, useToast } from "ui";
import { BookingStatusFilterValues, PilotExpertises } from "global-constants";
import { adminAPIBaseURL } from "../../../utils/adminAPI_SDK";
import axios from "axios";

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const Bookings = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [cancelledBy, setCancelledBy] = useState("");
  const [filterExpertise, setFilterExpertise] = useState("");
  const [bookings, setBookings] = useState([]);
  const { toast } = useToast();

  // set cancelled by
  useEffect(() => {
    if (
      filterStatus === "customer_cancelled" ||
      filterStatus === "pilot_cancelled"
    ) {
      setCancelledBy(filterStatus.split("_")[0]);
    }
  }, [filterStatus]);

  // Fetch data on initial load (2 sec. delay)
  useEffect(() => {
    let timeoutId;

    if (bookings?.data === null) {
      loadData();
    } else {
      timeoutId = setTimeout(loadData, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [searchTerm, filterStatus, filterExpertise]);

  // handle view booking
  const handleViewBooking = (jobId, preventRoute) => {
    router.push(`/admin-dashboard/bookings/${jobId}`);
  };

  // load data
  async function bookingsRequest() {
    let params = {};

    if (searchTerm) params = { ...params, search: searchTerm };
    if (filterStatus)
      params = { ...params, status: filterStatus.toProperCase() };
    if (cancelledBy) params = { ...params, cancelled_by: cancelledBy };
    if (filterExpertise) params = { ...params, expertise: filterExpertise };

    const res = await axios({
      baseURL: adminAPIBaseURL,
      url: `/bookings`,
      params,
    });

    return res.data;
  }

  async function loadData() {
    try {
      setLoading(true);

      const data = await bookingsRequest();
      if (data.error) throw data.error;
      setBookings(data);

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
      {loading ? (
        <div className="w-full h-full flex items-center justify-center flex-1">
          <div className="mt-6 bg-slate-50 p-3 rounded-full shadow-lg">
            <Loading className="h-6 w-6 animate-spin text-duber-navyBlue" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-y-5">
          {bookings.data?.map((booking) => (
            <JobCard
              key={booking.id}
              expertise={booking.pilotExpertize}
              jobID={booking.id}
              jobDate={new Date(booking.date)}
              jobLocation={booking.address}
              jobStatus={booking.status}
              onClick={() => handleViewBooking(booking.id)}
              isAdmin
            />
          ))}
        </div>
      )}
    </AdminLayoutProvider>
  );
};

export default Bookings;
