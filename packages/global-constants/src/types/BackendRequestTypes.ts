
export interface CancelBookingParams {
  jobID: number,
  cancelledBy: "pilot" | "customer" | "duber",
  reason: string
}

export interface CancelBookingReturn {
  data: any | null,
  error: any | null,
}