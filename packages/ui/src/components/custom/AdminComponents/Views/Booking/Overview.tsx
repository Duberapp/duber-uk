import React from 'react'
import DashboardCard from '../../DashboardCard'
import { Card, CardContent } from '../../../../ui/card'
import { type Tables as CustomerTables } from 'supabase-config/types/customer.supabase'
import { type Tables as PilotTables } from 'supabase-config/types/pilot.supabase'

interface CustomerData extends CustomerTables<"Customers"> {
  userData: any[] | null,
}

interface OverviewProps {
  currentJob: CustomerTables<"Orders">
  viewCustomer: () => void,
  viewPilot: () => void,
  customer?: CustomerData,
  pilot?: PilotTables<"Employees">
}

export default function Overview({ viewCustomer, viewPilot, customer, currentJob, pilot }: OverviewProps) {

  return (
    <div className="py-3 grid grid-cols-4 gap-3">
      {/* Row 1 */}
      <DashboardCard
        noIcon title='Total Price' mainText={`£${currentJob.amount}`}
      />
      <DashboardCard
        noIcon title='Status'
        // TODO : Add "Flight in progress" and "Awaiting Upload" status
        mainText={
          currentJob.status === 'Available' ? "Assigning Pilot" :
            currentJob.status === 'Live' ? "Pilot Assigned" :
              currentJob.status === 'Completed' ? "Completed" :
                ""
        }
      />
      <DashboardCard
        noIcon title='Deliverable Size' mainText='0GB'
      />
      <DashboardCard
        // @ts-ignore
        noIcon title='Subscription' mainText={currentJob?.storagePlan?.slug === 'basic' ? "Inactive" : "Active"}
      />

      {/* Row 2 */}
      <Card className='py-5 col-span-2'>
        <CardContent>
          <div className="w-full flex items-center justify-between">
            <p className=""><span className='font-semibold text-lg'>Customer Details</span> ID: {customer?.id}</p>
            <p onClick={viewCustomer} className="hover:underline cursor-pointer text-lg">View Customer</p>
          </div>

          <div className="flex flex-col gap-y-4 mt-4">
            <div>
              <p className="font-semibold text-sm mb-1">Full Name</p>
              <p className="">{customer?.title} {customer?.firstName} {customer?.lastName}</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Email Address</p>
              <p className="">{customer?.email}</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Phone Number</p>
              <p className="">{customer?.phoneNumber}</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">User Type</p>
              <p className="">{customer?.userData === null ? 'Guest' : 'User'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='py-5 col-span-2'>
        <CardContent>
          <div className="w-full flex items-center justify-between">
            <p className=""><span className='font-semibold'>Pilot Details</span> ID: {currentJob.pilotID ? currentJob.pilotID : ""}</p>
            {currentJob.pilotID && <p onClick={viewPilot} className="hover:underline cursor-pointer text-lg">View Pilot</p>}
          </div>



          {currentJob.pilotID && <div className="flex flex-col gap-y-4 mt-4">
            <div>
              <p className="font-semibold text-sm mb-1">Full Name</p>
              <p className="">{pilot?.firstName} {pilot?.lastName}</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Email Address</p>
              <p className="">{pilot?.email}</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Phone Number</p>
              <p className="">{pilot?.telNumber}</p>
            </div>
            <div className='flex items-center justify-between'>
              <div className="flex-1">
                <p className="font-semibold text-sm mb-1">Flyer ID</p>
                <p className="">{pilot?.flyerID}</p>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm mb-1">Operator ID</p>
                <p className="">{pilot?.operatorID}</p>
              </div>
            </div>
          </div>}

        </CardContent>
      </Card>
    </div>
  )
}