import React from 'react'
import DashboardCard from '../../DashboardCard'
import { Card, CardContent } from '../../../../ui/card'

type SalesProps = {}

export default function Sales({ }: SalesProps) {
  return (
    <div className="py-3 grid grid-cols-4 gap-3">
      {/* Row 1 */}
      <DashboardCard
        noIcon title='Deposit' mainText={`£100 Paid`}
      />
      <DashboardCard
        noIcon title='Scheduled Payment' mainText={`£250 Awaiting`}
      />
      <DashboardCard
        noIcon title='Pilots Payout' mainText={`£150 Awaiting`}
      />
      <DashboardCard
        noIcon title='Addons' mainText={`0`}
      />

      {/* Row 2 */}
      <Card className='py-5 col-span-2'>
        <CardContent>
          <div className="w-full flex items-center justify-between">
            <p className=""><span className='font-semibold text-lg'>Sales Breakdown</span></p>
            <p className="text-lg">
              Stripe ID's:
              <span className='ml-1'>3242302</span> / <span>4352353</span>
            </p>
          </div>

          <div className="flex flex-col gap-y-4 mt-4">
            <div>
              <p className="font-semibold text-sm mb-1">Minimum Charge</p>
              <p className="w-full flex items-center justify-between">
                <span className='text-slate-500 '>6000m<sup>2</sup> or below</span>
                <span className='text-black font-semibold '>{`£350`}</span>
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Per Meter Addon</p>
              <p className="w-full flex items-center justify-between">
                <span className='text-slate-500 '>0m<sup>2</sup> {`(10p per meter)`}</span>
                <span className='text-black font-semibold '>{`£0`}</span>
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Arrival Time Addon</p>
              <p className="w-full flex items-center justify-between">
                <span className='text-slate-500 '>{`Any time (8am - 3pm)`}</span>
                <span className='text-black font-semibold '>{`£0`}</span>
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Duration Addon</p>
            </div>
          </div>

          <div className="w-full border border-t-black" />

          <div className="w-full flex mt-3 items-center justify-between">
            <p className="font-semibold">Total ex VAT</p>
            <p className="text-slate-500">£350</p>
          </div>
          <div className="w-full flex mt-3 items-center justify-between">
            <p className="font-semibold">Inc VAT</p>
            <p className="text-slate-500">£420</p>
          </div>
        </CardContent>
      </Card>

      <Card className='py-5 col-span-2'>
        <CardContent>
          <div className="w-full flex items-center justify-between">
            <p className=""><span className='font-semibold text-lg'>{`Documents & Payouts`}</span></p>
            <p className="text-lg">
              Stripe Connect ID:
              <span className='ml-1'>3242302</span>
            </p>
          </div>

          <div className="flex flex-col gap-y-4 mt-4">
            <div>
              <p className="font-semibold mb-1">{`Receipt (Deposit)`}</p>
              <p className="text-slate-500">filename.pdf</p>
            </div>
            <div>
              <p className="font-semibold mb-1">{`Invoice (Full Amount)`}</p>
              <p className="text-slate-500">filename.pdf</p>
            </div>
            <div className='flex items-center justify-between'>
              <div className="flex-1">
                <p className="font-semibold mb-1">{`Payouts`}</p>
                <p className="text-slate-500">£150</p>
              </div>
              <div className="flex-1">
                <p className="font-semibold mb-1">{`Status`}</p>
                <p className="text-slate-500">Awaiting Deliverables</p>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-1">{`Duber’s Payout`}</p>
              <p className="text-slate-500">£200</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}