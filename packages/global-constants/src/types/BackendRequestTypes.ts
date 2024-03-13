
export interface CancelBookingParams {
  cancelledBy: "pilot" | "customer",
  reason: string
}

export interface CancelBookingReturn {
  data: any | null,
  error: any | null,
}