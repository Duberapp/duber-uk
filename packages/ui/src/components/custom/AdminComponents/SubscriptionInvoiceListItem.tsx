/** This Component used in Views/Customers/Sales.tsx */

interface Props {
  date: string | Date,
  plan: string,
  transactionID: string | number,
  jobID: string | number,
  price: number | string,
  className?: string
}

export default function SubscriptionInvoiceListItem({ className, date, jobID, plan, price, transactionID }: Props) {
  return (
    <div className={className}>
      <div className="flex items-center gap-x-3">
        <p className="font-semibold">Subscription</p>
        <p className="font-semibold">{typeof date === 'string' ? date : date.toDateString()}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <p className="text-sm text-slate-400">{plan}</p>
          <p className="text-sm text-slate-400">Stripe Transaction ID: #{transactionID}</p>
          <p className="text-sm text-slate-400">Job ID: {jobID}</p>
        </div>
        <p className="font-semibold">£{price}</p>
      </div>
    </div>
  )
}