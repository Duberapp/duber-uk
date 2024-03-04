
export interface StoragePlanType {
  id: 1 | 2,
  slug?: 'basic' | 'premium',
  text: string,
  features?: string[],
  price?: number | 'free'
}

export type JobStatusType = 'Available' | "Live" | "Completed" 