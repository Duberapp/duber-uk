import { type CancelBookingParams, type CancelBookingReturn } from 'global-constants'
import { customerClient, pilotClient } from '../config/createClient'

async function cancelBooking({ jobID, cancelledBy, reason }: CancelBookingParams): Promise<CancelBookingReturn> {
  try {
    // Update customer project -> Orders Table
    const { data: updateCustomerData, error: updateCustomerError } = await customerClient
      .from("Orders")
      .update({
        status:
          cancelledBy === 'pilot' ? "Pilot Canceled" :
            cancelledBy === 'customer' ? 'Customer Cancelled' :
              cancelledBy === 'duber' && 'Duber Cancelled',

      })
      .eq("id", jobID)

    if (updateCustomerError) throw updateCustomerError;

    // Update pilot project -> Jobs Table
    const { data: updatePilotData, error: updatePilotError } = await pilotClient
      .from("Jobs")
      .update({
        status:
          cancelledBy === 'pilot' ? "Pilot Canceled" :
            cancelledBy === 'customer' ? 'Customer Cancelled' :
              cancelledBy === 'duber' && 'Duber Cancelled',
      })
      .eq("JobID", jobID)

    if (updatePilotError) throw updatePilotError;

    // hanle backend request

    return { data: "", error: null }
  } catch (err) {
    return { data: null, error: err }
  }

}

export default cancelBooking;