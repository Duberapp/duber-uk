import React from 'react'

type Props = {
  className: string
}

export default function MapContainer({ className }: Props) {
  return (
    <div className={`${className}`}>MapContainer</div>
  )
}