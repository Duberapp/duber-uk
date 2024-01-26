import React from 'react'
import { type StoragePlanType } from "global-constants";
import { Card } from "../../ui/card";
import { ExclamationTriangleIcon, BoltIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

type StoragePlanCardProps = {
  storage_plan: StoragePlanType,
  className?: string,
  selectedPlan: StoragePlanType,
  handleSelect: () => void,
}

function StoragePlanCard({ className, storage_plan, handleSelect, selectedPlan }: StoragePlanCardProps) {
  const isSelected = Object.keys(selectedPlan).length > 0 && selectedPlan.id === storage_plan.id

  return (
    <Card onClick={handleSelect} className={`${!isSelected ? 'bg-duber-skyBlue-light' : 'bg-duber-teal-light'} cursor-pointer rounded-lg flex flex-col items-center p-1 ${className}`}>
      <div className="flex items-center justify-center pt-8 pb-2.5 flex-col">
        <img src={storage_plan.slug === 'basic'
          ? `/assets/drone-1.svg`
          : storage_plan.slug === 'premium'
            ? `/assets/drone-2.svg`
            : ''
        } alt='Drone Vector' className='w-32' />
        <h1 className={`capitalize mt-6 font-semibold ${isSelected ? 'text-duber-teal-dark' : 'text-duber-skyBlue'} text-2xl`}>{storage_plan.slug}</h1>
      </div>

      <div className="flex-1 flex flex-col gap-y-4 pt-4">
        {storage_plan.features?.map(feature => (
          <div className="flex items-center gap-x-1">
            {storage_plan.slug === 'basic' && <ExclamationTriangleIcon strokeWidth={2} className={`w-5 h-5 ${isSelected ? 'text-duber-teal-dark' : 'text-duber-skyBlue'}`} />}
            {storage_plan.slug === 'premium' && <BoltIcon strokeWidth={2} className={`w-5 h-5 ${isSelected ? 'text-duber-teal-dark' : 'text-duber-skyBlue'}`} />}
            <p className="text-[13px] font-semibold">{feature}</p>
          </div>
        ))}
      </div>

      <div className="w-full flex items-center gap-x-2 p-1.5">
        <p className={`text-2xl font-semibold ${isSelected ? 'text-duber-teal-dark' : 'text-duber-skyBlue'} flex-1 px-2.5`}>
          {storage_plan.price === 'free'
            ? 'Free'
            : (
              <>
                <span>{storage_plan.price}/</span>
                <span className='text-base'>{`Month`}</span>
                <span className='text-sm'>{`(ex vat)`}</span>
              </>
            )}
        </p>

        <CheckCircleIcon className={`w-7 h-7 ${isSelected ? 'text-duber-teal-dark' : 'text-gray-400/80'} `} />
      </div>
    </Card>
  )
}

export default StoragePlanCard