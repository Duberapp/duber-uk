import { Database as CustomerDatabase } from "../types/customer.supabase";
import { Database as PilotDatabase } from "../types/pilot.supabase";
import {
  customerProjectANONKey,
  customerProjectURL,
  pilotProjectANONKey,
  pilotProjectURL
} from "../credentials";
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