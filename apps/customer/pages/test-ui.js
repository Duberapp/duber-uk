import React, { useState } from "react";
import {
  TrackingBar,
  SubscriptionInfoBar,
  TrackingPageLayout,
  BookingDetails,
  BookingControlPanel,
} from "ui";

const TestUI = () => {
  const [showCancelBookingPanel, setShowCancelBookingPanel] = useState(false);
  const [isBookingCancelled, setIsBookingCancelled] = useState(false);
  const [showSubscriptionView, setShowSubscriptionView] = useState(false);

  const deliverablesList = new Array(30).fill().map((_, index) => ({
    id: index + 1,
    name: "DJI_12322432.img",
    thumbnail: "assets/deliver_thumbnail_test.jpg",
    link: "#",
  }));

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <TrackingPageLayout>
        <TrackingBar className="min-w-full" status="Live" />

        <SubscriptionInfoBar
          className="min-w-full"
          expireCountDown={12}
          handleBookingCancel={() =>
            setShowCancelBookingPanel(!showCancelBookingPanel)
          }
          isBookingCancelled={isBookingCancelled}
          isPilotAssigned={false}
          isSubscriptionEnabled={false}
          showSubscriptionView={showSubscriptionView}
          setShowSubscriptionView={setShowSubscriptionView}
        />

        <div className="flex flex-1 gap-x-2.5 min-w-full">
          <BookingDetails
            className="flex-1"
            orderData={{
              address: "59 Washbrook Road, Portsmouth, United Kingdom, PO6 3SA",
              arrivalTime: "8 am",
              date: "15 November 2023",
              delivery_method: "Videos & Photos",
              duration: 2,
              expertise: "Marketing",
              bookingDescription:
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
            }}
          />

          <BookingControlPanel
            className="flex-1 bg-gray-100"
            MapComponent={<div className="w-full h-full bg-blue-300">Map</div>}
            showCancelBookingPanel={showCancelBookingPanel}
            setShowCancelBookingPanel={setShowCancelBookingPanel}
            isPilotAssigned={false}
            pilotData={{
              contactNumber: "+94705848028",
              name: "Jaime Harris",
              pilotExpertise: "Building / Roof Inspection, Marketing",
              droneEquipments: ["DJI Phantom 4 Pro", "DJI Mavic"],
              CAA_Info: {
                flyer_id: "SGG-4GSFG4-FS",
                operator_id: "SGG-4GSFG4-FS",
              },
            }}
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
          />
        </div>
      </TrackingPageLayout>
    </div>
  );
};

export default TestUI;
