import { MapPolygon, PolygonCalculatedArea } from "./types";

interface PolygonAreaCalculatorParams {
  paths: google.maps.LatLngLiteral[]
}

export function PolygonAreaCalculator({ paths }: PolygonAreaCalculatorParams): PolygonCalculatedArea {
  const fallBackValue = 0;
  const maxValueInSquareMeters = 10000;
  const squareMetersToSquareKilometersRatio = 10 ** -6;

  if (paths) {
    const squareMeters = google.maps.geometry.spherical.computeArea(paths);
    const isValueDisplayedInSquareMeters = squareMeters <= maxValueInSquareMeters;

    const area = parseFloat(
      (isValueDisplayedInSquareMeters
        ? squareMeters
        : squareMeters * squareMetersToSquareKilometersRatio
      ).toFixed(2)
    );


    return {
      area,
      type: isValueDisplayedInSquareMeters ? 'squareMeters' : 'squareKilometers'
    }
  }

  return {
    area: fallBackValue,
    type: 'squareMeters'
  };
}