import React, { useState, useEffect, useRef, Children } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapTheme, mapStyles } from "./mapStyles";
import { getEachPilotLocation } from "../../../../config/supabaseFunctions";
import LoadingSpinner from "../../../CustomerDashboard_Components/UI/Loading";
import dynamic from "next/dynamic";
// import Marker from "../../../components/UI/Map/Marker";

const DynamicMarker = dynamic(() => import("../../UI/Map/Marker"), {
  ssr: false,
});

const DronePilotsMap = ({ center, zoom, pilots, children }) => {
  const [mapStyle, setMapStyle] = useState(mapTheme[0]);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [pilotLocations, setPilotLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Setup mapbox
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_MAPBOX_TOKEN ?? "";
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle.style,
      center: center,
      zoom: zoom,
    });

    map.current.on("load", () => {});
  }, [mapStyle]);

  // Fetch coordinates for pilots
  useEffect(() => {
    const fetchPilotLocations = async () => {
      try {
        setLoading(true);
        const res_list = await getEachPilotLocation(pilots);
        setPilotLocations(res_list);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchPilotLocations();
  }, [pilots]);

  useEffect(() => {
    if (pilotLocations.length !== 0) {
      pilotLocations.map((item) => {
        item?.location?.center &&
          new mapboxgl.Marker()
            .setLngLat(item.location.center)
            .addTo(map.current);
      });
    }
  }, [pilotLocations]);

  return (
    <div
      className={`w-full h-full relative rounded-2xl flex flex-col items-center justify-center`}
    >
      {loading && (
        <div className="absolute top-5 bg-white p-2 rounded-full z-[1000] shadow-md">
          <LoadingSpinner width={9} height={9} color="teal-500" />
        </div>
      )}

      <div
        className="overflow-hidden rounded-lg map-container w-full h-full relative p-4"
        ref={mapContainer}
      >
        {children}
      </div>
    </div>
  );
};

export default DronePilotsMap;
