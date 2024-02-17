import { PilotExpertiseTitle } from 'global-constants'
import React from 'react'
import { Card } from "../../ui/card";
import {
  MapPin as MapPinIcon,
  Calendar as CalendarIcon,
  SunIcon,
  Clock4 as ClockIcon,
  InfoIcon as InformationCircleIcon
} from "lucide-react";
import Button from '../DuberButton';

export interface OrderData {
  address: string,
  date: string,
  arrivalTime: null | string,
  duration: number,
  expertise: PilotExpertiseTitle,
  delivery_method: string,
  bookingDescription: string
}

type Props = {
  className: string,
  AddToCalender?: React.ReactNode,
  orderData?: OrderData,
  handleDownloadReceipt?: () => void,
}

export default function BookingDetails({ className, AddToCalender, orderData, handleDownloadReceipt }: Props) {
  const { address, arrivalTime, date, delivery_method, duration, expertise, bookingDescription } = orderData!;

  return (
    <div className={` ${className} flex flex-col gap-y-3`}>
      <div className="flex items-center justify-between">
        <h1 className='font-semibold text-lg text-duber-navyBlue'>Booking Details</h1>
        <div className="">
          {AddToCalender}
        </div>
      </div>

      <div className=" flex flex-1 flex-col gap-y-3">
        <BookDetailTab
          id="Address"
          text={address}
          icon={<MapPinIcon className='w-6 h-6 text-duber-skyBlue' strokeWidth={2} />}
        />
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
      </div>

      <div className="w-full">
        <Button
          size={"lg"}
          variant={'teal'}
          className='w-full h-12 text-base font-semibold'
          onClick={handleDownloadReceipt}
        >Download Receipt</Button>
      </div>
    </div>
  )
}

interface BookDetailTabProps {
  id: string,
  text: string,
  icon?: React.ReactNode,
  variant?: 'primary' | 'danger',
}

function BookDetailTab({ text, icon, variant, id }: BookDetailTabProps) {
  variant = variant ? variant : 'primary';

  return (
    <Card className={`${id === 'Booking_Description' && 'h-32 min-h-full'} ${variant === 'primary' ? 'bg-duber-skyBlue-light' : variant === 'danger' ? "bg-red-200" : ""} rounded-md w-full p-2.5 flex ${id === 'Booking_Description' ? "items-start" : "items-center"} gap-x-3`}>
      {icon && <div className={`${variant === 'danger' ? "text-destructive" : "text-duber-skyBlue"}`}>{icon}</div>}

      <p className={`${variant === 'danger' ? "text-destructive" : "text-duber-skyBlue"} text-sm flex-1 ${id === 'PilotExpertise' && 'whitespace-nowrap'}`}>{text}</p>
    </Card>
  )
}



