import React from 'react'
import { type DurationOption, durationList } from "global-constants";
import Button from "../DuberButton";

interface OrderDurationSelectorProps {
  availableDurations: DurationOption[]
}

export default function OrderDurationSelector({ availableDurations }: OrderDurationSelectorProps) {
  return (
    <div className="grid grid-cols-4 grid-rows-2 w-full gap-1">
      {durationList.map(duration => (
        <Button
          variant={duration.type === 'included' ? 'pink' : duration.type === 'extend' ? 'skyBlue' : 'default'}
          disabled={!availableDurations.find(durationObj => durationObj.id === duration.id)}
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