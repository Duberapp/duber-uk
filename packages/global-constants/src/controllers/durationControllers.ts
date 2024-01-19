import { type TimeOptionType, TimeOptions, TimeSlot } from "../types/TimeOptionTypes";
import { INCLUDED_DURATION_HOURS, durationList } from "../data/durationData";
import { type DurationOption, type GetDurationListParams } from "../types/DurationTypes";

/**
 * This functions is used to,
 * -> Convert time slots like '1pm', '2pm'.. into 13, 14 etc.
 */
function convertToCalculatableTimeSlot(timeSlot: TimeSlot): number | null {
  switch (timeSlot) {
    case '8am': return 8
    case '9am': return 9
    case '10am': return 10
    case '11am': return 11
    case '12pm': return 12
    case '1pm': return 13
    case '2pm': return 14
    case '3pm': return 15
    default: return null;
  }
}

function durationValidatorAlgorithm(arrivalTimeOption: TimeOptionType, timeSlot?: TimeSlot) {
  let eligible_extentions: DurationOption[] = [];
  let excluded_startTime: number;
  let durationList_extend = durationList.filter(duration => duration.type !== 'included')

  if (arrivalTimeOption.slug === 'choose' && timeSlot) {
    excluded_startTime = convertToCalculatableTimeSlot(timeSlot) + INCLUDED_DURATION_HOURS;
  } else {
    excluded_startTime = arrivalTimeOption.meta.from + INCLUDED_DURATION_HOURS;
  }

  /**
   * if MAX DURATION HOUR is a number,
   * Only return duration items lower than MAX DURATION HOUR,
   * Unless, return all duration items
   */
  let MAX_DURATION_HOUR: number | undefined;

  // Search Max Duration Hour
  for (let duration_increment = 0; duration_increment < durationList_extend.length; duration_increment++) {
    if ((excluded_startTime + durationList_extend[duration_increment].durationHours) > 17) {
      MAX_DURATION_HOUR = durationList_extend[duration_increment].durationHours;
      break;
    }
  }

  // Prepare eligible extentions list
  if (MAX_DURATION_HOUR === undefined) {
    eligible_extentions = durationList_extend
  } else if (MAX_DURATION_HOUR < 1) {
    eligible_extentions = []
  } else if (MAX_DURATION_HOUR > 1) {
    for (let term = 0; term < MAX_DURATION_HOUR - 1; term++) {
      eligible_extentions.push(durationList_extend[term])
    }
  }

  return eligible_extentions;
}

export function getDurationList({ arrivalOption, arrivalTimeSlot }: GetDurationListParams): DurationOption[] {
  const currentTimeOption = TimeOptions.filter(timeOpt => timeOpt.slug === arrivalOption)[0];
  let preparedDurationList: DurationOption[];

  arrivalTimeSlot = arrivalTimeSlot ? arrivalTimeSlot : null;

  const extentionList = durationValidatorAlgorithm(currentTimeOption, arrivalTimeSlot)
  preparedDurationList = [durationList[0], ...extentionList]


  return preparedDurationList;
}