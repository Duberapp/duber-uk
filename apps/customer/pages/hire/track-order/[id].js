import React, { useEffect, useState } from "react";
import {
  Button,
  MainLayout,
  TrackingMap,
  AddToCalender,
  LoadingSpinner,
} from "../../../components/CustomerDashboard_Components";
import {
  StatusBadge,
  PilotCard,
} from "../../../components/CustomerDashboard_Components/TrackingPage";
import { fetchOrder, getPilotData } from "../../../config/supabaseFunctions";
import { useRouter } from "next/router";
import AWS from "aws-sdk";
import {
  getS3Object_DownloadLink,
  handleDownloadZip,
} from "../../../utils/utilityFunctions";
import { Toaster } from "react-hot-toast";
import { errorToast } from "../../../components/CustomerDashboard_Components/UI/Toast";

// Initialize AWS SDK with your credentials and the desired region
AWS.config.update({
  region: "us-east-1",
  credentials: new AWS.Credentials(
    "AKIAWMBFXAIQBO6K4OGN", // AWS access key
    "vkRHUZlggWrTKrlHGTgAT3+nhKmx2sF01Xok70Ia" // secret key
  ),
});

const TrackOrder = ({ data, pilot, error }) => {
  const router = useRouter("");
  const folderName = `Order-${data?.id}`;
  const [gettingLink, setGettingLink] = useState(false);
  const [gettingChildLink, setGettingChildLink] = useState({
    key: null,
    state: false,
  });
  const [isExpired, setIsExpired] = useState(false);

  const getDaysLeft = (orderPlacedAt) => {
    const orderDate = new Date(orderPlacedAt);
    const expireDate = new Date(orderDate); // Make a copy of orderDate to avoid modifying it
    expireDate.setDate(orderDate.getDate() + 30);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to midnight

    let timeDifference = expireDate - today;
    let daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysLeft === 0) {
      return "Today";
    } else if (daysLeft === 1) {
      return "1 Day";
    } else if (daysLeft < 1) {
      return "Expired";
    } else {
      return `${daysLeft} Days`;
    }
  };

  // Get is expired status
  useEffect(() => {
    if (data) {
      let expiredStatus = getDaysLeft(data.date);

      if (expiredStatus === "Expired") setIsExpired(true);
    }
  }, [data]);

  return (
    <MainLayout>
      <Toaster position="top-right" />
      {data && (
        <div className="sm:w-full max-w-screen-md mx-auto ">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-navyBlue">
              Track Order
            </h1>

            {data.status !== "Completed" && (
              <AddToCalender
                data={{
                  address: data.address,
                  id: data.id,
                  customerNotes: data.customerNote,
                  date: data.date,
                  arrivalTime: data.arrivalTime,
                }}
              />
            )}
          </div>

          {/* Row 1 */}
          <div className="mt-4 w-full flex items-center justify-between">
            <div className="flex items-center">
              {/* Address, Area and Order ID */}
              <p className="font-semibold text-lg mr-2 text-navyBlue">
                {data?.address.slice(0, 23)}..,
              </p>
              <p className="font-semibold text-lg mr-4 text-navyBlue">
                {data?.area}m<sup>2</sup>
              </p>
              <p className="text-lg mr-2 text-navyBlue">#{data?.id}</p>
            </div>

            <div className="sm:flex hidden items-center">
              <p className="text-navyBlue font-semibold mr-2">
                Date: {formatDate(new Date(data.date))}
              </p>
              <StatusBadge status={data.status} time={data.arrivalTime} />
            </div>
          </div>

          {/* Map Component */}
          <TrackingMap mapData={data.mapData} className="mt-5" />

          {/* Tracking bar */}
          {/* <TrackingBar
            className={"mt-8"}
            status={data.status}
            deliverables={data.deliverableURLs}
          /> */}

          {/* ============ ONLY MOBILE ============ */}
          <div className="sm:hidden flex items-center justify-between mt-24">
            <p className="text-navyBlue font-semibold mr-2">
              Date: {formatDate(new Date(data.date))}
            </p>
            <StatusBadge status={data.status} time={data.arrivalTime} />
          </div>

          {/* Pilot Details Card */}
          {pilot && <PilotCard pilot={pilot} className="sm:mt-16 mt-3" />}

          {/* Flight Details and Files */}
          <div
            className={`${
              pilot ? "mt-8" : "sm:mt-16 mt-4"
            } grid sm:grid-cols-2 grid-cols-1 gap-x-8 gap-y-4`}
          >
            {/* Flight details */}
            <div className="">
              <p className="font-semibold text-lg text-navyBlue">
                Flight Details
              </p>
              <p className="text-sm mt-1 text-navyBlue">{data.customerNote}</p>
            </div>

            {/* Files view */}
            <div>
              {/* ========== ORDER DELETION =========== */}
              {(data?.storagePlan?.id == 1 || data.subscriptionId === "") && (
                <div className="p-3 mb-3 flex items-center justify-between bg-red-100 rounded-md">
                  <p className="text-sm font-semibold text-red-400">
                    {!isExpired
                      ? "Data will be deleted in"
                      : "Files deleted. (Trial period is over)"}
                  </p>

                  {!isExpired && (
                    <p className="text-sm font-normal text-red-400">
                      {getDaysLeft(data.date)}
                    </p>
                  )}
                </div>
              )}

              {data?.storagePlan?.id == 2 && data.subscriptionId !== "" && (
                <div className="p-3 mb-3 flex items-center justify-between bg-teal-100 rounded-md">
                  <p className="text-sm font-semibold text-teal-500">
                    Storage plan enabled
                  </p>
                </div>
              )}
              {/* ===================================== */}

              <div
                className={`bg-gray-100 h-44 overflow-y-scroll rounded-md border-dashed border-2 border-gray-300 ${
                  data.deliverableURLs
                    ? "px-4 py-3"
                    : "flex items-center justify-center"
                } `}
              >
                {!isExpired && data.deliverableURLs && (
                  <div className="w-full flex justify-end">
                    <div
                      className="text-navyBlue cursor-pointer underline flex items-center gap-x-2"
                      onClick={async () => {
                        try {
                          setGettingLink(true);

                          const { data, error } = await handleDownloadZip(
                            folderName
                          );

                          if (error) throw error;

                          if (!error) {
                            window.open(data);
                          }
                          setGettingLink(false);
                        } catch (err) {
                          errorToast(err);
                          setGettingLink(false);
                        }
                      }}
                    >
                      {gettingLink && (
                        <LoadingSpinner
                          width={4}
                          height={4}
                          color={"navyBlue"}
                        />
                      )}
                      <p className="">Download All</p>
                    </div>
                  </div>
                )}
                {!data.deliverableURLs && (
                  <p className="text-gray-400">Files not Uploaded Yet</p>
                )}

                {!isExpired &&
                  data.deliverableURLs &&
                  data.deliverableURLs.map((file, id) => (
                    <p
                      key={id}
                      className="mb-2 w-fit cursor-pointer underline text-teal-500 flex items-center gap-x-2"
                      onClick={async () => {
                        setGettingChildLink({
                          key: file.fileName,
                          state: true,
                        });
                        const { data: url, error } =
                          await getS3Object_DownloadLink(
                            "duber-order-assets",
                            `Order-${data.id}/${file.fileName}`
                          );

                        if (error) {
                          errorToast(error.message);
                        } else {
                          window.open(url);
                        }

                        setGettingChildLink({
                          key: file.fileName,
                          state: false,
                        });
                      }}
                    >
                      {gettingChildLink.state &&
                        gettingChildLink.key === file.fileName && (
                          <LoadingSpinner
                            width={4}
                            height={4}
                            color={"teal-500"}
                          />
                        )}
                      <span>{file.fileName}</span>
                    </p>
                  ))}
              </div>
            </div>
          </div>

          {/* Download reciept and book another pilot */}
          <div className="mt-6 flex items-center gap-x-8">
            {/* Download reciept */}
            <p
              onClick={() => window.open(`${data.invoiceURL}`, "_blank")}
              className="flex-1 sm:text-start text-center text-lg text-teal-500 hover:underline cursor-pointer font-light "
            >
              Download VAT Invoice
            </p>

            {/* Files view */}
            <Button
              className={"sm:flex hidden flex-1"}
              onClick={() => router.push("/hire")}
            >
              Book another pilot
            </Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

// ----------------------- SERVER SIDE -----------------
export const getServerSideProps = async ({ query }) => {
  const orderId = query?.id;

  // fetch order
  try {
    if (orderId !== undefined) {
      const { data, error } = await fetchOrder(orderId);
      if (error) throw new Error("Failed to fetch order !");

      if (data.length !== 0) {
        // Get pilot data if pilot have assigned
        let pilotData = null;
        if (data[0].pilotID !== null) {
          const { data: pilotObj, error: pilotError } = await getPilotData(
            data[0].pilotID
          );

          if (!pilotError) pilotData = pilotObj[0];
        }

        return {
          props: {
            data: data[0],
            pilot: pilotData,
            error: null,
          },
        };
      } else {
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
          props: {},
        };
      }
    }
  } catch (err) {
    return {
      props: {
        data: null,
        pilot: null,
        error: "Failed to fetch order details",
      },
    };
  }
};

export default TrackOrder;

function formatDate(inputDate) {
  let date, month, year;

  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");

  return `${date}/${month}/${year}`;
}
