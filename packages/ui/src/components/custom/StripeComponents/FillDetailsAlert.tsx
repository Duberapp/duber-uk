import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../../ui/card'
import Button from '../DuberButton'

interface FillDetailsAlertProps {
  onAction?: () => void,
  link?: string
}

export default function FillDetailsAlert({ onAction, link }: FillDetailsAlertProps) {
  return (
    <Card className='bg-red-200 max-w-sm'>
      <CardHeader>
        <CardTitle className='text-red-500'>Action Required</CardTitle>
        <CardDescription className='text-red-400 whitespace-pre-line'>
          {`In order to start accepting jobs, we need setup how we pay you. \n
            Firstly go to your accounts page and enter your billing address information, then come back here`}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        {(onAction && !link) && <Button
          className='w-full bg-red-500 text-white h-12 hover:bg-red-600'
          onClick={onAction}
        >
          Account Settings
        </Button>}
        {(!onAction && link) && <Button
          className='w-full bg-red-500 text-white h-12 hover:bg-red-600'
          asChild
        >
          <a href={link}>Account Settings</a>
        </Button>}
      </CardFooter>
    </Card>
  )
} 