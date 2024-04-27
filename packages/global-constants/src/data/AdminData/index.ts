import { type AdminNavLinksType, type FilterItem } from '../../types/AdminTypes'

export const AdminNavLinks: AdminNavLinksType[] = [
  {
    id: 1,
    title: "Dashboard",
    route: 'dashboard',
    slug: '/admin-dashboard'
  },
  {
    id: 2,
    title: "Bookings",
    route: 'bookings',
    slug: '/admin-dashboard/bookings'
  },
  {
    id: 3,
    title: "Customers",
    route: 'customers',
    slug: '/admin-dashboard/customers'
  },
  {
    id: 4,
    title: "Drone Pilots",
    route: 'pilots',
    slug: '/admin-dashboard/pilots'
  },
  {
    id: 5,
    title: "Applications",
    route: 'applications',
    slug: '/admin-dashboard/applications'
  },
  {
    id: 6,
    title: "Settings",
    route: 'settings',
    slug: '/admin-dashboard/settings'
  }
]

export const BookingStatusFilterValues: FilterItem[] = [
  {
    slug: 'available',
    title: "Available"
  },
  {
    slug: 'completed',
    title: "Completed"
  },
  {
    slug: "live",
    title: "Live"
  },
  {
    slug: "customer_cancelled",
    title: "Customer Cancelled"
  },
  {
    slug: "pilot_cancelled",
    title: "Pilot Cancelled"
  }
]