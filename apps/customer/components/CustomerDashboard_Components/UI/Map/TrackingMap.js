import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { map_styles, mapTheme } from "./mapStyles";
import LoadingSpinner from "../LoadingSpinner";
import { getPolygonCenter } from "../../../../utils/utilityFunctions";

const TrackingMap = ({ className, mapData }) => {
  const [mapStyle, setMapStyle] = useState(mapTheme[0]);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    mapboxgl.accessToken = process.env.NEXT_MAPBOX_TOKEN ?? "";
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle.style,
      center: mapData.center,
      zoom: mapData.zoom,
    });

    const getCenter = async (coordinates) => {
      try {
        const res = await getPolygonCenter(coordinates);
        const data = await res.data;
        if (data.error) throw data.error;

        map.current.setCenter(data.center);
      } catch (err) {
        console.log(err);
      }
    };

    // console.log(mapData);
    getCenter(mapData.polygon.features[0].geometry.coordinates);

    setLoading(false);

    let Draw = new MapboxDraw({
      defaultMode: "draw_polygon",
      displayControlsDefault: false,
      userProperties: true,

      styles: map_styles,
    });

    map.current.addControl(Draw, "top-left");

    map.current.on("load", () => {
      // Set polygon to context state
      if (mapData.polygon != undefined) {
        Draw.set(mapData.polygon);
      }
    });
  }, [mapStyle]);

  const handleMapStyle = () => {
    if (mapStyle.sattelite == true) {
      setMapStyle(mapTheme[0]);
    } else {
      setMapStyle(mapTheme[1]);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <LoadingSpinner width={6} height={6} color="text-primaryTealLight" />
      </div>
    );
  }

  return (
    <div className={`w-full h-[30vh] sm:h-72 ${className} rounded-md`}>
      <div
        className="overflow-hidden map-container w-full h-full relative rounded-md"
        ref={mapContainer}
      >
        <div
          onClick={handleMapStyle}
          className={
            mapStyle.sattelite
              ? `cursor-pointer absolute top-3 right-3 bg-red z-20 border border-solid py-1 px-2 rounded-md bg-sattelite text-white font-poppins uppercase`
              : `cursor-pointer absolute top-3 right-3 bg-red z-20 border border-solid py-1 px-2 rounded-md bg-input-bg uppercase text-white `
          }
        >
          {mapStyle.name}
        </div>
      </div>
    </div>
  );
};

export default TrackingMap;
