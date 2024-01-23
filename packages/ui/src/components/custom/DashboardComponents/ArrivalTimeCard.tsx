import React, { Dispatch, SetStateAction } from 'react'
import { type TimeOptionSlug, TimeOptions, type TimeOptionType, type TimeSlot } from "global-constants";
import Button from "../../custom/DuberButton";

type ArrivalTimeCardProps = {
  slug: TimeOptionSlug,
  activeOption: TimeOptionSlug | null,
  setActiveOption: (time_option: TimeOptionType) => void,
  timeSlot: TimeSlot | null,
  setTimeSlot: Dispatch<SetStateAction<TimeSlot | null>>,
  handleSetPrice: (price: number) => void;
}

export default function ArrivalTimeCard({ slug, activeOption, setActiveOption, setTimeSlot, timeSlot, handleSetPrice }: ArrivalTimeCardProps) {
  const timeOption = TimeOptions.filter(obj => obj.slug === slug)[0]
  const isActive = activeOption === timeOption.slug

  const textColor = isActive ? 'text-duber-teal-dark' : 'text-duber-skyBlue'

  const handleChooseOption = (timeOption: TimeOptionType) => {
    if (timeOption.slug === 'choose') return;

    setTimeSlot(null);
    setActiveOption(timeOption);
    handleSetPrice(timeOption.price)
  }

  const handleChooseTimeSlot = (slot: TimeSlot) => {
    const chooseOption = TimeOptions.filter(obj => obj.slug === 'choose')[0];
    setTimeSlot(slot)
    setActiveOption(chooseOption);
    handleSetPrice(chooseOption.price)
  }

  return (
    <div
      onClick={() => timeOption.slug !== 'choose' && handleChooseOption(timeOption)}
      className={`h-full w-full rounded-lg ${isActive ? 'bg-duber-teal-light' : 'bg-duber-skyBlue-light'} p-2.5 flex items-center justify-between ${timeOption.slug !== 'choose' && 'cursor-pointer'}`}
    >
      {/* ================= COL 1 ================= */}
      <div className="">
        <h1 className={`${textColor} font-normal text-[14px]`}>{timeOption.name}</h1>

        {timeOption.slug === 'choose' && <p className={`${textColor} text-xs`}>{timeOption.timeRange}</p>}

        <h1 className={`${textColor} font-semibold`}>{timeOption.price === 0 ? 'FREE' : `+ £${timeOption.price}`}</h1>
      </div>

      {/* ================= COL 2 ================= */}
      <div className={`flex flex-col h-full ${timeOption.slug !== 'choose' ? 'justify-between' : 'justify-center'}  items-end`}>
        {timeOption.slug !== 'choose' && <p className={`${textColor} text-xs`}>{timeOption.timeRange}</p>}

        {timeOption.slug === 'any_time' && <img src='/assets/leaf.png' alt='leaf' />}

        {timeOption.slug === 'choose' && (
          // Time Slot grid
          <div className="grid grid-cols-4 grid-rows-2 gap-1">
            {timeOption.times?.map((time, index) =>
              <Button
                key={index}
                size={'sm'}
                variant={`skyBlue`}
                className={`
                ${(timeSlot === time && isActive) && 'bg-duber-teal-dark hover:bg-duber-teal-dark'}
                `}
                onClick={() => handleChooseTimeSlot(time)}
              >{time}</Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}