import { Card } from '../../ui/card'
import DuberButton from '../DuberButton'

type DetailedCardProps = {
  type: 'booking' | 'addon' | 'cancel' | 'expiring_link',
  date: string,
  topic: { title: string, subtitle?: string },
  content: { title: string, subtitle?: string },
  infoText?: string | string[],
  onView: () => void
}

export default function DetailedCard({ content, date, onView, topic, type, infoText }: DetailedCardProps) {
  return (
    <Card className='p-2 pb-3 shadow-md bg-white border-1 border-slate-100'>
      <div className="w-full bg-duber-navyBlue flex items-center justify-between p-3 rounded-lg">
        <div className="">
          <p className="text-[10px] text-white">{
            type === 'cancel' ? 'Required Expertise' : topic.subtitle
          }</p>
          <p className="text-[14px] text-white font-semibold">{topic.title}</p>
        </div>

        <div className="flex items-center gap-x-2">
          {typeof infoText === 'string' ? (
            <p className="font-bold text-duber-pink text-[14px]">{infoText}</p>
          ) : infoText?.map((text, index) => (
            <p className={`${index === 0 ? 'font-bold' : 'font-normal'} text-[14px] text-duber-pink`}>{text}</p>
          ))}
        </div>
      </div>

      <div className="mt-2 pl-3 flex items-center justify-between">
        {/* Col 1 */}
        <div className="">
          <p className="text-[10px] text-duber-navyBlue">{
            type === 'cancel' ? 'Person that cancelled' : content.subtitle
          }</p>
          <p className="text-[14px] text-duber-navyBlue">{content.title}</p>
        </div>

        {/* Col 2 */}
        <div className="">
          <p className="text-[10px] text-duber-navyBlue">Date</p>
          <p className="text-[14px] text-duber-navyBlue">{date}</p>
        </div>

        {/* Col 3 */}
        <div className="">
          <DuberButton onClick={onView} className='bg-duber-teal hover:bg-duber-teal-dark text-white uppercase font-semibold'>View</DuberButton>
        </div>
      </div>
    </Card>
  )
}