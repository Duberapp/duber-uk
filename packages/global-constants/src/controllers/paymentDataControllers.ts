
export function calculatePilotJobValue(totalJobValue: number, transferRate: number): number {
  let calculatedPilotJobValue: number = 0;

  calculatedPilotJobValue = (totalJobValue - 100) * (1 - transferRate / 100);

  return calculatedPilotJobValue;
}