import { type PilotExpertise, type PilotExpertiseSlug, PilotExpertises, type JobStatusType } from 'global-constants'
import { Card } from '../../ui/card'
import Button from '../DuberButton'
import { useEffect, useState } from 'react';

interface JobCardProps {
  expertise: PilotExpertiseSlug,
  jobID: number,
  jobLocation: string,
  jobDate: string,
  onClick: (jobId: number, preventRoute?: boolean) => void,
  isActive: boolean,
  jobStatus: JobStatusType
}

export default function JobCard({ expertise, jobDate, jobID, jobLocation, onClick, isActive, jobStatus }: JobCardProps) {
  const pilotExpertise: PilotExpertise | null = PilotExpertises.filter(exp => expertise === exp.slug)[0];

  const getJobLocation = (jobLocation: string) => {
    if (!jobLocation) return;

    const strArray = jobLocation.split(",");
    const location = strArray[strArray.length - 2] + ", " + strArray[strArray.length - 1];

    return location
  }

  return (
    <Card className="bg-white p-2.5 flex sm:flex-row flex-col items-center sm:gap-x-2.5 gap-x-0">
      <div className="bg-duber-navyBlue p-2.5 rounded-md sm:w-48 w-full">
        <div className="flex items-center justify-between">
          <p className="text-xs font-thin text-white">Required Expertise</p>
          {jobStatus !== 'Available' && <StatusBadge className='sm:hidden block max-w-20' status={jobStatus} />}
        </div>
        <h2 className='font-semibold text-base text-white whitespace-nowrap'>{pilotExpertise?.title}</h2>
      </div>

      <div className="flex flex-row flex-1 sm:gap-x-2.5 gap-x-0 sm:justify-normal justify-between w-full sm:mt-0 mt-1">
        <div className="flex flex-col justify-center flex-1">
          <p className="sm:text-xs text-[10px] font-thin text-duber-navyBlue">Location</p>
          <h2 className='font-semibold sm:text-base text-sm text-duber-navyBlue'>{getJobLocation(jobLocation)}</h2>
        </div>

        <div className="flex flex-col justify-center flex-1">
          <p className="sm:text-xs text-[10px] font-thin text-duber-navyBlue">Date</p>
          <h2 className='font-semibold sm:text-base text-sm text-duber-navyBlue'>{
            new Date(jobDate)
              .toLocaleString()
              .split(", ")[0]
          }</h2>
        </div>

        <div className="flex flex-col gap-y-1 justify-center items-end sm:flex-1 flex-none">
          {jobStatus !== 'Available' && (
            <StatusBadge className='sm:block hidden' status={jobStatus} />
          )}
          <Button
            variant={!isActive ? "teal" : "pink"}
            size={jobStatus === 'Available' ? "xxl" : "lg"}
            onClick={() => onClick(jobID)}
            className={`${jobStatus !== 'Available' ? "w-full" : ""} sm:w-full w-fit sm:px-0 px-5 sm:text-base text-sm sm:h-12 h-11`}
          >
            View
          </Button>
        </div>
      </div>

    </Card>
  )
}

export function StatusBadge({ status, className }: { status: JobStatusType, className?: string }) {
  return (
    <div className={`w-full rounded-md py-1 text-xs text-center ${className} ${status === 'Live' && 'bg-red-200 text-red-500'} ${status === 'Completed' && 'bg-duber-skyBlue-light text-duber-skyBlue'}`}>
      {status}
    </div>
  )
}