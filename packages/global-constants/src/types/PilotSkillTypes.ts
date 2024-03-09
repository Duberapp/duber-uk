export type PilotSkill_Title = "Building / Roof Inspection" | "Marketing" | "Social Events"
export type PilotSkill_Slug = "building_roof_inspection" | "marketing" | "social_events"

export interface PilotSkill {
  title: PilotSkill_Title,
  slug: PilotSkill_Slug,
  description: string,
  mov_name: string
}