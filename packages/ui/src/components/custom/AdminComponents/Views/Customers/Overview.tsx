import React, { useState } from 'react'
import { type Tables as CustomerTables } from 'supabase-config/types/customer.supabase'
import DashboardCard from '../../DashboardCard'
import { Card, CardContent } from '../../../../ui/card'
import { ScrollArea } from '../../../../ui/scroll-area'
import FilterDropdown from "../../../DashboardComponents/FilterDropdown";
import { BookingStatusFilterValues, PilotExpertises } from 'global-constants';
import DetailedCard from '../../DetailedCard'

interface Props {
  currentCustomer?: CustomerTables<"Customers">,
  totalBookings?: number | string,
  totalSales?: string | number,
  totalDeliverableSize?: string | number,
  subscriptions?: string | number
}

export default function Overview({ totalBookings, subscriptions, totalDeliverableSize, totalSales }: Props) {
  const [filterStatus, setFilterStatus] = useState("")
  const [filterExpertise, setFilterExpertise] = useState("")

  return (
    <div className="py-3 grid grid-cols-4 gap-3">
      <DashboardCard
        noIcon title='Total Bookings' mainText={`${totalBookings}`}
      />
      <DashboardCard
        noIcon title='Total Sales' mainText={`£${totalSales}`}
      />
      <DashboardCard
        noIcon title='Total Deliverables Size' mainText={`${totalDeliverableSize}`}
      />
      <DashboardCard
        noIcon title='Subscription' mainText={`${subscriptions}`}
      />

      <Card className='col-span-2 row-span-2'>
        <CardContent className='py-3'>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Bookings</p>

            <div className="flex items-center gap-x-2">
              <FilterDropdown
                placeholder="Filter by Status"
                dropdownLabel="Select Booking Status to Filter"
                items={BookingStatusFilterValues}
                value={filterStatus}
                setValue={setFilterStatus}
              />
              <FilterDropdown
                placeholder="Filter by Expertise"
                dropdownLabel="Select Pilot Expertise to Filter"
                items={PilotExpertises}
                value={filterExpertise}
                setValue={setFilterExpertise}
              />
            </div>
          </div>

          <ScrollArea className="mt-3 flex flex-col gap-y-3 max-h-72">
            <DetailedCard
              type='booking'
              topic={{ title: 'Assets Management', subtitle: 'Booking' }}
              content={{ subtitle: "Location", title: "Portsmouth, UK" }}
              infoText={['£350', '#1434234']}
              onView={() => ''}
              date={new Date().toLocaleDateString()}
              className='mb-5'
            />
            <DetailedCard
              type='booking'
              topic={{ title: 'Assets Management', subtitle: 'Booking' }}
              content={{ subtitle: "Location", title: "Portsmouth, UK" }}
              infoText={['£350', '#1434234']}
              onView={() => ''}
              date={new Date().toLocaleDateString()}
              className='mb-5'
            />
            <DetailedCard
              type='booking'
              topic={{ title: 'Assets Management', subtitle: 'Booking' }}
              content={{ subtitle: "Location", title: "Portsmouth, UK" }}
              infoText={['£350', '#1434234']}
              onView={() => ''}
              date={new Date().toLocaleDateString()}
              className='mb-5'
            />
            <DetailedCard
              type='booking'
              topic={{ title: 'Assets Management', subtitle: 'Booking' }}
              content={{ subtitle: "Location", title: "Portsmouth, UK" }}
              infoText={['£350', '#1434234']}
              onView={() => ''}
              date={new Date().toLocaleDateString()}
              className='mb-5'
            />
          </ScrollArea>
        </CardContent>
      </Card>

      <DashboardCard
        noIcon title='Unassigned Bookings' mainText={`2`}
      />
      <DashboardCard
        noIcon title='Assigned Bookings' mainText={`1`}
      />
      <DashboardCard
        noIcon title='Flight in Progress' mainText={`1`}
      />
      <DashboardCard
        noIcon title='Completed' mainText={`1`}
      />

    </div>
  )
}