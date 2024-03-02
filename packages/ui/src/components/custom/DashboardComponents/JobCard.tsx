import { type PilotExpertise, type PilotExpertiseSlug, PilotExpertises } from 'global-constants'
import { Card } from '../../ui/card'
import Button from '../DuberButton'
import { useEffect, useState } from 'react';

interface JobCardProps {
  expertise: PilotExpertiseSlug,
  jobID: number,
  jobLocation: string,
  jobDate: string,
  onClick: (jobId: number, preventRoute?: boolean) => void,
  isActive: boolean
}

export default function JobCard({ expertise, jobDate, jobID, jobLocation, onClick, isActive }: JobCardProps) {
  const pilotExpertise: PilotExpertise | null = PilotExpertises.filter(exp => expertise === exp.slug)[0];

  const getJobLocation = (jobLocation: string) => {
    if (!jobLocation) return;

    const strArray = jobLocation.split(",");
    const location = strArray[strArray.length - 2] + ", " + strArray[strArray.length - 1];

    return location
  }

  return (
    <Card className="bg-white p-2.5 flex flex-row items-center gap-x-2.5">
      <div className="bg-duber-navyBlue p-2.5 rounded-md w-48">
        <p className="text-xs font-thin text-white">Required Expertise</p>
        <h2 className='font-semibold text-base text-white whitespace-nowrap'>{pilotExpertise?.title}</h2>
      </div>

      <div className="flex flex-col justify-center  flex-1">
        <p className="text-xs font-thin text-duber-navyBlue">Location</p>
        <h2 className='font-semibold text-base text-duber-navyBlue'>{getJobLocation(jobLocation)}</h2>
      </div>

      <div className="flex flex-col justify-center flex-1">
        <p className="text-xs font-thin text-duber-navyBlue">Date</p>
        <h2 className='font-semibold text-base text-duber-navyBlue'>{
          new Date(jobDate)
            .toLocaleString()
            .split(", ")[0]
        }</h2>
      </div>

      <div className="flex flex-col justify-center items-end flex-1">
        <Button variant={!isActive ? "teal" : "pink"} size={"xxl"} onClick={() => onClick(jobID)}>View</Button>
      </div>
    </Card>
  )
}