import { PilotSkill_Title } from "@/shared-data"

export type PilotDataType = {
  name: string,
  contactNumber?: string,
  pilotExpertise?: PilotSkill_Title,
  droneEquipments?: string[],
  CAA_Info?: {
    operator_id: string,
    flyer_id: string
  },
  trainingProof?: string,
  insuranceProof?: string
}

type DeliverableType = {
  id: number,
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
  deliverablesList?: DeliverableType[] | [],
  handleDownloadDeliverables?: () => void,
  handleRatePilot?: () => void,
  handleSubscribe?: () => void,
  MapComponent?: React.ReactNode[],
}
