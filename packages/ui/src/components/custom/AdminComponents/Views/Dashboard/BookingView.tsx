import DashboardCard from '../../DashboardCard'
import Chart from '../../../Chart'
import { Card, CardContent } from '../../../../ui/card'
import { ScrollArea } from '../../../../ui/scroll-area'
import DetailedCard from '../../DetailedCard'

interface BookingViewProps { }

const demoData = [
  {
    expertise: "Assets Management",
    precentage: Math.floor(Math.random() * 100) + 1
  },
  {
    expertise: "Marketing",
    precentage: Math.floor(Math.random() * 100) + 1
  },
  {
    expertise: "Social Events",
    precentage: Math.floor(Math.random() * 100) + 1
  },
];

export default function BookingView({ }: BookingViewProps) {
  return (
    <main className='w-full'>
      {/* Overview Cards Section */}
      <div className="flex items-center justify-between gap-x-2.5">
        <DashboardCard noIcon title='Total Bookings' infoText='+20.1% from last month' mainText='+2343' />
        <DashboardCard noIcon title='Unassigned' infoText='+180.1% from last month' mainText='+23' />
        <DashboardCard noIcon title='Live' infoText='+19% from last month' mainText='+12,234' />
        <DashboardCard noIcon title='Completed' infoText='+201 from yesterday' mainText='+573' />
      </div>

      <div className="mt-5 flex gap-x-2.5 h-full max-h-[30rem]">
        <Chart
          title='Popular Expertise'
          className='flex-1 h-[30rem]'
          chartData={demoData}
          XAxisProp={{ dataKey: "expertise" }}
          YAxisProp={{ tickFormatter: (value) => `${value}%` }}
          barDataKey='precentage'
        />

        <Card className='w-[40%]'>
          <CardContent className='p-0'>
            <ScrollArea className='h-[28rem]'>
              <div className="py-4 px-6">
                <h3 className='text-base font-semibold'>Cancelled Booking</h3>
                <p className="text-xs text-slate-500">5 cancellations in this month</p>
              </div>

              <div className="flex flex-col gap-y-5 px-4">
                <DetailedCard
                  type='cancel'
                  topic={{ title: 'Assets Management' }}
                  content={{ title: "Pilot" }}
                  infoText={'#1434234'}
                  onView={() => ''}
                  date={new Date().toLocaleDateString()}
                />
                <DetailedCard
                  type='cancel'
                  topic={{ title: 'Assets Management' }}
                  content={{ title: "Customer" }}
                  infoText={'#1434234'}
                  onView={() => ''}
                  date={new Date().toLocaleDateString()}
                />
                <DetailedCard
                  type='cancel'
                  topic={{ title: 'Assets Management' }}
                  content={{ title: "Pilot" }}
                  infoText={'#1434234'}
                  onView={() => ''}
                  date={new Date().toLocaleDateString()}
                />
                <DetailedCard
                  type='cancel'
                  topic={{ title: 'Assets Management' }}
                  content={{ title: "Customer" }}
                  infoText={'#1434234'}
                  onView={() => ''}
                  date={new Date().toLocaleDateString()}
                />
                <DetailedCard
                  type='cancel'
                  topic={{ title: 'Assets Management' }}
                  content={{ title: "Pilot" }}
                  infoText={'#1434234'}
                  onView={() => ''}
                  date={new Date().toLocaleDateString()}
                />
                <DetailedCard
                  type='cancel'
                  topic={{ title: 'Assets Management' }}
                  content={{ title: "Customer" }}
                  infoText={'#1434234'}
                  onView={() => ''}
                  date={new Date().toLocaleDateString()}
                />
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}