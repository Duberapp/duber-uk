
type PilotExpertiseTitle = 'Asset Management' | 'Marketing' | 'Social Events';
export type PilotExpertiseSlug = 'asset_management' | 'marketing' | 'social_events';

export interface PilotSubExpertise {
  id: string,
  title: string,
  slug: string
}

export interface PilotExpertise {
  id: number,
  title: PilotExpertiseTitle,
  description: string,
  slug: PilotExpertiseSlug,
  sub_expertises: PilotSubExpertise[],
  mov_name: string,
}