import React, { useEffect, useState } from 'react'
import { type DurationOption, durationList } from "global-constants";
import Button from "../DuberButton";

interface OrderDurationSelectorProps {
  availableDurations: DurationOption[],
  onSelectDuration: (duration: DurationOption) => void;
  extendedDurationHours?: number,
}

export default function OrderDurationSelector({ availableDurations, onSelectDuration, extendedDurationHours }: OrderDurationSelectorProps) {
  const [activeExtendedDurationHours, setActiveExtendedDurationHours] = useState<DurationOption>()

  useEffect(() => {
    let filteredExtendedDuration = durationList.filter(duration => (duration.durationHours === extendedDurationHours && duration.type !== 'included'))

    setActiveExtendedDurationHours(filteredExtendedDuration[0])
  }, [extendedDurationHours])

  return (
    <div className="grid grid-cols-4 grid-rows-2 w-full gap-1">
      {durationList.map(duration => (
        <Button
          key={duration.id}
          variant={
            duration.price === activeExtendedDurationHours?.price ? 'teal-dark'
              : duration.type === 'included' ? 'pink'
                : duration.type === 'extend' ? 'skyBlue'
                  : 'default'
          }
          disabled={!availableDurations.find(durationObj => durationObj.id === duration.id)}
          onClick={() => onSelectDuration(duration)}
        >
          <div className="flex flex-col items-center justify-center whitespace-nowrap ">
            <p className="text-[10px] font-semibold">+{duration.durationHours}hr</p>
            <p className="text-[10px] font-light">{duration.price === 'free' ? 'Free' : `£${duration.price}`}</p>
          </div>
        </Button>
      ))}
    </div>
  )
}