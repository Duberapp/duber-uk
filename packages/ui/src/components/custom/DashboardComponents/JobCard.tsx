import { type PilotSkill_Slug, pilot_skills, type PilotSkill } from "../../../shared-data";
import { Card } from '../../ui/card'
import Button from '../DuberButton'

interface JobCardProps {
  expertise: PilotSkill_Slug,
  jobID: number,
  jobLocation: string,
  jobDate: string,
}

export default function JobCard({ expertise, jobDate, jobID, jobLocation }: JobCardProps) {
  const pilotSkill: PilotSkill | null = pilot_skills.filter(skillObj => skillObj.slug === expertise)[0];

  const handleView = () => {
    console.log(jobID)
  }

  return (
    <Card className="bg-white p-2.5 grid grid-cols-4 grid-rows-1 gap-x-2.5">
      <div className="bg-duber-navyBlue p-2.5 rounded-md">
        <p className="text-xs font-thin text-white">Required Expertise</p>
        <h2 className='font-semibold text-lg text-white'>{pilotSkill.title}</h2>
      </div>

      <div className="">
        <p className="text-xs font-thin text-duber-navyBlue">Location</p>
        <h2 className='font-semibold text-lg text-white'>{jobLocation}</h2>
      </div>

      <div className="">
        <p className="text-xs font-thin text-duber-navyBlue">Date</p>
        <h2 className='font-semibold text-lg text-white'>{jobDate}</h2>
      </div>

      <Button variant={"teal"} size={"xxl"} onClick={handleView}>View</Button>
    </Card>
  )
}