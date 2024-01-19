import { type TimeSlot, type TimeOptionSlug } from "./TimeOptionTypes";

export interface DurationOption {
  id: number,
  durationHours: number,
  price: number | 'free',
  type: 'included' | 'extend'
}

export interface GetDurationListParams {
  arrivalOption: TimeOptionSlug,
  arrivalTimeSlot?: TimeSlot
}