import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card'
import { Users } from "lucide-react";

type Props = {
  icon?: React.ReactNode,
  noIcon?: boolean,
  title: string,
  mainText: string,
  infoText?: string,
  className?: string
}

export default function DashboardCard({ icon, infoText, mainText, title, noIcon = true, className }: Props) {
  return (
    <Card x-chunk="dashboard-01-chunk-1" className={`w-full ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon ? icon : !noIcon ? <Users className="h-4 w-4 text-muted-foreground" /> : ""}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{mainText}</div>
        {infoText && <p className="text-xs text-muted-foreground">
          {infoText}
        </p>}
      </CardContent>
    </Card>
  )
}