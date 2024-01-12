import { CSSProperties } from 'react';

export const containerStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};

export const polygonOptions: google.maps.PolygonOptions = {
  fillColor: "#2060df",
  strokeColor: "#2060df",
  strokeWeight: 4,
  fillOpacity: 0.3,
  draggable: true,
  editable: true,
};

export const drawingManagerOptions: google.maps.drawing.DrawingManagerOptions = {
  polygonOptions: polygonOptions,
  drawingControl: false
};

export function getPolygonCenter(paths: google.maps.LatLngLiteral[]) {
  // Extract latitudes and longitudes from the paths array
  const latitudes = paths.map(point => point.lat);
  const longitudes = paths.map(point => point.lng);

  // Calculate the average latitude and longitude
  const centerLatitude = latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
  const centerLongitude = longitudes.reduce((sum, lng) => sum + lng, 0) / longitudes.length;

  return { centerLatitude, centerLongitude }
}

export { PolygonAreaCalculator } from './areaCalculator'