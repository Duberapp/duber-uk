import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AcceptJob_DetailsBar from "./AcceptJob_DetailsBar";
import { useRouter } from "next/router";
import MapComponent from "../MapComponent";
import {
  getSingleJob,
  selectPaymentData,
} from "../../config/supabaseFunctions";
import { AddToCalender, LoadingSpinner } from "../../components";
import { InitialSidebar, JobDetailsSidebar, SideBarLayout } from "ui";
import {
  PilotExpertises,
  TimeOptions,
} from "../../../../packages/global-constants/src";
import axios from "axios";
import { MapPinIcon, Calendar, SunIcon, Clock4Icon } from "lucide-react";

const JobDetails_Sidebar = ({ disableAccept, transferRate }) => {
  const activeJobID = useSelector((state) => state.activeJob.activeJob);
  const router = useRouter();
  const [activeJob, setActiveJob] = useState({});
  const [postalCode, setPostalCode] = useState("");
  const [postalTown, setPostalTown] = useState("");
  const [loading, setLoading] = useState(false);
  const [includedDuration, setIncludedDuration] = useState(0);

  useEffect(() => {
    const fetchActiveJob = async () => {
      try {
        setLoading(true);
        const { data, error } = await getSingleJob(activeJobID);
        if (error) throw new Error("Fetching job details failed !");

        const { data: postalCodeData } = await axios({
          baseURL: "https://maps.googleapis.com/maps/api",
          url: `/geocode/json?address=${data[0].address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
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

  const formatPrice = (price) => {
    return (price - 100) * (1 - transferRate / 100);
  };

  const formatDate = (dateString) => {
    // Convert string to Date object
    const dateObj = new Date(dateString);

    // Define arrays for days and months
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get day, month, and year from the date object
    const dayOfWeek = daysOfWeek[dateObj.getDay()];
    const dayOfMonth = dateObj.getDate();
    const month = monthsOfYear[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    // Function to add ordinal suffix to day
    const addOrdinalSuffix = (day) => {
      if (day >= 11 && day <= 13) {
        return `${day}th`;
      }
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };

    // Format the date string
    const formattedDate = `${dayOfWeek}, ${addOrdinalSuffix(
      dayOfMonth
    )} ${month} ${year}`;

    return formattedDate;
  };

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
          title="Get started"
          description="Accept a job and start earning."
          img_1="/assets/sidebar_assets/halo_1.png"
          img_2="/assets/sidebar_assets/halo_2.png"
        />
      ) : (
        <JobDetailsSidebar className="flex-col">
          <div className="w-full h-full flex-1 p-7 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-duber-pink font-semibold">
                £ {formatPrice(activeJob.amount)}
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

            <div className="flex flex-col gap-y-2.5">
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
                  {formatDate(activeJob.date)}
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
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Dolore aut assumenda, recusandae numquam nihil atque
                  temporibus quasi saepe adipisci,
                </p>
              </div>
            </div>
          </div>
        </JobDetailsSidebar>
      )}
    </div>
  );
};

export default JobDetails_Sidebar;
