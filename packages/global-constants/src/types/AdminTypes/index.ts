export type AdminRouteSlug =
  | '/admin-dashboard'
  | '/admin-dashboard/bookings'
  | '/admin-dashboard/customers'
  | '/admin-dashboard/pilots'
  | '/admin-dashboard/applications'
  | '/admin-dashboard/settings'


export type AdminRouteGroup = 'dashboard' | 'bookings' | 'customers' | 'pilots' | 'applications' | 'settings';

export interface AdminNavLinksType {
  id: number,
  title: string,
  route: AdminRouteGroup,
  slug: AdminRouteSlug
}

export type HeaderType = 'root' | 'sub-root';

export type StatusFilterSlug = 'available' | 'live' | 'completed' | 'pilot_cancelled' | 'customer_cancelled'

export type FilterItem = {
  slug: string | StatusFilterSlug,
  title: string
}

export type UserTypeSlug = 'guest' | 'account';

export type UserTypeItem = {
  slug: UserTypeSlug,
  title: string
}

export type SubscriptionTypeSlug = 'inactive' | 'active';

export type SubscriptionTypeItem = {
  slug: SubscriptionTypeSlug,
  title: string,
}