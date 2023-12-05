import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { useSelector, useDispatch } from "react-redux";
import { map_styles } from "./mapStyles";
var StaticMode = require("@mapbox/mapbox-gl-draw-static-mode");

const StaticMap = ({ className, mapStyle }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const state = useSelector((state) => state.map);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_MAPBOX_TOKEN ?? "";
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle.style,
      center: state.center,
      zoom: state.zoom,
      interactive: false,
      dragPan: false,
    });

    var modes = MapboxDraw.modes;
    modes.static = StaticMode;

    var Draw = new MapboxDraw({
      modes: modes,
      defaultMode: "static",
      touchEnabled: false,
      styles: map_styles,
      displayControlsDefault: false,
      boxSelect: true,
    });

    map.current.addControl(Draw);

    map.current.on("load", () => {
      // Set polygon to context state
      Draw.changeMode("static");
      if (state.polygon != undefined) {
        Draw.set(state.polygon);
      }
    });
  }, [state.center, mapStyle]);

  return (
    <div className={`w-full h-[45vh] ${className} rounded-md`}>
      <div
        className="overflow-hidden map-container w-full h-full rounded-md"
        ref={mapContainer}
      ></div>
    </div>
  );
};

export default StaticMap;
