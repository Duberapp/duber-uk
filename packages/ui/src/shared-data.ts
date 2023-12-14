export type PilotSkill_Title = "Building / Roof Inspection" | "Marketing" | "Social Events"
export type PilotSkill_Slug = "building_roof_inspection" | "marketing" | "social_events"

export interface PilotSkill {
  title: PilotSkill_Title,
  slug: PilotSkill_Slug,
  description: string,
  mov_name: string
}

export const pilot_skills: PilotSkill[] = [
  {
    title: "Building / Roof Inspection",
    slug: "building_roof_inspection",
    description: `+ I have a wide knowledge of external envelope of a building (roof details, facades, drainage)
      + I have experience in capturing detailed data for surveyors`,
    mov_name: "assets_management.mp4"
  },
  {
    title: "Marketing",
    slug: "marketing",
    description: `+ I have creative vision
      + I have experince capturing promotional videos and photos.
      + Photography/videography techniques, including knowledge of camera settings, framing, lighting, and editing.`,
    mov_name: "marketing.mp4"
  },
  {
    title: "Social Events",
    slug: "social_events",
    description: `+ Experience in fast changing environments.
      + Being in dynamic setting and identifying good photo/video opportunities.`,
    mov_name: "social_events.mp4"
  }
]