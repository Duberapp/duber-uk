import { pilotProjectURL } from "../../credentials";
import { pilotClient } from '../../config/createClient'
import { Tables } from '../../types/pilot.supabase';

export function getPilotProfilePictureLink(path: string) {
  return `${pilotProjectURL}/storage/v1/object/public/profile-pics/${path}`
}

export async function getPilot(id: string) {
  const res = await pilotClient.from('Employees').select("*").eq("id", id);
  return res;
}