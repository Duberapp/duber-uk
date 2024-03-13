import { PilotSkill_Title } from "global-constants"
import { Tables } from "supabase-config/src/types/pilot.supabase";

export type PilotDataType = Tables<'Employees'>

export type DeliverableType = {
  id?: number,
  name: string,
  thumbnail: string,
  link: string,
}

export interface BookingControlPanelDataTypes {
  isPilotAssigned?: boolean,
  isTimeConfirmed?: boolean,
  enableSubscriptionPanel?: boolean,
  isBookingCancelled?: boolean,
  cancellationReason?: string,
  pilotData?: PilotDataType,
  isDeliverablesUploaded?: boolean,
  isDeliverablesExpired?: boolean,
  deliverablesList?: DeliverableType[] | [],
  handleDownloadDeliverables?: () => void,
  handleRatePilot?: () => void,
  handleSubscribe?: () => void,
  MapComponent?: React.ReactNode[],
}
