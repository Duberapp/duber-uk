import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../../ui/card'

interface CreateStripeAlertProps {
  StripeButton: React.ReactNode | React.ReactNode[]
}

export default function CreateStripeAlert({ StripeButton }: CreateStripeAlertProps) {
  return (
    <Card className='bg-red-200 max-w-sm'>
      <CardHeader>
        <CardTitle className='text-red-500'>Action Required</CardTitle>
        <CardDescription className='text-red-400 whitespace-pre-line'>
          {`In order to start accepting jobs, we need setup how we pay you. \n
            One more thing.... You need to create a stripe connected account so you can manage your payouts`}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        {StripeButton}
      </CardFooter>
    </Card>
  )
} 