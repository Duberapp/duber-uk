
type PilotExpertiseTitle = 'Asset Management' | 'Marketing' | 'Social Events';
type PilotExpertiseSlug = 'asset_management' | 'marketing' | 'social_events';

interface PilotSubExpertise {
  id: string,
  title: string,
  slug: string
}

interface PilotExpertise {
  id: number,
  title: PilotExpertiseTitle,
  slug: PilotExpertiseSlug,
  sub_expertises: PilotSubExpertise[]
}

export const PilotExpertises: PilotExpertise[] = [
  {
    id: 1,
    title: 'Asset Management',
    slug: 'asset_management',
    sub_expertises: [
      { id: 'asset_management_sub_1', title: "Building & Roof Inspections", slug: "building_and_roof_inspections" },
      { id: 'asset_management_sub_2', title: "Site Surveys", slug: "site_surveys" },
      { id: 'asset_management_sub_3', title: "Project Monitoring", slug: "project_monitoring" },
      { id: 'asset_management_sub_4', title: "Construction Site Inspections", slug: "construction_site_inspections" },
    ]
  },
  {
    id: 2,
    title: "Marketing",
    slug: "marketing",
    sub_expertises: [
      { id: 'marketing_sub_1', title: "Aerial Photography", slug: 'aerial_photography' },
      { id: 'marketing_sub_2', title: "Videography", slug: 'videography' },
      { id: 'marketing_sub_3', title: "Real Estate Showcases", slug: 'real_estate_showcases' },
      { id: 'marketing_sub_4', title: "Cinematic Footage", slug: 'cinematic_footage' },
      { id: 'marketing_sub_5', title: "Action Shots", slug: 'action_shots' },
    ]
  },
  {
    id: 3,
    title: "Social Events",
    slug: "social_events",
    sub_expertises: [
      { id: "social_events_sub_1", title: "Weddings", slug: "weddings" },
      { id: "social_events_sub_1", title: "Festivals", slug: "festivals" },
      { id: "social_events_sub_1", title: "Open Days", slug: "open_days" },
      { id: "social_events_sub_1", title: "Corporate Events", slug: "corporate_events" },
      { id: "social_events_sub_1", title: "Parties", slug: "parties" },
      { id: "social_events_sub_1", title: "Holidays", slug: "holidays" }
    ]
  }
]