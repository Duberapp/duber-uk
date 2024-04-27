import React from 'react'
import DashboardCard from '../../DashboardCard'
import { Card, CardContent } from '../../../../ui/card'

interface CustomerData {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  companyName: string,
  title: string,
  userData: any[] | null,
}

interface OverviewProps {
  viewCustomer: () => void,
  customer?: CustomerData
}

export default function Overview({ viewCustomer, customer }: OverviewProps) {
  return (
    <div className="py-3 grid grid-cols-4 gap-3">
      {/* Row 1 */}
      <DashboardCard
        noIcon title='Total Price' mainText='£350'
      />
      <DashboardCard
        noIcon title='Status' mainText='Assigning Pilot'
      />
      <DashboardCard
        noIcon title='Deliverable Size' mainText='0GB'
      />
      <DashboardCard
        noIcon title='Subscription' mainText='Inactive'
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
            <p className=""><span className='font-semibold'>Pilot Details</span> ID: </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}