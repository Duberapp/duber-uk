import { Database as CustomerDatabase } from "global-constants/src/supabase/customer.supabase";
import { Database as PilotDatabase } from "global-constants/src/supabase/pilot.supabase";
import {
  customerProjectANONKey,
  customerProjectURL,
  pilotProjectANONKey,
  pilotProjectURL
} from "global-constants";
import { createClient } from '@supabase/supabase-js'

// ======================= CUSTOMER ========================
export const customerClient = createClient<CustomerDatabase>(
  customerProjectURL,
  customerProjectANONKey
)

// ======================= PILOT ========================
export const pilotClient = createClient<PilotDatabase>(
  pilotProjectURL,
  pilotProjectANONKey
)