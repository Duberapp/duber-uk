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
            isPilotAssigned={true}
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
            deliverablesView={true}
          />
        </div>
      </TrackingPageLayout>
    </div>
  );
};

export default TestUI;
