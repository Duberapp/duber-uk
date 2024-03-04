import { PilotExpertises, type JobStatusType, type PilotExpertiseSlug, calculatePilotJobValue } from 'global-constants'
import { Card } from '../../ui/card'
import { StatusBadge } from './JobCard'

interface SingleJobOverviewCardProps {
  capability: PilotExpertiseSlug,
  jobValue: number,
  transferRate: number,
  jobStatus: JobStatusType
}

export default function SingleJobOverviewCard({ capability, jobStatus, jobValue, transferRate }: SingleJobOverviewCardProps) {

  return (
    <Card className='bg-duber-navyBlue px-3 py-4 flex items-center justify-between'>
      <div className="">
        <p className="text-sm font-light text-white">Required Expertise</p>
        <h2 className='text-2xl font-semibold text-white'>{PilotExpertises.filter(exp => exp.slug === capability)[0].title}</h2>
      </div>

      <div className="">
        <p className="text-duber-pink font-medium mb-1">Payout £ {calculatePilotJobValue(jobValue, transferRate)}</p>
        <StatusBadge status={jobStatus} className='px-8 text-base font-medium' />
      </div>
    </Card>
  )
}