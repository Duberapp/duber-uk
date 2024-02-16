import React from 'react'
import TrackingPageLayout from './TrackingPageLayout'
import TrackingBar, { type TrackingStatus } from './TrackingBar'
import SubscriptionInfoBar from './SubscriptionInfoBar'
import BookingDetails, { type OrderData } from './BookingDetails'
import BookingControlPanel from './BookingControlPanel'

type ShowcaseComponentProps = {
  trackingStatus: TrackingStatus,
  isBookingCancelled: boolean,
  isPilotAssigned: boolean,
  isSubscriptionEnabled: boolean,
  expireCountDown: number,
  orderData: OrderData
}

function TrackingPageShowcaseComponent({
  trackingStatus,
  isBookingCancelled,
  isPilotAssigned,
  isSubscriptionEnabled,
  expireCountDown,
  orderData }: ShowcaseComponentProps) {
  return (
    <TrackingPageLayout>
      <TrackingBar className="min-w-full" status={trackingStatus} />

      <SubscriptionInfoBar
        className="min-w-full"
        expireCountDown={expireCountDown}
        handleBookingCancel={() => { }}
        isBookingCancelled={isBookingCancelled}
        isPilotAssigned={isPilotAssigned}
        isSubscriptionEnabled={isSubscriptionEnabled}
      />

      <div className="flex flex-1 gap-x-2.5 min-w-full">
        <BookingDetails
          className="flex-1"
          orderData={orderData}
        />

        <BookingControlPanel
          className={`flex-1 bg-gray-100`}
        />
      </div>
    </TrackingPageLayout>
  )
}

export default TrackingPageShowcaseComponent