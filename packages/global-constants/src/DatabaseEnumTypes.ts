export type TimeSlot = string;

export type TimeOptionSlug = "any_time" | 'early' | 'afternoon' | 'choose';

export interface TimeOptionType {
  id: number,
  name: 'Any Time' | 'Early' | 'Afternoon' | 'Choose a time slot' | string,
  slug?: TimeOptionSlug,
  timeRange?: string,
  times?: TimeSlot[],
  price: number
}

export const TimeOptions: TimeOptionType[] = [
  { id: 1, name: 'Any Time', slug: 'any_time', timeRange: "(between 8am - 3pm)", price: 0 },
  { id: 2, name: 'Early', slug: 'early', timeRange: "(between 8am - 12pm)", price: 25 },
  { id: 3, name: 'Afternoon', slug: 'afternoon', timeRange: "(between 1pm - 3pm)", price: 25 },
  { id: 4, name: 'Choose a time slot', slug: 'choose', timeRange: '(8am - 3pm)', times: ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm'], price: 50 },
]