import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Mobile_SidebarHeader from "./Mobile_SidebarHeader";
import { setActiveJob } from "../../redux/activeJobSlice";
import AcceptJob_DetailsBar from "../Dashboard_Components/AcceptJob_DetailsBar";
import {
  getSingleJob,
  selectPaymentData,
} from "../../config/supabaseFunctions";
import LoadingSpinner from "../UI/LoadingSpinner";
import {
  PilotExpertises,
  TimeOptions,
  calculatePilotJobValue,
  convertToStandardDateFormat,
} from "global-constants";
import axios from "axios";
import { MapPinIcon, Calendar, SunIcon, Clock4Icon } from "lucide-react";
import GoogleMap from "../GoogleMap";

const AvailableJob_Mobile = ({ disableAccept, transferRate }) => {
  const dispatch = useDispatch();
  const activeJobID = useSelector((state) => state.activeJob.activeJob);
  const [currentJob, setCurrentJob] = useState({});
  const [loading, setLoading] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [postalTown, setPostalTown] = useState("");
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

        setCurrentJob(data[0]);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    activeJobID !== null && fetchActiveJob();
  }, [activeJobID]);

  const handleBack = () => dispatch(setActiveJob(null));

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
      className={`lg:hidden absolute z-20 top-0 left-0 bg-duber-navyBlue w-full`}
    >
      {loading && (
        <div className="w-full h-screen bg-white flex items-center justify-center">
          <LoadingSpinner width={12} height={12} color="teal-500" />
        </div>
      )}

      {!loading && Object.keys(currentJob).length !== 0 && (
        <div className="h-screen">
          <Mobile_SidebarHeader
            onBackPress={handleBack}
            centerComponent={
              <div className="flex items-center gap-x-3">
                <p className="text-base text-duber-pink font-bold">
                  £ {calculatePilotJobValue(currentJob.amount, transferRate)}
                </p>
                <p className="text-base text-duber-pink">#{currentJob.id}</p>
              </div>
            }
          />

          <div className="mx-3 pt-24 h-full flex flex-1 flex-col gap-y-5">
            {/* Expertise */}
            <div className="">
              <p className="text-sm font-light text-white">
                Required Expertise
              </p>
              <h2 className="text-xl font-bold text-white">
                {
                  PilotExpertises.filter(
                    (exp) => exp.slug === currentJob.pilotExpertize
                  )[0].title
                }
              </h2>
            </div>

            {/* Job Details */}
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
                  {convertToStandardDateFormat(currentJob.date)}
                </p>
              </div>

              {/* Arrival Time / Option */}
              <div className="flex items-center gap-x-2">
                <SunIcon className="w-4 h-4 text-duber-teal" />
                <p className="text-duber-teal text-sm">
                  {formatTimeOption(
                    currentJob.time_option,
                    currentJob.arrivalTime
                  )}
                </p>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-x-2">
                <Clock4Icon className="w-4 h-4 text-duber-teal" />
                <p className="text-duber-teal text-sm">
                  {includedDuration + currentJob.extendDuration} hr
                </p>
              </div>

              {/* Job Brief */}
              <div className="">
                <h2 className="text-lg font-medium text-white">Job Brief</h2>
                <p className="mt-1 text-xs text-white">
                  {currentJob.customerNote}
                </p>
              </div>
            </div>

            {/* Bottom Components */}
            <div className="mb-8">
              {/* Map Container */}
              <div className="h-48 overflow-hidden rounded-md mb-2">
                <GoogleMap
                  polygons={[currentJob.mapData?.polygon]}
                  staticMapType={"roadmap"}
                  mapState={"static"}
                  location={currentJob.mapData?.center}
                  zoom={3}
                  mapOptions={{
                    gestureHandling: true,
                  }}
                  areaComponent={
                    <h2 className="font-semibold text-sm text-black">
                      {currentJob.area} m<sup>2</sup>
                    </h2>
                  }
                />
              </div>

              {currentJob.status === "Available" ? (
                <AcceptJob_DetailsBar
                  jobID={currentJob.id}
                  customerEmail={currentJob.customerID.email}
                  customerFirstName={currentJob.customerID.firstName}
                  disableAccept={disableAccept}
                  jobDate={currentJob.date}
                  includedDuration={includedDuration}
                  extendedDuration={currentJob.extendDuration}
                  timeOption={currentJob.time_option}
                  arrivalTime={currentJob.arrivalTime}
                />
              ) : (
                <Button
                  variant={"skyBlue"}
                  size={"lg"}
                  className="w-full text-base h-11"
                  onClick={() =>
                    // router.push(`/dashboard/myJobs/${currentJob.id}`)
                    window.location.replace(
                      `/dashboard/myJobs/${currentJob.id}`
                    )
                  }
                >
                  View Job
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableJob_Mobile;
