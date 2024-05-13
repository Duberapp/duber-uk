import React, { useEffect, useState } from "react";
import AdminLayoutProvider from "../../../components/AdminComponents_V2/AdminLayoutProvider";
import { useRouter } from "next/router";
import {
  getSingleJob,
  selectPaymentData,
} from "../../../config/supabaseFunctions";
import { AddToCalender } from "../../../components";
import { RouteIcon, PhoneIcon, Star } from "lucide-react";
import { convertToStandardDateFormat } from "global-constants";
import GoogleMap from "../../../components/GoogleMap";
import { SingleJob_OverviewCard, Loading } from "ui";
import {
  BookingOverviewTab,
  BookingSalesTab,
  BookingDeliverablesTab,
  BookingSettingsTab,
} from "ui/admin";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "ui/shadcn";
import { getUser as getCustomerUserData } from "supabase-config/functions/customer";
import { getPilot as getPilotUserData } from "supabase-config/functions/pilot";

const Bookings = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentJob, setCurrentJob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [includedDuration, setIncludedDuration] = useState(null);
  const [customerUserData, setCustomerUserData] = useState(null);
  const [pilotUserData, setPilotUserData] = useState(null);

  const handleFetchJob = async () => {
    try {
      setIsLoading(true);

      if (!id) throw new Error("Job ID Undefined !");

      // Fetch Job Data
      const { data, error } = await getSingleJob(id);

      if (error) throw error;

      setCurrentJob(data[0]);

      // Fetch Payment Data
      const { data: paymentData, error: paymentDataError } =
        await selectPaymentData();

      if (!paymentDataError) {
        setIncludedDuration(
          paymentData.length > 0 ? paymentData[0].includedDuration : 2
        );
      }

      // fetch customer user data
      const { data: customerUserData, error: customerUserError } =
        await getCustomerUserData(data[0].customerID?.id);
      if (customerUserData && customerUserData.length > 0) {
        setCustomerUserData[customerUserData[0]];
      }

      // fetch pilot user data
      const { data: pilotData, error: pilotUserError } = await getPilotUserData(
        data[0].pilotID
      );

      if (pilotData && pilotData.length > 0) {
        setPilotUserData(pilotData[0]);
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchJob();
  }, [id]);

  return (
    <AdminLayoutProvider
      headerComponent={
        <div className="w-full flex items-center">
          <h3 className="text-lg font-semibold text-duber-pink">#{id}</h3>
        </div>
      }
    >
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center flex-1">
          <div className="mt-6 bg-slate-50 p-3 rounded-full shadow-lg">
            <Loading className="h-6 w-6 animate-spin text-duber-navyBlue" />
          </div>
        </div>
      ) : currentJob === null ? (
        <div className="w-full h-full flex items-center justify-center flex-1">
          <p className="">Error : Something Went Wrong !</p>
        </div>
      ) : (
        <div className="">
          {/* Job Details -> Content and Overview */}
          <div className="flex flex-row gap-x-4">
            {/* Col 01 */}
            <div className="flex-1">
              <SingleJob_OverviewCard
                capability={currentJob.pilotExpertize}
                jobStatus={currentJob.status}
                jobValue={currentJob.amount}
                isAdmin
              />

              {/* Details Section */}
              <div className="mt-3 w-full">
                <div className="flex item-center justify-between">
                  <p className="font-semibold text-duber-navyBlue">
                    Job Details
                  </p>
                  <AddToCalender
                    data={{
                      address: currentJob.address,
                      id: currentJob.id,
                      customerNotes: currentJob.customerNote,
                      date: currentJob.date,
                      arrivalTime: currentJob.date,
                      style: "",
                    }}
                  />
                </div>

                <div className="sm:mt-2 mt-4 flex items-end justify-between">
                  <div className="">
                    <p className="text-xs text-gray-400">
                      Location / Full Address
                    </p>
                    <p className="sm:text-base text-[13px] text-duber-navyBlue">
                      {currentJob.status !== "Completed"
                        ? currentJob.address
                        : currentJob.address.split(",")[
                            currentJob.address.split(",").length - 2
                          ]}
                    </p>
                  </div>

                  {currentJob.status !== "Completed" && (
                    <a
                      className="flex items-center gap-x-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.google.com/maps/place/${currentJob.address}`}
                    >
                      <RouteIcon
                        className="sm:size-4 size-8 sm:p-0 p-1 text-skyBlue sm:rounded-none rounded-lg sm:bg-transparent bg-duber-skyBlue-light"
                        strokeWidth={2}
                      />
                      <p className="text-sm sm:flex hidden underline text-skyBlue cursor-pointer">
                        Open in maps
                      </p>
                    </a>
                  )}
                </div>

                <div className="sm:mt-2 mt-4">
                  <p className="text-xs text-gray-400">Start Date</p>
                  <p className="sm:text-base text-[13px] text-duber-navyBlue">
                    {convertToStandardDateFormat(currentJob.date)}
                  </p>
                </div>

                <div className="sm:mt-2 mt-4 flex items-center">
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">Arrival Time</p>
                    <p className="sm:text-base text-[13px] text-duber-navyBlue">
                      {currentJob.arrivalTime}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">Duration</p>
                    <p className="sm:text-base text-[13px] text-duber-navyBlue">
                      {includedDuration + currentJob.extendDuration} Hours
                    </p>
                  </div>
                </div>

                {currentJob.status !== "Completed" && (
                  <div className="mt-2 flex items-end">
                    <div className="flex-1">
                      <p className="text-xs text-gray-400">Customers Name</p>
                      <p className="sm:text-base text-[13px]  text-duber-navyBlue">
                        {`${currentJob.customerID.title} ${currentJob.customerID.firstName} ${currentJob.customerID.lastName}`}
                      </p>
                    </div>
                    <div className="flex-1 sm:ml-0 ml-3">
                      <p className="text-xs text-gray-400">Company</p>
                      <p className="sm:text-base text-[13px] text-duber-navyBlue">
                        {currentJob.customerID.companyName}
                      </p>
                    </div>
                  </div>
                )}

                <div className="sm:mt-2 mt-4">
                  <p className="text-xs text-gray-400">Job Brief</p>
                  <p className="sm:text-base text-[13px] text-duber-navyBlue">
                    {currentJob.customerNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Col 02 */}
            <div className="sm:flex hidden flex-1 min-h-[300px] overflow-hidden rounded-md">
              {currentJob.mapData.polygon ? (
                <GoogleMap
                  polygons={[currentJob.mapData.polygon]}
                  staticMapType={"roadmap"}
                  mapState={"static"}
                  location={currentJob.mapData.center}
                  areaComponent={
                    <h2 className="font-semibold text-sm text-black">
                      {currentJob.area} m<sup>2</sup>
                    </h2>
                  }
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Loading className={"w-6 h-6 text-duber-navyBlue"} />
                </div>
              )}
            </div>
          </div>

          {/* Tabs Area */}
          <div className="mt-8">
            <Tabs defaultValue="overview" className="w-full h-full rounded-sm">
              <TabsList className="grid w-[600px] h-11 p-1 grid-cols-4">
                <TabsTrigger
                  className="h-full font-semibold text-sm"
                  value="overview"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  className="h-full font-semibold text-sm"
                  value="sales"
                >
                  Sales
                </TabsTrigger>
                <TabsTrigger
                  className="h-full font-semibold text-sm"
                  value="deliverables"
                >
                  Deliverables
                </TabsTrigger>
                <TabsTrigger
                  className="h-full font-semibold text-sm"
                  value="settings"
                >
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <BookingOverviewTab
                  currentJob={currentJob}
                  viewCustomer={() =>
                    router.push(
                      `/admin-dashboard/customers/${currentJob.customerID.id}`
                    )
                  }
                  viewPilot={() =>
                    router.push(`/admin-dashboard/pilots/${currentJob.pilotID}`)
                  }
                  customer={{
                    ...currentJob.customerID,
                    userData: customerUserData,
                  }}
                  pilot={pilotUserData}
                />
              </TabsContent>
              <TabsContent value="sales">
                <BookingSalesTab />
              </TabsContent>
              <TabsContent value="deliverables">
                <BookingDeliverablesTab />
              </TabsContent>
              <TabsContent value="settings">
                <BookingSettingsTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </AdminLayoutProvider>
  );
};

export default Bookings;
