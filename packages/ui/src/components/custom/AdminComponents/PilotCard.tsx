import Button from '../DuberButton'

interface Props {
  name: string,
  company: string,
  totalJob: string | number,
  pilotID: string | number,
  onView: (pilotID: string | number) => void;
}

export default function PilotCard({ name, company, onView, pilotID, totalJob }: Props) {
  return (
    <div className='w-full p-2 rounded-lg bg-white shadow-md flex items-center justify-between border border-slate-200'>
      <div className="bg-duber-navyBlue py-2.5 rounded-lg pl-3 pr-8">
        <p className="text-xs font-light text-white">Name</p>
        <p className="text-lg font-semibold text-white">{name}</p>
      </div>

      <div className="flex-1 items-center justify-between px-6 flex">
        <div className='flex-1'>
          <p className="text-xs text-duber-navyBlue font-light">Company</p>
          <p className="text-base text-duber-navyBlue">{company ? company : "None"}</p>
        </div>
        <div className='flex-1'>
          <p className="text-xs text-duber-navyBlue font-light">Total Jobs</p>
          <p className="text-base text-duber-navyBlue">{totalJob ? totalJob : "None"}</p>
        </div>

        <div className='flex-1' />

        <div className='flex-1'>
          <p className="text-xs text-duber-navyBlue font-light">Pilot ID</p>
          <p className="text-base text-duber-navyBlue">{pilotID ? pilotID : "None"}</p>
        </div>
      </div>

      <Button size={'xxl'} variant={'teal'} onClick={() => onView(pilotID!)}>View</Button>
    </div>
  )
}