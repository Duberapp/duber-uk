import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Mobile_SidebarHeader from "./Mobile_SidebarHeader";
import { setActiveJob } from "../../redux/activeJobSlice";
import MapComponent from "../MapComponent";
import AcceptJob_DetailsBar from "../Dashboard_Components/AcceptJob_DetailsBar";
import { getSingleJob } from "../../config/supabaseFunctions";
import LoadingSpinner from "../UI/LoadingSpinner";

const AvailableJob_Mobile = ({ disableAccept }) => {
  const dispatch = useDispatch();
  const activeJobID = useSelector((state) => state.activeJob.activeJob);
  const [currentJob, setCurrentJob] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActiveJob = async () => {
      try {
        setLoading(true);
        const { data, error } = await getSingleJob(activeJobID);
        if (error) throw new Error("Fetching job details failed !");

        setCurrentJob(data[0]);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    activeJobID !== null && fetchActiveJob();
  }, [activeJobID]);

  const handleBack = () => {
    dispatch(setActiveJob(null));
  };

  return (
    <div
      className={`lg:hidden absolute z-20 top-0 left-0 bg-[#F7F9FA] w-full h-full`}
    >
      {loading && (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner width={12} height={12} color="teal-500" />
        </div>
      )}

      {!loading && Object.keys(currentJob).length !== 0 && (
        <>
          <Mobile_SidebarHeader
            onBackPress={handleBack}
            centerComponent={
              <div className="flex flex-col items-center">
                <p className="text-sm font-semibold">
                  {currentJob.pilotExpertize}
                </p>
                <p className="text-xs text-gray-400">#{currentJob.id}</p>
                <button
                  className={`px-2 py-1 mt-1 text-[.6rem] font-medium bg-green-100 text-green-500 rounded-md`}
                >
                  {currentJob?.status}
                </button>
              </div>
            }
          />

          <div className="mt-32">
            <div className="m-3 bg-white rounded-xl p-2">
              <div className="">
                <MapComponent
                  center={currentJob.mapData.center}
                  zoom={currentJob.mapData.zoom}
                  polygon={currentJob.mapData.polygon}
                  area={currentJob.area}
                />
              </div>

              <p className=" text-gray-400 mt-5 font-normal text-base break-words">
                {currentJob.address}
              </p>

              <p className="">Mobile View</p>

              <p className=" text-black mt-5 font-normal text-xl break-words">
                <span className="font-semibold">Start Date:</span>{" "}
                {new Date(currentJob.date).toDateString()}
              </p>

              <p className=" text-black mt-5 font-semibold text-lg break-words">
                Customers Notes:
              </p>
              <p className=" text-black mt-2 font-normal text-sm break-words">
                {currentJob.customerNote}
              </p>

              <div className=" mt-16 mb-7">
                <AcceptJob_DetailsBar
                  jobID={currentJob.id}
                  customerEmail={currentJob.customerID.email}
                  customerFirstName={currentJob.customerID.firstName}
                  disableAccept={disableAccept}
                  jobDate={currentJob.date}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AvailableJob_Mobile;
