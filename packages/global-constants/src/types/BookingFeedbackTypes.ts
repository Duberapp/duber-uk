

export type PilotRateIssueType = 'Late' | 'Professionalism' | 'Other' | 'Deliverables Quality' | 'App Issue';

export type RatingStatusType = "Terrible" | 'Poor' | 'Okay' | 'Good' | 'Excellent';

export interface PilotRatingType {
  id: number,
  title: RatingStatusType,
}