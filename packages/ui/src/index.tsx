import "../style/styles.css"

// data exports
export { pilot_skills } from 'global-constants'

// UI Exports
export { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group"
export * from "./components/ui/tooltip"
export * from "./components/ui/carousel"
export * from "./components/ui/scroll-area"
export * from "./components/ui/tabs"
export * from './components/ui/button'
export * from './components/ui/calendar'
export * from './components/ui/popover'

// component exports
export { default as Button } from "./components/custom/DuberButton";
export { default as Loading } from "./components/custom/Loading";
export { default as TextField } from "./components/custom/TextField";
export { default as DatePicker } from "./components/custom/DatePicker";
export { default as PilotSkillCard } from "./components/custom/PilotExpertiseCard/SkillCard";
export * from "./components/custom/DateRangePicker";

// Customer -> Component Exports
export { default as ExpertiseCard } from './components/custom/PilotExpertiseCard/ExpertiseCard'
export { default as StoragePlanCard } from './components/custom/CustomerComponents/StoragePlanCard'

// Stripe -> Component Exports
export { default as FillDetailsAlert } from "./components/custom/StripeComponents/FillDetailsAlert";
export { default as CreateStripeAlert } from "./components/custom/StripeComponents/CreateStripeAlert";
export { CreateButton as StripeCreateButton, StripeButton } from "./components/custom/StripeComponents/StripeButton";

// Dashboard -> Components Exports
export { default as JobCard } from './components/custom/DashboardComponents/JobCard'
export { InitialSidebar, JobDetailsSidebar, SideBarLayout } from './components/custom/DashboardComponents/Sidebar'
export { default as ArrivalTimeCard } from './components/custom/DashboardComponents/ArrivalTimeCard'
export { default as SingleJob_OverviewCard } from './components/custom/DashboardComponents/SingleJob_OverviewCard'
export { default as JobCancellationModal } from './components/custom/DashboardComponents/JobCancellationModal'

// Tracking Page -> Components Exports
export { default as TrackingPageLayout } from './components/custom/TrackingPageComponents/TrackingPageLayout'
export { default as TrackingBar } from './components/custom/TrackingPageComponents/TrackingBar'
export { default as SubscriptionInfoBar } from './components/custom/TrackingPageComponents/SubscriptionInfoBar'
export { default as BookingDetails } from './components/custom/TrackingPageComponents/BookingDetails'
export { default as BookingControlPanel } from './components/custom/TrackingPageComponents/BookingControlPanel'


// Admin -> Components Exports
export { default as ApplicationCard } from './components/custom/AdminComponents/ApplicationCard'
export { default as AdminSidebar } from './components/custom/AdminComponents/AdminSidebar'
export { default as AdminLayout } from './components/custom/AdminComponents/AdminLayout'
export { default as DashboardCard } from './components/custom/AdminComponents/DashboardCard'
export * from './components/custom/AdminComponents/Views/index'
