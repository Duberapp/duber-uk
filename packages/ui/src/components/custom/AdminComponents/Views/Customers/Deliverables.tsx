import DashboardCard from '../../DashboardCard'
import { Card, CardContent } from '../../../../ui/card'
import { ScrollArea } from '../../../../ui/scroll-area'
import DetailedCard from '../../DetailedCard'

interface Props {
  totalDeliverablesSize: string | number,
  totalFiles: string | number,
  photos: string | number,
  videos: string | number,
}

export default function Deliverables({ photos, totalDeliverablesSize, totalFiles, videos }: Props) {
  return (
    <div className="py-3 grid grid-cols-4 gap-3">
      <DashboardCard
        noIcon title='Total Deliverables Size' mainText={`${totalDeliverablesSize}`}
      />
      <DashboardCard
        noIcon title='Total Files' mainText={`${totalFiles}`}
      />
      <DashboardCard
        noIcon title='Photos' mainText={`${photos}`}
      />
      <DashboardCard
        noIcon title='Videos' mainText={`${videos}`}
      />

      <Card className='col-span-2 py-5'>
        <CardContent>
          <div className="">
            <p className="font-semibold">Cloud Information</p>
          </div>

          <div className="flex flex-col gap-y-5 mt-5">
            <div className="">
              <p className="font-semibold">Files Uploaded</p>
              <p className="text-slate-400 mt-1">Files Uploaded</p>
            </div>
            <div className="">
              <p className="font-semibold">Total Bucket Size</p>
              <p className="text-slate-400 mt-1">80GB</p>
            </div>
            <div className="">
              <p className="font-semibold">Total Zip Folder Size</p>
              <p className="text-slate-400 mt-1">20GB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='col-span-2 py-5'>
        <CardContent>
          <div>
            <p className="font-semibold">Booking with Links Expiring</p>
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