import React from 'react'
import Button from '../DuberButton'

type SubscriptionBarProps = {
  className: string,
  isSubscriptionEnabled: boolean,
  isBookingCancelled: boolean,
  expireCountDown: number,
  handleBookingCancel: () => void,
  isPilotAssigned: boolean,
  handleSubscribe?: () => void,
}

export default function SubscriptionInfoBar({ className, isPilotAssigned, expireCountDown, handleBookingCancel, isBookingCancelled, isSubscriptionEnabled }: SubscriptionBarProps) {
  return (
    <div className={`${className} flex items-center gap-x-2.5 h-16`}>
      {/* Expiring Alert */}
      {(!isSubscriptionEnabled) && (
        <div className={`h-full rounded-lg px-3 flex-1 bg-red-200 flex items-center justify-around`}>
          {!isBookingCancelled ? <>
            <p className={`text-red-600 flex-1 text-sm ${isPilotAssigned && 'text-center'}`}>Download Link Expering in : <span className='font-semibold'>{expireCountDown} Days</span></p>

            {!isPilotAssigned &&
              <p className="text-red-600 underline cursor-pointer text-xs" onClick={handleBookingCancel}>
                Cancel<br />Booking
              </p>
            }
          </> : (
            <h2 className='text-red-600 font-semibold text-center py-3'>Booking has been cancelled</h2>
          )}
        </div>
      )}

      {/* Premium Alert and Bar */}
      {!isBookingCancelled && <>
        {(!isSubscriptionEnabled) ?
          <div className={`flex-1 pl-3 pr-2 bg-duber-navyBlue h-full rounded-lg flex items-center justify-between`}>
            <div className="">
              <h1 className='text-teal-400 font-semibold text-lg'>Don't Stress !</h1>
              <p className='text-teal-400 text-sm'>Get Lifetime Access Now</p>
            </div>

            <div className="h-full  py-2">
              <Button variant={'skyBlue'} className='text-xs h-full'>Premium £10/month</Button>
            </div>
          </div>
          :
          <div className="flex-1 py-3 bg-teal-200 text-teal-600 font-semibold rounded-lg flex items-center justify-center h-full">
            Premium Enabled: Lifetime Access
          </div>
        }
      </>}
    </div>
  )
}