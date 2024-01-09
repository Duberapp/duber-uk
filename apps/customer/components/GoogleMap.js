import React, { useRef, useState, useEffect } from "react";
import {
  DrawingManager,
  GoogleMap,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  Button,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "ui";
import { PolygonAreaCalculator } from "duber-maps";

const libraries = ["places", "drawing"];
const mapTypes = ["roadmap", "satellite"];

const MapComponent = ({ polygons, setPolygons }) => {
  const mapRef = useRef();
  const polygonRefs = useRef([]);
  const activePolygonIndex = useRef();
  const drawingManagerRef = useRef();
  const [mapType, setMapType] = useState(mapTypes[0]);

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

  const defaultCenter = {
    lat: 28.626137,
    lng: 79.821603,
  };
  const [center, setCenter] = useState(defaultCenter);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const polygonOptions = {
    fillOpacity: 0.3,
    draggable: true,
    editable: true,
  };

  const drawingManagerOptions = {
    polygonOptions: polygonOptions,
    drawingControl: false,
  };

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
        zoom={15}
        center={center}
        onLoad={onLoadMap}
        mapContainerStyle={containerStyle}
        onTilesLoaded={() => setCenter(null)}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: false,
          fullscreenControl: false,
        }}
      >
        <DrawingManager
          ref={drawingManagerRef}
          onOverlayComplete={onOverlayComplete}
          options={drawingManagerOptions}
        />
        {polygons.map((iterator) => (
          <Polygon
            key={iterator.id}
            onLoad={(event) => onLoadPolygon(event, iterator.id)}
            onMouseDown={() => onClickPolygon(iterator.id)}
            onMouseUp={() => onEditPolygon(iterator.id)}
            onDragEnd={() => onEditPolygon(iterator.id)}
            options={{
              fillColor: "#2060df",
              strokeColor: iterator.state === "active" ? "#2060df" : "#ff33cf",
              strokeWeight: iterator.state === "active" ? 3 : 2,
              ...polygonOptions,
            }}
            paths={iterator.paths}
            draggable
            editable
          />
        ))}

        {/* Custom Drawing Buttons Group */}
        {drawingManagerRef.current && (
          <div className="absolute top-5 left-5 flex flex-col gap-y-1">
            <TooltipProvider delayDuration={0}>
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
                    className="shadow-xl border border-gray-300"
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
            </TooltipProvider>
          </div>
        )}

        {/* Map type controllers */}
        {mapRef.current && (
          <div className="absolute bottom-5 right-5 shadow-lg">
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
        )}
      </GoogleMap>
    </div>
  ) : null;
};

export default MapComponent;
