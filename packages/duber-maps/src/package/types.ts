type AreaType = 'squareMeters' | 'squareKilometers'

export interface PolygonCalculatedArea {
  area: number,
  type: AreaType
}

export interface MapPolygon {
  id: number,
  area: number,
  areaType: AreaType,
  paths: google.maps.LatLngLiteral[],
  state: 'active' | 'inactive'
}


interface MapData {
  center: google.maps.LatLngLiteral,
  zoom: number,
  polygon: MapPolygon
}