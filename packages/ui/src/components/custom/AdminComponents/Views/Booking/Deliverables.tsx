import React from 'react'
import DashboardCard from '../../DashboardCard'
import { Card, CardContent } from '../../../../ui/card'

type DeliverablesProps = {}

export default function Deliverables({ }: DeliverablesProps) {
  return (
    <div className="py-3 grid grid-cols-4 gap-3">
      {/* Row 1 */}
      <DashboardCard
        noIcon title='Total Size' mainText={`0GB`}
      />
      <DashboardCard
        noIcon title='Photos' mainText={`0`}
      />
      <DashboardCard
        noIcon title='Videos' mainText={`0`}
      />
      <DashboardCard
        noIcon title='Requested Format' mainText={`Photos & Videos`}
      />

      {/* Row 2 */}
      <Card className='py-5 col-span-2'>
        <CardContent>
          <div className="w-full flex items-center justify-between">
            <p className=""><span className='font-semibold text-lg'>Cloud Information</span></p>
          </div>

          <div className="flex flex-col gap-y-4 mt-4">
            <div>
              <p className="font-semibold text-sm mb-1">Files Uploaded</p>
              <p className="w-full text-slate-500">0</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Bucket Size</p>
              <p className="w-full text-slate-500">0GB</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Zip Folder Size</p>
              <p className="w-full text-slate-500">0GB</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm mb-1">Download Links Expiring</p>
                <p className="text-slate-500">in 30 Days</p>
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">Permenetly Deleting</p>
                <p className="text-slate-500">in 60 Days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className='py-5 col-span-2'>
        <CardContent>
          <div className="w-full flex items-center justify-between">
            <p className=""><span className='font-semibold text-lg text-navyBlue'>Deliverables</span></p>
          </div>

          <div className="flex flex-col gap-y-4 mt-4">
            {/* <div>
              <p className="font-semibold text-sm mb-1">Files Uploaded</p>
              <p className="w-full text-slate-500">
                0
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Bucket Size</p>
              <p className="w-full text-slate-500">
                0GB
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Zip Folder Size</p>
              <p className="w-full text-slate-500">
                0GB
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm mb-1">Download Links Expiring</p>
                <p className="text-slate-500">in 30 Days</p>
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">Permenetly Deleting</p>
                <p className="text-slate-500">in 60 Days</p>
              </div>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}