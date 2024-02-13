import React from "react";
import {
  TrackingBar,
  SubscriptionInfoBar,
  TrackingPageLayout,
  BookingDetails,
  MapContainer,
} from "ui";

const TestUI = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <TrackingPageLayout>
        <TrackingBar className="min-w-full" status="Live" />

        <SubscriptionInfoBar
          className="min-w-full"
          expireCountDown={12}
          handleBookingCancel={() => {}}
          isBookingCancelled={false}
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

          <MapContainer className="flex-1 bg-gray-100" />
        </div>
      </TrackingPageLayout>
    </div>
  );
};

export default TestUI;
