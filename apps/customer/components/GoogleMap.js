import React, { useRef, useState, useEffect } from "react";
import {
  DrawingManager,
  GoogleMap,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import { TrashIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import {
  Button,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "ui";
import {
  PolygonAreaCalculator,
  containerStyle,
  drawingManagerOptions,
  polygonOptions,
  getPolygonCenter,
} from "duber-maps";
import OutsideClickHandler from "react-outside-click-handler";
import Image from "next/image";
import {
  XMarkIcon,
  MapIcon,
  GlobeEuropeAfricaIcon,
} from "@heroicons/react/24/outline";

const libraries = ["places", "drawing"];
const mapTypes = ["roadmap", "satellite"];

const MapComponent = ({
  polygons,
  setPolygons,
  mapState,
  onSaveArea,
  location,
  staticMapType,
  onCloseMap,
  mapOptions,
}) => {
  const mapRef = useRef();
  const polygonRefs = useRef([]);
  const activePolygonIndex = useRef();
  const drawingManagerRef = useRef();
  const [mapType, setMapType] = useState(
    staticMapType ? staticMapType : mapTypes[0]
  );
  const [outsideClickDisabled, setOutsideClickDisabled] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBkjmJZuDnGRocwQ4aJIz8VYnmuDmQ3IPs",
    libraries,
  });

  // Listen to Click Polygons -> Change polygon status
  useEffect(() => {
    if (activePolygonIndex.current) {
      let filtered_list = polygons.filter(
        (polygon) => polygon.id !== activePolygonIndex.current
      );

      filtered_list = filtered_list.map((polygon) => {
        let newPolyInstance = polygon;
        newPolyInstance.state = "inactive";
        return newPolyInstance;
      });

      let clickedPolygon = polygons.filter(
        (polygon) => polygon.id === activePolygonIndex.current
      )[0];

      clickedPolygon.state = "active";

      setPolygons([...filtered_list, clickedPolygon]);
    }
  }, [activePolygonIndex.current]);

  // Listen to location -> change center status
  useEffect(() => {
    mapRef.current?.setCenter(location);
    mapRef.current?.setZoom(20);
  }, [location, mapRef.current]);

  const defaultCenter = {
    lat: 54.237933,
    lng: -2.369669,
  };
  const [center, setCenter] = useState(defaultCenter);

  const onLoadMap = (map) => {
    mapRef.current = map;
  };

  const onLoadPolygon = (polygon, index) => {
    polygonRefs.current[index] = polygon;
  };

  const onClickPolygon = (index) => {
    activePolygonIndex.current = index;
  };

  const onOverlayComplete = ($overlayEvent) => {
    drawingManagerRef.current.state.drawingManager.setDrawingMode(null);

    if ($overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
      const newPolygonPaths = $overlayEvent.overlay
        .getPath()
        .getArray()
        .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));

      // start and end point should be same for valid geojson
      const startPoint = newPolygonPaths[0];
      newPolygonPaths.push(startPoint);
      $overlayEvent.overlay?.setMap(null);

      // Calculate Area
      const calculatedArea = PolygonAreaCalculator({ paths: newPolygonPaths });

      // Create new polygon Object
      const newPolygonObj = {
        id: Math.floor(100000 + Math.random() * 900000),
        area: calculatedArea.area,
        areaType: calculatedArea.type,
        paths: newPolygonPaths,
        state: "inactive",
      };

      setPolygons([...polygons, newPolygonObj]);
    }
  };

  const onDeleteDrawing = () => {
    const filtered = polygons.filter(
      (polygon) => polygon.id !== activePolygonIndex.current
    );

    setPolygons(filtered);
  };

  const onEditPolygon = (index) => {
    const polygonRef = polygonRefs.current[index];
    activePolygonIndex.current = index;

    if (polygonRef) {
      const coordinates = polygonRef
        .getPath()
        .getArray()
        .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));

      const filtered_list = polygons.filter((polygon) => polygon.id !== index);

      let edited_filtered_Polygon = polygons.filter(
        (polygon) => polygon.id === index
      )[0];

      // Modify edited polygon
      edited_filtered_Polygon.paths = coordinates;

      edited_filtered_Polygon.area = PolygonAreaCalculator({
        paths: coordinates,
      }).area;
      edited_filtered_Polygon.type = PolygonAreaCalculator({
        paths: coordinates,
      }).type;

      setPolygons([...filtered_list, edited_filtered_Polygon]);
    }
  };

  const onClickDrawButton = () => {
    // This preventing draw polygons more than 1
    if (polygons.length > 0 && polygons.length < 2) return;

    if (drawingManagerRef.current) {
      drawingManagerRef.current?.state.drawingManager?.setDrawingMode(
        google.maps.drawing.OverlayType.POLYGON
      );
    }
  };

  const onMapTypeChange = (selectedType) => {
    if (mapRef.current) {
      setMapType(selectedType);

      mapRef.current.setMapTypeId(selectedType);
    }
  };

  const setPolygonsInactive = () => {
    if (!activePolygonIndex.current) return;

    // set active index to null
    activePolygonIndex.current = null;

    // filter active polygons
    let active_polygons = polygons.filter(
      (polygon) => polygon.state === "active"
    );
    let inactive_polygons = polygons.filter(
      (polygon) => polygon.state !== "active"
    );

    if (active_polygons.length < 1) return;

    let active_polygon = active_polygons[0];
    active_polygon.state = "inactive";

    setPolygons([...inactive_polygons, active_polygon]);
  };

  const handleSaveArea = () => {
    try {
      if (polygons.length < 1)
        throw new Error("Please select area to continue");

      let polygon = polygons[0];

      // Get map center
      let { centerLatitude, centerLongitude } = getPolygonCenter(polygon.paths);

      // Get map zoom
      let mapCurrentZoom = mapRef.current.zoom;

      /**
       * Create and Pass MapData payload for save on DB
       * Depending on MapData type of duber-maps/types
       */
      let mapDataPayload = {
        center: { lat: centerLatitude, lng: centerLongitude },
        zoom: mapCurrentZoom,
        polygon: polygon,
      };

      onSaveArea(mapDataPayload, null);
    } catch (err) {
      onSaveArea(null, err.message);
    }
  };

  return isLoaded && typeof window !== "undefined" ? (
    <div
      className="map-container"
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        flex: 1,
      }}
    >
      <GoogleMap
        zoom={6}
        center={center}
        onLoad={onLoadMap}
        mapContainerStyle={containerStyle}
        onTilesLoaded={() => setCenter(null)}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: false,
          fullscreenControl: false,
          clickableIcons: false,
          gestureHandling: mapState === "static" ? "none" : "auto",
          ...mapOptions,
        }}
      >
        {mapState !== "static" && (
          <DrawingManager
            ref={drawingManagerRef}
            onOverlayComplete={onOverlayComplete}
            options={drawingManagerOptions}
          />
        )}
        {polygons &&
          polygons.length > 0 &&
          polygons.map((iterator, index) => (
            <OutsideClickHandler
              key={index}
              onOutsideClick={setPolygonsInactive}
              disabled={!activePolygonIndex.current || outsideClickDisabled}
            >
              <Polygon
                key={iterator.id}
                onLoad={(event) => onLoadPolygon(event, iterator.id)}
                onMouseDown={() => onClickPolygon(iterator.id)}
                onMouseUp={() => onEditPolygon(iterator.id)}
                onDragEnd={() => onEditPolygon(iterator.id)}
                options={{
                  ...polygonOptions,
                  strokeColor:
                    iterator.state === "inactive" ? "#E23DCB" : "#2060df",
                  clickable: mapState === "static" ? false : true,
                  draggable: mapState === "static" ? false : true,
                  editable: mapState === "static" ? false : true,
                }}
                paths={iterator.paths}
                draggable={mapState === "static" ? false : true}
                editable={mapState === "static" ? false : true}
              />
            </OutsideClickHandler>
          ))}

        {/* Duber logo - Static & Dynamic */}
        {mapState !== "static" && (
          <div className="absolute top-5 right-5 flex items-center gap-x-3">
            <Image
              src="/assets/Duber logo.svg"
              alt="logo"
              width={128}
              height={35}
            />

            <Button
              variant={"outline"}
              className="w-8 h-8"
              isIcon
              icon={<XMarkIcon className="w-5 h-5 text-duber-navyBlue-dark" />}
              onClick={onCloseMap}
            />
          </div>
        )}

        {/* Save Area Button */}
        {mapState !== "static" && (
          <div className="absolute sm:bottom-5 bottom-20 w-full flex items-center justify-center">
            <Button
              variant={"teal"}
              size={"xxl"}
              className="normal-case font-semibold w-48"
              onClick={handleSaveArea}
            >
              Save Area
            </Button>
          </div>
        )}

        {/* Custom Drawing Buttons Group */}
        {mapState !== "static" && drawingManagerRef.current && (
          <div
            className="absolute top-5 left-5 flex flex-col gap-y-1"
            onMouseEnter={() => setOutsideClickDisabled(true)}
            onMouseLeave={() => setOutsideClickDisabled(false)}
          >
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={() =>
                      drawingManagerRef.current.state.drawingManager.setDrawingMode(
                        null
                      )
                    }
                    variant={"white"}
                    isIcon={true}
                    icon={
                      <HandRaisedIcon className="w-5 h-5 text-duber-navyBlue-dark" />
                    }
                    disabled={
                      drawingManagerRef.current?.state.drawingManager
                        ?.drawingMode === null
                    }
                    className={`shadow-xl border border-gray-300
                      ${
                        drawingManagerRef.current?.state.drawingManager
                          .drawingMode === null
                          ? "border-2 border-duber-skyBlue bg-duber-skyBlue-light"
                          : ""
                      }
                    `}
                  />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Pan Gesture</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={onClickDrawButton}
                    variant={"white"}
                    isIcon={true}
                    icon={
                      <img
                        src="/assets/Vector.png"
                        alt=""
                        className="w-5 h-5"
                      />
                    }
                    disabled={
                      drawingManagerRef.current?.state.drawingManager
                        ?.drawingMode === "polygon"
                    }
                    className={`shadow-xl border border-gray-300
                      ${
                        drawingManagerRef.current?.state.drawingManager
                          .drawingMode === "polygon"
                          ? "border-2 border-duber-skyBlue bg-duber-skyBlue-light"
                          : ""
                      }
                    `}
                  />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Draw Polygons</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={onDeleteDrawing}
                    variant={"white"}
                    isIcon={true}
                    icon={
                      <TrashIcon className="w-5 h-5 text-duber-navyBlue-dark" />
                    }
                    className="shadow-xl border border-gray-300"
                  />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Delete Polygons</p>
                </TooltipContent>
              </Tooltip>

              <div className="mt-5 sm:hidden flex flex-col gap-y-1">
                <Button
                  onClick={() => onMapTypeChange(mapTypes[0])}
                  variant={mapType === mapTypes[0] ? "teal" : "white"}
                  isIcon={true}
                  icon={
                    <MapIcon
                      className={`w-5 h-5 ${
                        mapType === mapTypes[0] ? "text-white" : "text-gray-800"
                      }`}
                    />
                  }
                  className={`shadow-xl border border-gray-300
                      ${
                        mapType === mapTypes[0]
                          ? "border-2 border-teal-600"
                          : ""
                      }
                    `}
                />

                <Button
                  onClick={() => onMapTypeChange(mapTypes[1])}
                  variant={mapType === mapTypes[1] ? "teal" : "white"}
                  isIcon={true}
                  icon={
                    <GlobeEuropeAfricaIcon
                      className={`w-5 h-5 ${
                        mapType === mapTypes[1] ? "text-white" : "text-gray-800"
                      }`}
                    />
                  }
                  className={`shadow-xl border border-gray-300
                  ${mapType === mapTypes[1] ? "border-2 border-teal-600" : ""}
                    `}
                />
              </div>
            </TooltipProvider>
          </div>
        )}

        {/* Map type controllers */}
        {!staticMapType && mapRef.current && (
          <>
            <div className="absolute sm:flex hidden bottom-5 right-5 shadow-lg">
              <ToggleGroup
                type="single"
                variant={"mapType"}
                defaultValue={mapTypes[0]}
                value={mapType}
                onValueChange={onMapTypeChange}
              >
                <ToggleGroupItem value={mapTypes[0]}>Roadmap</ToggleGroupItem>
                <ToggleGroupItem value={mapTypes[1]}>Satellite</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </>
        )}
      </GoogleMap>
    </div>
  ) : null;
};

export default MapComponent;
