import { useState } from 'react'
import { JobCancellationReasons } from "global-constants";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card";
import Button from '../DuberButton'
import { XIcon } from 'lucide-react';

interface CancelReturnType {
  data: any | null,
  error: any | null,
}

interface ModalProps {
  className: string,
  onCancel: (data: any | null, error: any | null) => CancelReturnType;
  handleClose: () => void;
}


export default function JobCancellationModal({ className, onCancel, handleClose }: ModalProps) {
  const [activeReason, setActiveReason] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTriggerCancel = async () => {
    try {
      setIsLoading(true)

      onCancel(`success -> ${activeReason}`, null);

      setIsLoading(false)
    } catch (err) {
      onCancel(null, `error -> ${activeReason}`)
      setIsLoading(false)
    }
  }

  return (
    <div className={`${className} w-full h-full bg-white/70 flex items-center justify-center`}>
      <Card className="max-w-sm bg-red-200">
        <CardHeader>
          <CardTitle className='text-xl text-red-500 flex items-center justify-between'>Reason for cancelling
            <span onClick={handleClose} className='p-1 border border-red-300 rounded-md cursor-pointer text-red-400 hover:text-red-500'><XIcon className='w-4 h-4 ' /></span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-500">{`Please note falsely cancelling a job can result in the your supplier agreement being revoked.`}</p>

          <div className="mt-3 flex items-center flex-wrap gap-2">
            {JobCancellationReasons.map((reason, index) => (
              <div key={index} onClick={() => setActiveReason(reason)} className={`px-2 py-1 cursor-pointer rounded-md border border-gray-500 ${activeReason === reason ? 'bg-gray-500 text-white' : "text-gray-500"}`}>
                {reason}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleTriggerCancel}
            variant={'destructive'}
            className="w-full text-sm"
            size={'lg'}
            disabled={!activeReason || isLoading}
            isLoading={isLoading}
          >
            I can confirm i want to cancel this job
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}