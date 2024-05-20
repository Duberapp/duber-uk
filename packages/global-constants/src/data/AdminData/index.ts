import {
  type SubscriptionTypeItem,
  type AdminNavLinksType,
  type FilterItem,
  type UserTypeItem,
  type PilotExpertiseFilterItem,
  type ApplicationFilterItem
} from '../../types/AdminTypes'

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
    title: "App Settings",
    route: 'settings',
    slug: '/admin-dashboard/settings'
  },
  {
    id: 9,
    title: "Logout",
    route: "logout",
    slug: "/admin-dashboard/logout"
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

export const UserTypeFilterValues: UserTypeItem[] = [
  {
    slug: "guest",
    title: "Guest"
  },
  {
    slug: "account",
    title: "Account"
  }
]

export const SubscriptionTypeValues: SubscriptionTypeItem[] = [
  { slug: "inactive", title: "No Subscription" },
  { slug: "active", title: "Subscription Active" }
]

export const PilotExpertiseValues: PilotExpertiseFilterItem[] = [
  { slug: "asset_management", title: "Asset Management" },
  { slug: "marketing", title: "Marketing" },
  { slug: "social_events", title: "Social Events" }
]

export const ApplicationsFilterValues: ApplicationFilterItem[] = [
  { slug: "new", title: "New" },
  { slug: "approved", title: "Approved" },
  { slug: "declined", title: "Declined" },
]