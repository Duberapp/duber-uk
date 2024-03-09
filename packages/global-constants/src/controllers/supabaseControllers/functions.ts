import { pilotProjectURL } from '../../supabase/keys'


export function getPilotProfilePictureLink(path: string) {
  return `${pilotProjectURL}/storage/v1/object/public/profile-pics/${path}`
}