import DashboardCard from '../../DashboardCard'
import SubscriptionInvoiceListItem from '../../SubscriptionInvoiceListItem'
import { Card, CardContent } from '../../../../ui/card'
import { ScrollArea } from '../../../../ui/scroll-area'
import DetailedCard from '../../DetailedCard'

interface Props {
  topSales: string | number,
  totalPilotPayouts: string | number,
  refunds: string | number,
  totalProfit: string | number,
}

export default function SalesView({ refunds, topSales, totalPilotPayouts, totalProfit }: Props) {
  return (
    <div className="py-3 grid grid-cols-4 gap-3">
      <DashboardCard
        noIcon title='Top Sales' mainText={`£${topSales}`}
      />
      <DashboardCard
        noIcon title='Total Pilot Payouts' mainText={`£${totalPilotPayouts}`}
      />
      <DashboardCard
        noIcon title='Refunds' mainText={`£${refunds}`}
      />
      <DashboardCard
        noIcon title='Total Profit' mainText={`£${totalProfit}`}
      />

      <Card className='col-span-2 py-5'>
        <CardContent>
          <div className="flex items-center gap-x-3">
            <p className="font-semibold">Subscription Invoices</p>
            <input type="text" className='text-slate-600 placeholder:text-slate-400 text-sm outline-none border-none' placeholder='Search by Booking ID' />
          </div>

          <ScrollArea className="max-h-72 flex flex-col mt-5">
            <SubscriptionInvoiceListItem
              date={new Date()}
              jobID={12345}
              plan='Premium Plan'
              price={350}
              transactionID={12345}
              className='mb-4'
            />
            <SubscriptionInvoiceListItem
              date={new Date()}
              jobID={12345}
              plan='Premium Plan'
              price={350}
              transactionID={12345}
              className='mb-4'
            />
            <SubscriptionInvoiceListItem
              date={new Date()}
              jobID={12345}
              plan='Premium Plan'
              price={350}
              transactionID={12345}
              className='mb-4'
            />
            <SubscriptionInvoiceListItem
              date={new Date()}
              jobID={12345}
              plan='Premium Plan'
              price={350}
              transactionID={12345}
              className='mb-4'
            />
            <SubscriptionInvoiceListItem
              date={new Date()}
              jobID={12345}
              plan='Premium Plan'
              price={350}
              transactionID={12345}
              className='mb-4'
            />
            <SubscriptionInvoiceListItem
              date={new Date()}
              jobID={12345}
              plan='Premium Plan'
              price={350}
              transactionID={12345}
              className='mb-4'
            />
            <SubscriptionInvoiceListItem
              date={new Date()}
              jobID={12345}
              plan='Premium Plan'
              price={350}
              transactionID={12345}
              className='mb-4'
            />
            <SubscriptionInvoiceListItem
              date={new Date()}
              jobID={12345}
              plan='Premium Plan'
              price={350}
              transactionID={12345}
              className='mb-4'
            />
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className='col-span-2 py-5'>
        <CardContent>
          <div>
            <p className="font-semibold">Subscriptions</p>
          </div>

          <ScrollArea className="max-h-72 flex flex-col mt-3">
            <DetailedCard
              className='mb-3'
              type='booking'
              topic={{ title: 'Assets Management', subtitle: 'Booking' }}
              content={{ subtitle: "Location", title: "Portsmouth, UK" }}
              infoText={['£350', '#1434234']}
              onView={() => ''}
              date={new Date().toLocaleDateString()}
            />
            <DetailedCard
              className='mb-3'
              type='booking'
              topic={{ title: 'Assets Management', subtitle: 'Booking' }}
              content={{ subtitle: "Location", title: "Portsmouth, UK" }}
              infoText={['£350', '#1434234']}
              onView={() => ''}
              date={new Date().toLocaleDateString()}
            />
            <DetailedCard
              className='mb-3'
              type='booking'
              topic={{ title: 'Assets Management', subtitle: 'Booking' }}
              content={{ subtitle: "Location", title: "Portsmouth, UK" }}
              infoText={['£350', '#1434234']}
              onView={() => ''}
              date={new Date().toLocaleDateString()}
            />
            <DetailedCard
              className='mb-3'
              type='booking'
              topic={{ title: 'Assets Management', subtitle: 'Booking' }}
              content={{ subtitle: "Location", title: "Portsmouth, UK" }}
              infoText={['£350', '#1434234']}
              onView={() => ''}
              date={new Date().toLocaleDateString()}
            />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}