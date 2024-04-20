import DashboardCard from '../../DashboardCard'
import Chart from '../../../Chart'
import { Card, CardContent } from '../../../../ui/card'
import { ScrollArea } from '../../../../ui/scroll-area'
import DetailedCard from '../../DetailedCard'

interface SalesViewProps { }

const demoData = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000
  }
];


export default function SalesView({ }: SalesViewProps) {
  return (
    <main className='w-full'>
      {/* Overview Cards Section */}
      <div className="flex items-center justify-between gap-x-2.5">
        <DashboardCard noIcon title='Total Revenue' infoText='+20.1% from last month' mainText='£45,231.89' />
        <DashboardCard noIcon title='Subscriptions' infoText='+180.1% from last month' mainText='+2350' />
        <DashboardCard noIcon title='Sales' infoText='+19% from last month' mainText='+12,234' />
        <DashboardCard noIcon title='Incomplete Sales' infoText='+201 from yesterday' mainText='+573' />
      </div>

      <div className="mt-5 flex gap-x-2.5 h-full max-h-[30rem]">
        <Chart
          title='Overview'
          className='flex-1 h-[30rem]'
          chartData={demoData}
          XAxisProp={{
            dataKey: 'name'
          }}
          YAxisProp={{
            tickFormatter: (value) => `$${value}`
          }}
          barDataKey='total'
        />

        <Card className='w-[40%]'>
          <CardContent className='p-0'>
            <ScrollArea className='h-[28rem]'>
              <div className="py-4 px-6">
                <h3 className='text-base font-semibold'>Recent Sales</h3>
                <p className="text-xs text-slate-500">You made 265 sales in this month</p>
              </div>

              <div className="flex flex-col gap-y-5 px-4">
                <DetailedCard
                  type='booking'
                  topic={{ title: 'Assets Management', subtitle: 'Booking' }}
                  content={{ subtitle: "Location", title: "Portsmouth, UK" }}
                  infoText={['£350', '#1434234']}
                  onView={() => ''}
                  date={new Date().toLocaleDateString()}
                />
                <DetailedCard
                  type='booking'
                  topic={{ title: 'Assets Management', subtitle: 'Booking' }}
                  content={{ subtitle: "Location", title: "Portsmouth, UK" }}
                  infoText={['£350', '#1434234']}
                  onView={() => ''}
                  date={new Date().toLocaleDateString()}
                />
                <DetailedCard
                  type='addon'
                  topic={{ title: 'Subscription', subtitle: 'addon' }}
                  content={{ subtitle: "Plan", title: "Premium" }}
                  infoText={'£10'}
                  onView={() => ''}
                  date={new Date().toLocaleDateString()}
                />
                <DetailedCard
                  type='addon'
                  topic={{ title: 'Subscription', subtitle: 'addon' }}
                  content={{ subtitle: "Plan", title: "Premium" }}
                  infoText={'£10'}
                  onView={() => ''}
                  date={new Date().toLocaleDateString()}
                />
                <DetailedCard
                  type='addon'
                  topic={{ title: 'File Recovery', subtitle: 'Addon' }}
                  content={{ subtitle: "Booking ID", title: "#1434234" }}
                  infoText={'£95'}
                  onView={() => ''}
                  date={new Date().toLocaleDateString()}
                />
                <DetailedCard
                  type='addon'
                  topic={{ title: 'File Recovery', subtitle: 'Addon' }}
                  content={{ subtitle: "Booking ID", title: "#1434234" }}
                  infoText={'£95'}
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