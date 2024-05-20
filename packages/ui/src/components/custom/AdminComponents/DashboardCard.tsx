import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card'
import { Users } from "lucide-react";

type Props = {
  icon?: React.ReactNode,
  noIcon?: boolean,
  title: string,
  mainText: string,
  infoText?: string,
  className?: string,
  clickable?: boolean,
  onClick?: () => void,
  variant?: '' | "destructive" | 'disabled' | 'pink' | 'skyBlue'
}

export default function DashboardCard({ icon, infoText, mainText, title, noIcon = true, className, clickable, onClick, variant = "" }: Props) {
  return (
    <Card
      x-chunk="dashboard-01-chunk-1"
      className={`
        w-full ${className} 
        ${clickable && "cursor-pointer"} 
        ${variant == 'destructive' ? "bg-red-400 hover:bg-red-500"
          : variant == 'disabled' ? 'bg-slate-500 hover:bg-slate-600'
            : variant == 'pink' ? 'bg-duber-pink hover:bg-duber-pink-dark'
              : variant == 'skyBlue' && "bg-duber-skyBlue hover:bg-duber-skyBlue-dark"
        }
        transition-all duration-100
      `}
      onClick={onClick ? onClick : undefined}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle
          className={`
          text-sm font-medium 
          ${(variant === 'destructive' || variant === 'disabled' || variant === 'pink' || variant === 'skyBlue') && "text-white"}
          `}
        >
          {title}
        </CardTitle>
        {icon ? icon : !noIcon ? <Users className="h-4 w-4 text-muted-foreground" /> : ""}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${(variant === 'destructive' || variant === 'disabled' || variant === 'pink' || variant === 'skyBlue') && "text-white"}`}>{mainText}</div>
        {infoText && <p className="text-xs text-muted-foreground">
          {infoText}
        </p>}
      </CardContent>
    </Card>
  )
}