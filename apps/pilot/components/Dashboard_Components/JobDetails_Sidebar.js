import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AcceptJob_DetailsBar from "./AcceptJob_DetailsBar";
import { useRouter } from "next/router";
import MapComponent from "../MapComponent";
import { getSingleJob } from "../../config/supabaseFunctions";
import { AddToCalender, LoadingSpinner } from "../../components";
import { InitialSidebar } from "ui";

const JobDetails_Sidebar = ({ disableAccept }) => {
  const activeJobID = useSelector((state) => state.activeJob.activeJob);
  const router = useRouter();
  const [activeJob, setActiveJob] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActiveJob = async () => {
      try {
        setLoading(true);
        const { data, error } = await getSingleJob(activeJobID);
        if (error) throw new Error("Fetching job details failed !");

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

  return (
    <div
      className={`fixed lg:block hidden right-0 w-[350px] h-full rounded-md py-3 pr-3 overflow-y-scroll scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-medium`}
    >
      {activeJobID !== null && loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner width={8} height={8} color="teal-400" />
        </div>
      ) : Object.keys(activeJob).length === 0 ? (
        // Initial Sidebar
        <InitialSidebar
          title="Get started"
          description="Accept a job and start earning."
          img_1="/assets/sidebar_assets/halo_1.png"
          img_2="/assets/sidebar_assets/halo_2.png"
        />
      ) : (
        <>
          <div className="">
            <MapComponent
              center={activeJob.mapData.center}
              zoom={activeJob.mapData.zoom}
              polygon={activeJob.mapData.polygon}
              area={activeJob.area}
            />
          </div>

          <p className="mt-5 text-black font-semibold text-xl">
            {activeJob.pilotExpertize}{" "}
            <span className="text-gray-300 font-normal">#{activeJob.id}</span>
          </p>

          <p className=" text-gray-400 mt-5 font-normal text-xl break-words">
            {activeJob.address}
          </p>

          <p className=" text-black mt-5 font-semibold text-lg break-words">
            Customers Notes:
          </p>
          <p className=" text-black mt-2 font-normal text-base break-words">
            {activeJob.customerNote}
          </p>

          <p className=" text-black mt-5 font-normal text-lg break-words">
            <span className="font-semibold">Start Date:</span>{" "}
            {new Date(activeJob.date).toDateString()}
          </p>

          {activeJob.status !== "Available" && (
            <div>
              <p className=" text-black mt-6 font-semibold text-xl break-words">
                Customers Details:
              </p>
              <div>
                <p className="text-black mt-3 font-normal text-base">
                  <span className="font-semibold">Name: </span>
                  {activeJob.customerID.firstName}{" "}
                  {activeJob.customerID.lastName}
                </p>
                <p className="text-black mt-3 font-normal text-base">
                  <span className="font-semibold">Email Address: </span>
                  {activeJob.customerID.email}
                </p>
                <p className="text-black mt-3 font-normal text-base">
                  <span className="font-semibold">Phone Number: </span>
                  {activeJob.customerID.phoneNumber}
                </p>
                <p className="text-black mt-3 font-normal text-base">
                  <span className="font-semibold">Company: </span>
                  {activeJob.customerID.companyName}
                </p>
              </div>
            </div>
          )}

          {activeJob.status === "Available" ? (
            <div className="mb-7">
              <AcceptJob_DetailsBar
                jobID={activeJob.id}
                customerEmail={activeJob.customerID.email}
                customerFirstName={activeJob.customerID.firstName}
                disableAccept={disableAccept}
                jobDate={activeJob.date}
              />
            </div>
          ) : (
            <div
              className={`${
                activeJob.status === "Live" ? "mt-3" : "mt-10"
              } mb-7`}
            >
              <div className="flex items-center justify-center w-full">
                <p className="flex-1 text-2xl font-semibold text-gray-700">
                  {activeJob.arrivalTime}
                </p>

                {activeJob.status === "Live" && (
                  <div className="mt-3 z-[50000]">
                    <AddToCalender
                      data={{
                        address: activeJob.address,
                        id: activeJob.id,
                        customerNotes: activeJob.customerNote,
                        date: activeJob.date,
                        arrivalTime: activeJob.arrivalTime,
                        style: "modal",
                      }}
                    />
                  </div>
                )}
              </div>

              <div
                onClick={() => router.push(`/dashboard/myJobs/${activeJob.id}`)}
                className="mt-3 cursor-pointer bg-teal-300 rounded-md w-full px-3 py-5 flex items-center justify-center"
              >
                <p className="text-2xl font-semibold text-white uppercase">
                  View Job
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobDetails_Sidebar;
