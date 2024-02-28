import { PilotExpertiseTitle } from 'global-constants';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { BookDetailTab } from './BookingDetails';
import {
  MapPin as MapPinIcon,
  Calendar as CalendarIcon,
  SunIcon,
  Clock4 as ClockIcon,
  InfoIcon as InformationCircleIcon
} from "lucide-react";

export interface OrderData {
  address: string,
  date: string,
  arrivalTime: null | string,
  duration: number,
  expertise: PilotExpertiseTitle,
  delivery_method: string,
  bookingDescription: string
}

interface ComponentProps {
  className: string,
  orderData?: OrderData,
  showMobileBookingDetails: boolean,
  setShowMobileBookingDetails: Dispatch<SetStateAction<boolean>>
}

export default function MobileBookingDetails(
  { className, orderData, showMobileBookingDetails, setShowMobileBookingDetails }: ComponentProps
) {
  const { address, arrivalTime, date, delivery_method, duration, expertise, bookingDescription } = orderData!;

  return (
    <div className={`${className} w-full bg-white rounded-lg p-2 ${showMobileBookingDetails && 'h-full'}`}>
      <div className="w-full flex items-center justify-between">
        <h2 className='text-lg font-semibold text-duber-navyBlue'>Booking Details</h2>
        <p className='text-sm text-duber-skyBlue font-light' onClick={() => setShowMobileBookingDetails(!showMobileBookingDetails)}>
          {showMobileBookingDetails ? "Close" : "See more details"}
        </p>
      </div>

      <div className="mt-2 flex flex-1 flex-col gap-y-2">
        <BookDetailTab
          id="Address"
          text={address}
          icon={<MapPinIcon className='w-6 h-6 text-duber-skyBlue' strokeWidth={2} />}
        />

        {showMobileBookingDetails && <>
          <BookDetailTab
            id="Arrival Date"
            text={date}
            icon={<CalendarIcon className='w-6 h-6 text-duber-skyBlue' strokeWidth={2} />}
          />

          <div className="flex items-center gap-x-3">
            <BookDetailTab
              id="Arrival Time"
              text={arrivalTime ? `${arrivalTime}` : "To be confirmed"}
              icon={<SunIcon className='w-6 h-6' strokeWidth={2} />}
              variant={arrivalTime ? `primary` : "danger"}
            />
            <BookDetailTab
              id="Booking Duration"
              text={`${duration} Hours`}
              icon={<ClockIcon className='w-6 h-6 text-duber-skyBlue' strokeWidth={2} />}
            />
          </div>

          <div className="flex items-center gap-x-3">
            <BookDetailTab
              id="PilotExpertise"
              text={expertise}
            />
            <BookDetailTab
              id="DeliveryMethod"
              text={delivery_method}
            />
          </div>


          <div className="flex-1">
            <BookDetailTab
              icon={<InformationCircleIcon className='w-6 h-6 text-duber-skyBlue' strokeWidth={2} />}
              id="Booking_Description"
              text={bookingDescription}
            />
          </div>

        </>}
      </div>
    </div>
  )
}