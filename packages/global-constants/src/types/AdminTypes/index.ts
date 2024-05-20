import { type PilotExpertiseTitle, type PilotExpertiseSlug } from "../PilotExpertiseTypes";

export type AdminRouteSlug =
  | '/admin-dashboard'
  | '/admin-dashboard/bookings'
  | '/admin-dashboard/customers'
  | '/admin-dashboard/pilots'
  | '/admin-dashboard/applications'
  | '/admin-dashboard/settings'
  | '/admin-dashboard/logout'


export type AdminRouteGroup = 'dashboard' | 'bookings' | 'customers' | 'pilots' | 'applications' | 'settings' | 'logout';

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

export type PilotExpertiseFilterItem = {
  slug: PilotExpertiseSlug,
  title: PilotExpertiseTitle
}

export type ApplicationFilterSlug = 'new' | 'approved' | 'declined';
export type ApplicationFilterTitle = 'New' | 'Approved' | 'Declined';

export type ApplicationFilterItem = {
  slug: ApplicationFilterSlug,
  title: ApplicationFilterTitle
}