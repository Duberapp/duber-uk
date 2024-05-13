import React from 'react'
import DashboardCard from '../../DashboardCard'
import { Card, CardContent } from '../../../../ui/card'
import Button from '../../../DuberButton'
import TextField from '../../../TextField'
import { CalendarIcon, SunIcon, Clock4Icon, AlertCircleIcon } from 'lucide-react'

interface SettingsProps { }

export default function Settings({ }: SettingsProps) {
  return (
    <div className="py-3 grid grid-cols-4 gap-3">
      {/* Row 1 */}
      <DashboardCard
        noIcon
        title='Relist to'
        mainText={`Available`}
        variant='disabled'
        clickable
        onClick={() => ""}
      />

      <DashboardCard
        noIcon title='Extend Deliverables' mainText={`30 Days`} clickable
      />

      <DashboardCard
        noIcon title='Delete' mainText={`Deliverables`} clickable variant='disabled'
      />

      <DashboardCard
        noIcon title='Cancel Booking' mainText={`Refund`} variant='destructive' clickable
      />

      {/* Row 2 */}
      <Card className='py-5 col-span-2'>
        <CardContent>
          <div className="w-full flex items-center justify-between">
            <p className="text-duber-navyBlue font-semibold text-lg">Change Booking Details</p>
            <Button size={"sm"} variant={'default'} className='px-8'>Update</Button>
          </div>

          <div className="mt-6">
            <TextField
              version={'blue'}
              error={false}
              leftIcon={<CalendarIcon className='text-duber-skyBlue w-5 h-5' />}
              value='15 November 2024'
            />

            <div className="flex items-center gap-x-3 mt-3">
              <TextField
                parentClassName='flex-1 min-w-56'
                version={'blue'}
                error={false}
                leftIcon={<SunIcon className='text-duber-skyBlue w-5 h-5' />}
                value='8 am'
              />
              <TextField
                parentClassName='flex-1 min-w-56'
                version={'blue'}
                error={false}
                leftIcon={<Clock4Icon className='text-duber-skyBlue w-5 h-5' />}
                value='2 Hours'
              />
            </div>

            <div className="flex items-center gap-x-3 mt-3">
              <TextField
                parentClassName='flex-1 min-w-56'
                version={'blue'}
                error={false}
                value='Building / Roof Inspection'
              />
              <TextField
                parentClassName='flex-1/4 min-w-56'
                version={'blue'}
                error={false}
                value='Videos & Phots'
              />
            </div>

            <div className="mt-3">
              <div className="bg-duber-skyBlue-light px-4 py-2 rounded-lg flex gap-x-3 items-start">
                <AlertCircleIcon className='text-duber-skyBlue w-5 h-5' />

                <textarea
                  rows={5}
                  className='bg-transparent placeholder:text-duber-skyBlue text-duber-skyBlue w-full flex-1'
                  value={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore odit error nam, facere assumenda at! Repudiandae nesciunt deleniti,'}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='py-5 col-span-2'>
        <CardContent>
          <div className="w-full flex items-center justify-between">
            <p className="font-semibold text-lg">Pilot Details <span className='font-normal'>ID :</span></p>
            <Button size={"sm"} variant={'default'} className='px-8'>Assign Pilot</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}