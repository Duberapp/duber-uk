import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AcceptJob_DetailsBar from "./AcceptJob_DetailsBar";
import { useRouter } from "next/router";
import {
  getSingleJob,
  selectPaymentData,
} from "../../config/supabaseFunctions";
import { AddToCalender, LoadingSpinner } from "../../components";
import { InitialSidebar, JobDetailsSidebar, SideBarLayout, Button } from "ui";
import {
  PilotExpertises,
  TimeOptions,
  calculatePilotJobValue,
  convertToStandardDateFormat,
} from "global-constants";
import axios from "axios";
import { MapPinIcon, Calendar, SunIcon, Clock4Icon } from "lucide-react";
import GoogleMap from "../GoogleMap";

const JobDetails_Sidebar = ({ disableAccept, transferRate }) => {
  const activeJobID = useSelector((state) => state.activeJob.activeJob);
  const router = useRouter();
  const [activeJob, setActiveJob] = useState({});
  const [postalCode, setPostalCode] = useState("");
  const [postalTown, setPostalTown] = useState("");
  const [loading, setLoading] = useState(false);
  const [includedDuration, setIncludedDuration] = useState(0);

  const googleMapsKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    "AIzaSyBkjmJZuDnGRocwQ4aJIz8VYnmuDmQ3IPs";

  useEffect(() => {
    const fetchActiveJob = async () => {
      try {
        setLoading(true);
        const { data, error } = await getSingleJob(activeJobID);
        if (error) throw new Error("Fetching job details failed !");

        const { data: postalCodeData } = await axios({
          baseURL: "https://maps.googleapis.com/maps/api",
          url: `/geocode/json?address=${data[0].address}&key=${googleMapsKey}`,
          method: "GET",
        });

        if (postalCodeData.status === "OK") {
          const addressComponents =
            postalCodeData.results[0].address_components;

          addressComponents.length > 0 &&
            addressComponents.map((addr_comp) => {
              addr_comp.types.map((type) => {
                if (type === "postal_town") {
                  setPostalTown(addr_comp.long_name);
                }

                if (type === "postal_code") {
                  setPostalCode(addr_comp.long_name);
                }
              });
            });
        }

        const { data: paymentData, error: paymentDataErr } =
          await selectPaymentData();

        if (!paymentDataErr) {
          setIncludedDuration(paymentData[0].includedDuration);
        }

        setActiveJob(data[0]);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    // Fetch details only desktop
    if (typeof window !== "undefined") {
      // Client-side-only code
      let screenWidth = window.screen.width;
      if (screenWidth > 1024) {
        activeJobID !== null && fetchActiveJob();
      }
    }
  }, [activeJobID]);

  const formatTimeOption = (time_option, arrivalTime) => {
    if (time_option === "Choose a time slot") {
      return arrivalTime;
    } else {
      const filteredOpt = TimeOptions.filter(
        (opt) => opt.name === time_option
      )[0];

      return `${filteredOpt.name} ${filteredOpt.timeRange}`;
    }
  };

  return (
    <div
      className={`fixed lg:block hidden right-0 w-[350px] h-full rounded-md py-3 pr-3 overflow-y-scroll scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-medium`}
    >
      {activeJobID !== null && loading ? (
        <SideBarLayout>
          <LoadingSpinner width={8} height={8} color="duber-pink" />
        </SideBarLayout>
      ) : Object.keys(activeJob).length === 0 ? (
        // Initial Sidebar
        <InitialSidebar
          title={
            router.pathname === "/dashboard"
              ? "Get started"
              : router.pathname === "/dashboard/myJobs"
              ? "View Jobs"
              : ""
          }
          description={
            router.pathname === "/dashboard"
              ? "Accept a job and start earning."
              : router.pathname === "/dashboard/myJobs"
              ? "Look at the jobs you have accepted"
              : ""
          }
          img_1="/assets/sidebar_assets/halo_1.png"
          img_2="/assets/sidebar_assets/halo_2.png"
        />
      ) : (
        <JobDetailsSidebar className="flex-col">
          <div className="w-full h-full flex-1 p-7 flex flex-col gap-y-4 scrollbar-thin overflow-y-scroll scrollbar-thumb-sky-700 scrollbar-track-transparent">
            <div className="flex items-center justify-between">
              <h2 className="text-duber-pink font-semibold">
                £ {calculatePilotJobValue(activeJob.amount, transferRate)}
              </h2>
              <h2 className="text-duber-pink font-normal">#{activeJob.id}</h2>
            </div>

            <div className="">
              <p className="text-xs font-light text-white">
                Required Expertise
              </p>
              <h2 className="text-lg font-bold text-white">
                {
                  PilotExpertises.filter(
                    (exp) => exp.slug === activeJob.pilotExpertize
                  )[0].title
                }
              </h2>
            </div>

            <div className="flex flex-1 flex-col gap-y-2.5">
              {/* Address */}
              <div className="flex items-center gap-x-2">
                <MapPinIcon className="w-4 h-4 text-duber-teal" />
                <p className="text-duber-teal text-sm">
                  {`${postalTown}, ${postalCode}, UK`}
                </p>
              </div>

              {/* Date */}
              <div className="flex items-center gap-x-2">
                <Calendar className="w-4 h-4 text-duber-teal" />
                <p className="text-duber-teal text-sm">
                  {convertToStandardDateFormat(activeJob.date)}
                </p>
              </div>

              {/* Arrival Time / Option */}
              <div className="flex items-center gap-x-2">
                <SunIcon className="w-4 h-4 text-duber-teal" />
                <p className="text-duber-teal text-sm">
                  {formatTimeOption(
                    activeJob.time_option,
                    activeJob.arrivalTime
                  )}
                </p>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-x-2">
                <Clock4Icon className="w-4 h-4 text-duber-teal" />
                <p className="text-duber-teal text-sm">
                  {includedDuration + activeJob.extendDuration} hr
                </p>
              </div>

              {/* Job Brief */}
              <div className="">
                <h2 className="text-lg font-medium text-white">Job Brief</h2>
                <p className="mt-1 text-xs text-white">
                  {activeJob.customerNote}
                </p>
              </div>
            </div>

            {/* Bottom Components */}
            <div className="">
              {/* Map Container */}
              <div className="h-36 overflow-hidden rounded-md mb-2">
                <GoogleMap
                  polygons={[activeJob.mapData?.polygon]}
                  staticMapType={"roadmap"}
                  mapState={"static"}
                  location={activeJob.mapData?.center}
                  zoom={3}
                  mapOptions={{
                    gestureHandling: true,
                  }}
                  areaComponent={
                    <h2 className="font-semibold text-sm text-black">
                      {activeJob.area} m<sup>2</sup>
                    </h2>
                  }
                />
              </div>

              {activeJob.status === "Available" ? (
                <AcceptJob_DetailsBar
                  jobID={activeJob.id}
                  customerEmail={activeJob.customerID.email}
                  customerFirstName={activeJob.customerID.firstName}
                  disableAccept={disableAccept}
                  jobDate={activeJob.date}
                  includedDuration={includedDuration}
                  extendedDuration={activeJob.extendDuration}
                  timeOption={activeJob.time_option}
                  arrivalTime={activeJob.arrivalTime}
                />
              ) : (
                <Button
                  variant={"skyBlue"}
                  size={"lg"}
                  className="w-full text-base h-11"
                  onClick={() =>
                    // router.push(`/dashboard/myJobs/${activeJob.id}`)
                    window.location.replace(`/dashboard/myJobs/${activeJob.id}`)
                  }
                >
                  View Job
                </Button>
              )}
            </div>
          </div>
        </JobDetailsSidebar>
      )}
    </div>
  );
};

export default JobDetails_Sidebar;
