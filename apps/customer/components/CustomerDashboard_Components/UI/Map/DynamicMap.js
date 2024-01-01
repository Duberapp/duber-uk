import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import area from "@turf/area";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setPolygon,
  setArea,
  setPrice,
  setAddress,
  setCenter,
  setZoom,
} from "../../../../redux/mapSlice";
import { map_styles, mapTheme, hover_on_building_paint } from "./mapStyles";
import Button from "../Button";
import { Toaster, toast } from "react-hot-toast";
import { mapTooltip } from "../../UI/Toast";
import calculatePrice from "../../../../utils/priceCalculation";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
var StaticMode = require("@mapbox/mapbox-gl-draw-static-mode");
import {
  CursorArrowRaysIcon,
  TrashIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";

const DynamicMap = ({ className, onSave, mapStyle, handleMapStyle }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  let toastCount = 0;
  const [polygonEnabled, setPolygonEnabled] = useState(true);
  const [draw, setDraw] = useState(null);
  const [startOnChange, setStartOnChange] = useState(null);
  const [tooltipText, setTooltipText] = useState(
    "Click the map to start drawing"
  );

  const state = useSelector((state) => state.map);
  const dispatch = useDispatch();

  // Click the first point to complete the shape
  // Click the map to start drawing

  // Show tooltip
  useEffect(() => {
    if (toastCount < 1) {
      mapTooltip(tooltipText);
    }

    if (!startOnChange) {
      toastCount++;
    } else {
      toast.remove();
      mapTooltip("Click the first point to complete the shape");
    }
  }, [startOnChange]);

  // Map functions
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_MAPBOX_TOKEN ?? "";
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle.style,
      center: state.center,
      zoom: state.zoom,
    });

    var modes = MapboxDraw.modes;
    modes.static = StaticMode;

    let Draw = new MapboxDraw({
      modes: modes,
      controls: {
        polygon: false,
        trash: false,
      },
      defaultMode: "draw_polygon",
      displayControlsDefault: false,
      userProperties: true,

      styles: map_styles,
    });
    setDraw(Draw);

    map.current.addControl(Draw, "top-left");

    let selected;

    if (!polygonEnabled) Draw.changeMode("static");

    map.current.on("load", () => {
      // Set polygon to context state
      if (state.polygon != undefined) {
        Draw.set(state.polygon);
      }

      map.current.on("click", () => {
        setStartOnChange(true);
        setTooltipText("Click the first point to complete the shape");
      });

      map.current.on("touchstart", () => {
        setStartOnChange(true);
        setTooltipText("Click the first point to complete the shape");
      });

      map.current.on("draw.create", () => {
        let area_calculated = Math.round(
          area(Draw.getAll().features[0].geometry)
        );

        dispatch(setArea(area_calculated));
        dispatch(setPrice(calculatePrice(area_calculated)));
        dispatch(setPolygon(Draw.getAll()));
      });

      map.current.on("draw.update", (e) => {
        let area_calculated = Math.round(
          area(Draw.getAll().features[0].geometry)
        );

        dispatch(setArea(area_calculated));
        dispatch(setPrice(calculatePrice(area_calculated)));
        dispatch(setPolygon(Draw.getAll()));
      });

      // This allows only one drawing at a time
      map.current.on("draw.modechange", (e) => {
        const data = Draw.getAll();
        if (Draw.getMode() == "draw_polygon") {
          var pids = [];

          const lid = data.features[data.features.length - 1].id;
          data.features.forEach((f) => {
            if (f.geometry.type === "Polygon" && f.id !== lid) {
              pids.push(f.id);
            }
          });
          Draw.delete(pids);
        }
      });

      map.current.on("draw.delete", (e) => {
        dispatch(setPolygon(undefined));
        Draw.deleteAll();
        dispatch(setArea(0));
        dispatch(setPrice(0));
        dispatch(setAddress(null));
      });

      map.current.addLayer({
        id: "buildings",
        type: "fill",
        source: {
          type: "vector",
          url: "mapbox://mapbox.mapbox-streets-v8",
        },
        "source-layer": "building",
        paint: hover_on_building_paint,
      });

      if (!polygonEnabled) {
        map.current.on("mouseenter", "buildings", (e) => {
          const features = map.current.queryRenderedFeatures(e.point, {
            layers: ["buildings"],
          });

          if (!features.length < 1) {
            selected = features.at(-1);

            map.current.getCanvas().style.cursor = "pointer";

            map.current.setFeatureState(
              { source: "buildings", sourceLayer: "building", id: selected.id },
              { highlighted: true }
            );
          } else {
            map.current.getCanvas().style.cursor = "default";
          }
        });

        map.current.on("mouseleave", "buildings", (e) => {
          map.current.setFeatureState(
            { source: "buildings", sourceLayer: "building", id: selected.id },
            { highlighted: false }
          );
        });

        map.current.on("click", "buildings", (e) => {
          Draw.changeMode("static");

          try {
            var new_feature = {
              type: "Feature",
              properties: {},
              id: `${selected.id}`,
              geometry: {
                type: "Polygon",
                coordinates: selected.geometry.coordinates,
              },
            };

            if (Draw.getAll().features.length !== 0) {
              Draw.getAll().features.map((feature) => {
                if (parseInt(feature.id) === selected.id) {
                  throw new Error("Already Exists");
                }
              });
            }

            Draw.add(new_feature);

            let area_calculated = Math.round(area(new_feature.geometry));

            dispatch(setArea(state.area + area_calculated));
            dispatch(setPrice(calculatePrice(state.area + area_calculated)));
            dispatch(setPolygon(Draw.getAll()));
          } catch (err) {
            console.log(err.message);
          }
        });

        map.current.on("touchstart", "buildings", (e) => {
          e.preventDefault();
          const features = map.current.queryRenderedFeatures(e.point, {
            layers: ["buildings"],
          });

          if (!features.length < 1) {
            selected = features.at(-1);

            try {
              var new_feature = {
                type: "Feature",
                properties: {},
                id: `${selected.id}`,
                geometry: {
                  type: "Polygon",
                  coordinates: selected.geometry.coordinates,
                },
              };

              if (Draw.getAll().features.length !== 0) {
                Draw.getAll().features.map((feature) => {
                  if (parseInt(feature.id) === selected.id) {
                    throw new Error("Already Exists");
                  }
                });
              }

              Draw.add(new_feature);

              let area_calculated = Math.round(area(new_feature.geometry));

              dispatch(setArea(state.area + area_calculated));
              dispatch(setPrice(calculatePrice(state.area + area_calculated)));
              dispatch(setPolygon(Draw.getAll()));
            } catch (err) {
              console.log(err.message);
            }
          }
        });
      }
    });
  }, [state.center, mapStyle, polygonEnabled]);

  // ------------------- HANDLE SAVE ----------------------
  const handleSaveArea = () => {
    toast.dismiss();
    const center_obj = map.current.getCenter();

    dispatch(setCenter([center_obj.lng, center_obj.lat]));
    dispatch(setZoom(map.current.getZoom()));
    onSave();
  };

  const handlePolygonEnabled = ({ inverse }) => {
    const center_obj = map.current.getCenter();

    dispatch(setCenter([center_obj.lng, center_obj.lat]));
    dispatch(setZoom(map.current.getZoom()));

    if (inverse) {
      setPolygonEnabled((prevState) => false);
    } else {
      setPolygonEnabled((prevState) => true);
    }
  };

  const handleDeletePolygon = () => {
    draw.deleteAll();

    dispatch(setArea(0));
    dispatch(setPrice(0));
    dispatch(setPolygon(undefined));
  };

  return (
    <div className={`w-full min-h-[45vh] ${className}`}>
      <div
        className="overflow-hidden map-container w-full h-full relative"
        ref={mapContainer}
      >
        {/* Duber Logo */}
        <div className="w-full sm:flex hidden absolute top-5 right-5 z-20 items-center justify-end">
          {/* <img src="/assets/Duber Logo.svg" className="w-40" alt="" /> */}
          <Image
            src="/assets/Duber logo.svg"
            alt="logo"
            width={128}
            height={35}
          />
        </div>

        {/* Buttons */}
        <div className="w-fit absolute left-2 top-2 z-20 flex flex-col gap-y-2">
          {/* Polygon Button */}
          <button
            onClick={() => handlePolygonEnabled({ inverse: false })}
            className={`${
              polygonEnabled
                ? "bg-primaryBlueLight border-blue-400"
                : "bg-white border-gray-400 hover:border-gray-600"
            } p-1 rounded-md border-2  transition-all duration-100 flex items-center justify-center shadow-lg`}
          >
            <Square2StackIcon
              className={`w-6 h-6 ${
                polygonEnabled
                  ? "text-primaryBlue"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            />
          </button>

          {/* Building selection button */}
          <button
            onClick={() => handlePolygonEnabled({ inverse: true })}
            className={`${
              !polygonEnabled
                ? "bg-primaryBlueLight border-blue-400"
                : "bg-white border-gray-400 hover:border-gray-600"
            } p-1 rounded-md border-2  transition-all duration-100 flex items-center justify-center shadow-lg`}
          >
            <CursorArrowRaysIcon
              className={`w-6 h-6 ${
                !polygonEnabled
                  ? "text-primaryBlue"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            />
          </button>

          {/* Delete button */}
          <button
            onClick={handleDeletePolygon}
            className=" p-1 rounded-md flex items-center shadow-lg justify-center border-2 bg-white border-gray-400 hover:border-gray-600 active:border-blue-400 active:bg-primaryBlueLight text-gray-500 hover:text-gray-700 active:text-primaryBlue"
          >
            <TrashIcon className={`w-6 h-6`} />
          </button>
        </div>

        {/* Map theme switcher */}
        <div className="w-full absolute bottom-10 z-20 flex items-center justify-center">
          <div className="flex items-center gap-x-5">
            <Button
              width={"w-fit"}
              onClick={() => {
                toast.remove();
                handleSaveArea();
              }}
              className=" px-6 capitalize shadow-md"
            >
              Save Area
            </Button>

            <button
              onClick={handleMapStyle}
              className={`h-12 shadow-md bg-white cursor-pointer z-20 px-5 rounded-md  flex items-center gap-x-2`}
            >
              <PhotoIcon width={28} height={28} className="text-navyBlue" />
              <p className="font-[Poppins] text-base text-navyBlue font-medium">
                {mapStyle.name}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicMap;
