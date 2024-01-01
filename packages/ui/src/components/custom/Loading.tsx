'use client';

import { Loader2 } from 'lucide-react'

interface LoadingProps {
  className?: string | null
}

export default function Loading({ className }: LoadingProps) {
  return (
    <Loader2 className={`${className} animate-spin`} />
  )
}