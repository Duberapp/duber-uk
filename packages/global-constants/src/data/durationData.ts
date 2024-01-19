import { type DurationOption } from "../types/DurationTypes";

export const INCLUDED_DURATION_HOURS: number = 2;

export const durationList: DurationOption[] = [
  {
    id: 1,
    durationHours: INCLUDED_DURATION_HOURS,
    price: 'free',
    type: 'included'
  },
  {
    id: 2,
    durationHours: 1,
    price: 25,
    type: 'extend'
  },
  {
    id: 3,
    durationHours: 2,
    price: 50,
    type: 'extend'
  },
  {
    id: 4,
    durationHours: 3,
    price: 75,
    type: 'extend'
  },
  {
    id: 5,
    durationHours: 4,
    price: 100,
    type: 'extend'
  },
  {
    id: 6,
    durationHours: 5,
    price: 125,
    type: 'extend'
  },
  {
    id: 7,
    durationHours: 6,
    price: 150,
    type: 'extend'
  },
  {
    id: 8,
    durationHours: 7,
    price: 175,
    type: 'extend'
  },
]

