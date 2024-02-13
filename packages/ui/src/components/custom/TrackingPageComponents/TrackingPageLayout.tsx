import React from 'react'

type Props = {
  className?: string,
  children?: React.ReactNode | React.ReactNode[]
}

function TrackingPageLayout({ children, className }: Props) {
  return (
    <div className={`flex flex-col items-center gap-y-4 h-full py-5 w-full max-w-[700px] ${className}`}>
      {children}
    </div>
  )
}

export default TrackingPageLayout