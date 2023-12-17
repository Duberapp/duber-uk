import { Card } from '../../ui/card'
import Button from '../DuberButton'

interface ApplicationCardProps {
  pilotID: string,
  pilotName: string,
  createdAt: string,
  isApproved: boolean,
  isDeclined: boolean,
  test__handleView: () => void,
}

export default function ApplicationCard({
  pilotID,
  pilotName,
  createdAt,
  isApproved,
  isDeclined,
  test__handleView
}: ApplicationCardProps) {

  const applicationStatus =
    (!isApproved && !isDeclined) ? 'new' :
      (!isApproved && isDeclined) ? "declined" :
        (isApproved && !isDeclined) && "approved"

  function handleView() {
    test__handleView()
    console.log(pilotID)
  }

  return (
    <Card className='bg-white flex items-center gap-x-2.5 p-2.5'>
      <Card className="w-44 bg-duber-navyBlue p-2.5">
        <p className="text-xs font-light text-white">Pilot Name</p>
        <p className="font-semibold text-white mt-1">{pilotName}</p>
      </Card>

      <div className="flex-1">
        <p className="text-xs font-light text-duber-navyBlue">Date</p>
        <p className="font-semibold text-duber-navyBlue mt-1">{createdAt}</p>
      </div>

      <div className={`
        ${applicationStatus === 'approved' && "bg-green-100 text-green-500"}
        ${applicationStatus === 'declined' && "bg-red-100 text-red-500"}
        ${applicationStatus === 'new' && "bg-duber-skyBlue-light text-duber-skyBlue"}
        w-24 h-10 flex items-center justify-center rounded-md text-sm font-semibold
      `}>
        {applicationStatus === 'approved' && "Approved"}
        {applicationStatus === 'declined' && "Declined"}
        {applicationStatus === 'new' && "New"}
      </div>

      <Button
        className='w-16'
        variant={'teal'}
        size={'xxl'}
        onClick={handleView}
      >
        View
      </Button>
    </Card>
  )
}