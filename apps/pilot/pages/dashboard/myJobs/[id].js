import React, { useEffect, useState } from "react";
import {
  DashboardLayout,
  MapComponent,
  Mobile_SidebarHeader,
  FullScreenLoading,
  UploadedFileBadges,
  AddToCalender,
  ProgressBar,
} from "../../../components";
import { errorToast, successToast } from "../../../components/UI/Toast";
import { useRouter } from "next/router";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setActiveJob } from "../../../redux/activeJobSlice";
import {
  getJobListingByPilotId,
  getSingleJob,
  getUserByEmail,
} from "../../../config/supabaseFunctions";
import { Toaster } from "react-hot-toast";
import { getPresignedUrl } from "../../../config/utilityFunctions";
import axios from "axios";
import {
  addLog,
  setIsFinished,
  updateLog,
  updateProgress,
} from "../../../redux/uploadLogSlice";
import { useUser, useSessionContext } from "@supabase/auth-helpers-react";

const SinglePage = () => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
  } = useDropzone();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(router.query?.isNew);
  const [error, setError] = useState(null);
  const [notificationText, setNotificationText] = useState(
    router.query?.isNew ? "Job Accepted Successfully !" : null
  );
  const activeJobID = router.query.id;
  const [currentJob, setCurrentJob] = useState({});

  // File Structures
  const [uploading, setUploading] = useState(null);
  const [holdFinish, setHoldFinish] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadLog, setUploadLog] = useState([]); // just in case state
  const uploadLogRedux = useSelector((state) => state.uploadLog.logList);

  const [totalUploadSize, setTotalUploadSize] = useState(0);
  let currentUploadedSize = uploadLogRedux
    .map((obj) => obj.loadedSize)
    .reduce((partialSum, a) => partialSum + a, 0);

  const [completingJob, setCompletingJob] = useState(false);

  const {
    isLoading: isSessionLoading,
    error: sessionError,
    session,
  } = useSessionContext();

  // ========================== BASE CONFIGURATIONS ===============================
  // Fetch active job function -> this used in effect and time which needs to refetch data
  const fetchActiveJob = async () => {
    try {
      setLoading(true);

      console.log({
        isSessionLoading,
        sessionError,
        session,
      });

      if (!isSessionLoading && session) {
        const { data, error } = await getSingleJob(activeJobID);

        if (error) throw new Error("Fetching job details failed !");

        const { data: pilot, error: pilotError } = await getUserByEmail(
          session.user.email
        );

        if (!pilotError) {
          if (data[0].pilotID !== pilot[0].id) {
            router.push("/dashboard");
          }
        }

        setCurrentJob(data[0]);
        setLoading(false);
      }

      if (sessionError || (!isSessionLoading && !session)) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveJob();
  }, [isSessionLoading]);

  // Show toast
  useEffect(() => {
    if (!loading && showNotification) successToast(notificationText);
  }, [loading]);

  // Navigation back button handler
  const handleBackNavigate = () => {
    dispatch(setActiveJob(null));
    router.back();
  };
  // ============================================================================

  // ========================== PROCESSING ===============================
  // Upload effect
  useEffect(() => {
    if (acceptedFiles.length !== 0) {
      acceptedFiles.map((file, index) => {
        setUploadedFiles((arr) => [...arr, file]);

        setTotalUploadSize((prevValue) => prevValue + file.size);
      });
    }
  }, [acceptedFiles]);

  // ------------- Handle upload processes -------------
  const triggerPrepareFilesProcess = async () => {
    /*
      1. Loop through uploaded file list.                         - OK
      2. get each file object and prepare a presigned URL for it  - OK
      3. Create a log record for file and push to uploadLog       - OK
    */
    let __uploadLog = [];

    // ---> Step 01 - Asynchronous Loop
    await Promise.all(
      uploadedFiles.map(async (uploadedFile) => {
        // ---> Step 02 - Get presignedUrl
        let data, error;
        try {
          const { data: resData, error: resError } = await getPresignedUrl(
            uploadedFile,
            `Order-${currentJob.id}`
          );
          data = resData;
          error = resError;
        } catch (err) {
          error = true; // This prevents generate error during loop
        }

        // ---> Step 03 - Update log record
        let logRecord = {
          file: uploadedFile,
          signedUrl: null,
          progress: 0,
          loadedSize: 0,
          status: "valid",
        };
        let logRecord__redux = {
          fileName: uploadedFile.name,
          signedUrl: null,
          progress: 0,
          loadedSize: 0,
          status: "valid",
        };

        if (!error) {
          const { uploadUrl } = data;
          logRecord.signedUrl = uploadUrl;
          logRecord__redux.signedUrl = uploadUrl;
        }

        __uploadLog.push(logRecord);
        setUploadLog((prev) => [...prev, logRecord]);
        dispatch(addLog(logRecord__redux));
      })
    );

    return __uploadLog;
  };

  const triggerUploadProcess = async () => {
    setUploading(true);
    const __uploadLog = await triggerPrepareFilesProcess();

    await Promise.all(
      __uploadLog.map(async (log) => {
        try {
          await axios.put(log.signedUrl, log.file, {
            onUploadProgress: (progressEvent) => {
              const { loaded, total } = progressEvent;
              const percentage = Math.floor((loaded * 100) / total);

              dispatch(
                updateProgress({
                  fileName: log.file.name,
                  progress: percentage,
                  loadedSize: loaded,
                })
              );
            },
          });
        } catch (err) {
          console.log(log);
          console.log(err);
        }
      })
    );

    dispatch(setIsFinished(true));
    setUploading(false);
  };

  const reuploadFile = async (file) => {
    // 1. Generate PreSigned URL
    const { data, error } = await getPresignedUrl(
      file,
      `Order-${currentJob.id}`
    );

    // 2. Preapre new status
    let logRecord = {
      file: file,
      signedUrl: null,
      progress: 0,
      loadedSize: 0,
      status: "reuploading",
    };
    let logRecord__redux = {
      fileName: file.name,
      signedUrl: null,
      progress: 0,
      loadedSize: 0,
      status: "reuploading",
    };

    if (!error) {
      const { uploadUrl } = data;
      logRecord.signedUrl = uploadUrl;
      logRecord__redux.signedUrl = uploadUrl;
    }

    //  ============= Update Status =============
    dispatch(updateLog(logRecord__redux));

    // 3. Trigger upload request + update state values
    try {
      await axios.put(logRecord.signedUrl, logRecord.file, {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);

          dispatch(
            updateProgress({
              fileName: logRecord.file.name,
              progress: percentage,
              loadedSize: loaded,
            })
          );
        },
      });
    } catch (err) {
      console.log(log);
      console.log(err);
    }

    // 4. Update redux redux update log and react update log
  };
  // =====================================================================

  const handleCompleteJob = async () => {
    try {
      setCompletingJob(true);

      // 1. Prepare Asset list for supabase
      const assetList = uploadLogRedux.map((log) => {
        return log.fileName;
      });

      // 2. Backend request for complete job
      const serverUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL;
      const { data } = await axios({
        method: "POST",
        baseURL: serverUrl,
        url: `/pilots/complete-job`,
        headers: {},
        data: {
          jobID: currentJob.id,
          assetsList: assetList,
          clientEmail: currentJob.customerID.email,
          clientName: currentJob.customerID.firstName,
          pilotId: currentJob.pilotID,
          amount: currentJob.amount,
        },
      });
      console.log("Supabase Data : ", data);

      // 3. Backend Request for Schedule Assets Deletion
      if (currentJob.storagePlan.id !== 2) {
        const { data: schedulerResultData } = await axios({
          method: "post",
          baseURL: "https://scheduler-service.duber.uk/",
          url: "/add-expiration",
          data: {
            subscriptionDate: new Date(),
            jobId: currentJob.id,
          },
        });

        console.log(schedulerResultData);
      }

      // Add request to Zipping Queue -> to zip all deliverables
      try {
        const { data } = await axios({
          method: "GET",
          baseURL: "https://fileserver.duber.uk/",
          url: `/queue/addToZippingQueue/Order-${currentJob.id}`,
        });

        const { message, error } = data;
        console.log(data);
      } catch (err) {
        console.log(`Couldn't add this order to Zipping Queue`);
      }

      setCompletingJob(false);
      setUploading(null);
      fetchActiveJob().then(() => successToast(data.message));
    } catch (err) {
      setCompletingJob(false);
      setError(err.message);
      errorToast(`Error: ${err.message}`);
    }
  };

  return (
    <>
      {/* --------------Notification-------------- */}
      <Toaster position="top-right" />
      {/* ----------------------------------------- */}

      {loading && <FullScreenLoading />}

      {!loading && Object.keys(currentJob) !== 0 && (
        <DashboardLayout
          headerComponent={
            <Mobile_SidebarHeader
              onBackPress={handleBackNavigate}
              centerComponent={
                <div className="flex flex-col items-center">
                  <p className="text-sm font-semibold">
                    {currentJob.pilotExpertize}
                  </p>
                  <p className="text-xs text-gray-400">#{currentJob.id}</p>
                  <button
                    className={`px-2 py-1 mt-1 text-[.6rem] font-medium rounded-md ${
                      currentJob.status == "Live" && "bg-red-100 text-red-500"
                    } ${
                      currentJob.status == "Completed" &&
                      "bg-blue-100 text-blue-500"
                    } ${
                      currentJob.status == "Available" &&
                      "bg-green-100 text-green-500"
                    }`}
                  >
                    {currentJob?.status}
                  </button>
                </div>
              }
            />
          }
        >
          <div className="w-full h-full px-4 py-8">
            {/* Header */}
            <div className="lg:flex hidden flex-1 h-fit items-center justify-between ">
              <p className="text-black font-semibold text-2xl">
                {currentJob.pilotExpertize}
                <span className="ml-2 text-gray-300 font-normal">
                  #{currentJob.id}
                </span>
                <button
                  className={`w-32 ml-4 py-2 text-sm font-medium ${
                    currentJob.status == "Live" && "bg-red-100 text-red-500"
                  } ${
                    currentJob.status == "Completed" &&
                    "bg-blue-100 text-blue-500"
                  } ${
                    currentJob.status == "Available" &&
                    "bg-green-100 text-green-500"
                  } rounded-md`}
                >
                  {currentJob?.status}
                </button>
              </p>

              <div className="flex items-center gap-2">
                <Link href="/dashboard/myJobs">
                  <a className="font-medium text-xs text-gray-400">
                    Go to My Jobs
                  </a>
                </Link>
                <ArrowRightIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Content */}
            <div className="mt-5 w-full h-full bg-white rounded-2xl">
              {/* Map */}
              <div className="lg:pt-6 pt-3 lg:mx-6 mx-3 shadow-lg rounded-2xl">
                <MapComponent
                  center={currentJob.mapData.center}
                  zoom={currentJob.mapData.zoom}
                  polygon={currentJob.mapData.polygon}
                  area={currentJob.area}
                  price={currentJob.amount}
                  onlyAmount={currentJob.amount}
                />
              </div>
              {/* --------------------- */}
              <div className="lg:mx-12 mx-3 pt-9 grid lg:grid-cols-2 grid-cols-1 gap-x-8 gap-y-5">
                <p className="text-gray-400 sm:text-lg text-sm">
                  {currentJob.address}
                </p>

                <p className="text-black text-lg">
                  <span className="text-black font-semibold">Start Date:</span>{" "}
                  {new Date(currentJob.date).toDateString()}
                </p>

                <div className="flex justify-start flex-col items-start">
                  <h2 className="text-black sm:text-lg text-base font-semibold">
                    Customer Notes:
                  </h2>
                  <h2 className="text-black sm:text-base text-sm">
                    {currentJob.customerNote}
                  </h2>
                </div>

                {currentJob.status !== "Completed" && (
                  <div className="flex justify-center flex-col">
                    <h2 className="text-black sm:text-lg text-base font-semibold">
                      Customer Details:
                    </h2>
                    <p className="text-black mt-1 font-normal sm:text-base text-sm">
                      <span className="font-semibold">Name: </span>
                      {currentJob.customerID.firstName}{" "}
                      {currentJob.customerID.lastName}
                    </p>
                    <p className="text-black mt-1 font-normal sm:text-base text-sm">
                      <span className="font-semibold">Email Address: </span>
                      {currentJob.customerID.email}
                    </p>
                    <p className="text-black mt-1 font-normal sm:text-base text-sm">
                      <span className="font-semibold">Phone Number: </span>
                      {currentJob.customerID.phoneNumber}
                    </p>
                    <p className="text-black mt-1 font-normal sm:text-base text-sm">
                      <span className="font-semibold">Company: </span>
                      {currentJob.customerID.companyName}
                    </p>
                  </div>
                )}

                <h2 className="text-black sm:text-lg text-sm font-semibold">
                  {currentJob.status !== "Completed" && (
                    <span className="sm:hidden inline-flex items-center">
                      Arrival Time {currentJob.arrivalTime}
                      <AddToCalender
                        data={{
                          address: currentJob.address,
                          id: currentJob.id,
                          customerNotes: currentJob.customerNote,
                          date: currentJob.date,
                          arrivalTime: currentJob.arrivalTime,
                          style: "dropdown",
                        }}
                      />
                    </span>
                  )}
                  {currentJob.status === "Live" && <p>Upload Deliverables</p>}
                </h2>
                {currentJob.status !== "Completed" && (
                  <h2 className="sm:block hidden text-gray-600  font-semibold text-2xl">
                    Arrival Time {currentJob.arrivalTime}
                  </h2>
                )}
              </div>

              {/* File Upload */}
              {currentJob.status === "Live" && (
                <div className="mt-5 sm:mx-12 mx-3">
                  <section className="cursor-pointer mb-5">
                    {!uploading && !completingJob && (
                      <div
                        {...getRootProps({
                          className: `dropzone ${isFocused && "focused"} ${
                            isDragAccept && "accept"
                          }`,
                        })}
                      >
                        <input {...getInputProps()} />
                        <img
                          src="/assets/folder.png"
                          alt=""
                          className="sm:w-20 w-14 mb-3"
                        />
                        <p className="sm:text-xl text-base text-slate-400">
                          Drag &apos; Drop or Click to Upload
                        </p>
                      </div>
                    )}

                    {uploadedFiles.length !== 0 && (
                      <aside className="mt-3 cursor-default">
                        <h4 className="my-2 font-semibold">Files</h4>

                        <UploadedFileBadges
                          uploadedFiles={uploadedFiles}
                          handleReupload={reuploadFile}
                        />
                      </aside>
                    )}
                  </section>

                  {error && (
                    <p className="text-xs text-red-500 mb-2">{error}</p>
                  )}

                  <button
                    className={`${
                      uploadedFiles.length === 0
                        ? "disabled bg-gray-400"
                        : "bg-teal-400"
                    } w-full h-16 rounded-lg  text-white sm:text-xl text-base font-semibold`}
                    onClick={triggerUploadProcess}
                  >
                    {uploading === null ? (
                      "Upload files to complete job"
                    ) : (
                      <>
                        <ProgressBar
                          height={16}
                          currentUploadedSize={currentUploadedSize}
                          totalUploadSize={totalUploadSize}
                          isHoldFinish={holdFinish}
                          setHoldFinish={setHoldFinish}
                          handleCompleteJob={handleCompleteJob}
                          isCompleting={completingJob}
                        />

                        {!completingJob && (
                          <p
                            className="mt-3 text-xs text-gray-700 hover:text-black hover:underline"
                            onClick={() => {
                              if (typeof window !== "undefined") {
                                window.location.reload();
                              }
                            }}
                          >
                            Cancel Upload
                          </p>
                        )}
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </DashboardLayout>
      )}
    </>
  );
};

export default SinglePage;

export const getServerSideProps = ({ query }) => {
  if (!query.id) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard/myJobs",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
