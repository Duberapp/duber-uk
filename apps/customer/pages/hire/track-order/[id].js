import React, { useEffect, useState } from "react";
import {
  AddToCalender,
  MainLayout,
} from "../../../components/CustomerDashboard_Components";
import { fetchOrder, getPilotData } from "../../../config/supabaseFunctions";
import { useRouter } from "next/router";
import AWS from "aws-sdk";
import {
  getS3Object_DownloadLink,
  handleDownloadZip,
} from "../../../utils/utilityFunctions";
import {
  TrackingBar,
  SubscriptionInfoBar,
  TrackingPageLayout,
  BookingDetails,
  BookingControlPanel,
  Button,
} from "ui";
import { PilotExpertises } from "global-constants";
import GoogleMap from "../../../components/GoogleMap";

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
  const [expiredStatus, setExpiredStatus] = useState(null);

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

      setExpiredStatus(expiredStatus);
      if (expiredStatus === "Expired") setIsExpired(true);
    }
  }, [data]);

  // ================ NEW =================
  const [showCancelBookingPanel, setShowCancelBookingPanel] = useState(false);
  const [isBookingCancelled, setIsBookingCancelled] = useState(false);
  const [showSubscriptionView, setShowSubscriptionView] = useState(false);
  const [showMobileBookingDetails, setShowMobileBookingDetails] =
    useState(false);

  const deliverablesList = new Array(30).fill().map((_, index) => ({
    id: index + 1,
    name: "DJI_12322432.img",
    thumbnail: "assets/deliver_thumbnail_test.jpg",
    link: "#",
  }));
  // ================-----=================

  const handleDownloadReceipt = () =>
    window.open(`${data.invoiceURL}`, "_blank");

  return (
    <MainLayout TrackingPage={true}>
      <div className="w-full sm:h-screen h-[90vh] flex items-center justify-center">
        <TrackingPageLayout>
          <TrackingBar className="min-w-full" status={data.status} />

          <SubscriptionInfoBar
            className="min-w-full"
            expireCountDown={expiredStatus}
            handleBookingCancel={() =>
              setShowCancelBookingPanel(!showCancelBookingPanel)
            }
            isBookingCancelled={isBookingCancelled}
            isPilotAssigned={false}
            isSubscriptionEnabled={
              data.storagePlan?.slug === "basic" ? false : true
            }
            showSubscriptionView={showSubscriptionView}
            setShowSubscriptionView={setShowSubscriptionView}
          />

          <div className="flex sm:flex-row flex-col gap-x-2.5 min-w-full sm:mt-0 mt-12 h-full">
            <BookingDetails
              className="sm:flex hidden flex-1"
              orderData={{
                address: data.address,
                arrivalTime: data.arrivalTime,
                date: formatDate(new Date(data.date)),
                delivery_method: data.captureFormat,
                duration: data.includedDuration + data.extendDuration,
                expertise: PilotExpertises.filter(
                  (exp) => exp.slug === data.pilotExpertize
                )[0].title,
                bookingDescription: data.customerNote,
              }}
              AddToCalender={
                <AddToCalender
                  data={{
                    address: data.address,
                    id: data.id,
                    customerNotes: data.customerNote,
                    date: data.date,
                    arrivalTime: data.arrivalTime,
                  }}
                />
              }
              handleDownloadReceipt={handleDownloadReceipt}
            />

            <BookingControlPanel
              showMobileBookingDetails={showMobileBookingDetails}
              setShowMobileBookingDetails={setShowMobileBookingDetails}
              className="flex-1 h-full bg-gray-100"
              MapComponent={
                <>
                  {data.mapData?.polygon ? (
                    <GoogleMap
                      polygons={[data.mapData?.polygon]}
                      staticMapType={"roadmap"}
                      mapState={"static"}
                      location={data.mapData?.center}
                    />
                  ) : (
                    <></>
                  )}
                </>
              }
              showCancelBookingPanel={showCancelBookingPanel}
              setShowCancelBookingPanel={setShowCancelBookingPanel}
              isPilotAssigned={false}
              pilotData={{}}
              deliverablesView={false}
              deliverablesList={deliverablesList}
              isDeliverablesExpired={false}
              showSubscriptionView={showSubscriptionView}
              setShowSubscriptionView={setShowSubscriptionView}
              SubscriptionComponent={
                <div className="bg-white w-full rounded-lg h-full p-2">
                  <div className="w-full flex items-end justify-end mb-2">
                    <p
                      className="text-xs text-duber-skyBlue cursor-pointer hover:underline"
                      onClick={() => setShowSubscriptionView(false)}
                    >
                      Close
                    </p>
                  </div>
                  Subscription Card View
                </div>
              }
              orderData={{
                address: data.address,
                arrivalTime: data.arrivalTime,
                date: formatDate(new Date(data.date)),
                delivery_method: data.captureFormat,
                duration: data.includedDuration + data.extendDuration,
                expertise: PilotExpertises.filter(
                  (exp) => exp.slug === data.pilotExpertize
                )[0].title,
                bookingDescription: data.customerNote,
              }}
            />
          </div>

          <div className="sm:hidden flex w-full">
            <Button
              size={"lg"}
              variant={"teal"}
              className="w-full h-12 text-base font-semibold"
              onClick={handleDownloadReceipt}
            >
              Download Receipt
            </Button>
          </div>
        </TrackingPageLayout>
      </div>
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
