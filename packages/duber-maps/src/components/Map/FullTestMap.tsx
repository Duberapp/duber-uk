'use client';

import React from 'react'
import MapWrapper from "../../components/Map/MapWrapper";
import {
  ButtonName,
  DrawingButtonsGroup,
  useDrawingButtons,
} from "../../components/DrawingButtonsGroup";
import { Map, MapRef } from "../../components/Map";

export default function FullTestMap() {
  const mapRef = React.useRef<MapRef>(null);
  const { buttonName, setButtonName, resetButtonName } = useDrawingButtons();

  return (
    <div className="">
      <MapWrapper
        loadingElement={
          <div className="w-full h-full flex items-center justify-center bg-white">
            <p className="">Loading...</p>
          </div>
        }
      >
        <Map ref={mapRef} resetDrawingButtons={resetButtonName}>
          {/* Button Contrainer */}
          <div className="absolute left-1/2 bottom-6 -translate-x-1/2">

            <DrawingButtonsGroup selectedValue={buttonName}>
              <DrawingButtonsGroup.Button
                name={ButtonName.Polygon}
                onClick={() => {
                  mapRef.current?.drawPolygon();
                  setButtonName(ButtonName.Polygon);
                }}
              />
              <DrawingButtonsGroup.Button
                name={ButtonName.Circle}
                onClick={() => {
                  mapRef.current?.drawCircle();
                  setButtonName(ButtonName.Circle);
                }}
              />
              <DrawingButtonsGroup.Button
                name={ButtonName.Line}
                onClick={() => {
                  mapRef.current?.drawPolyline();
                  setButtonName(ButtonName.Line);
                }}
              />
            </DrawingButtonsGroup>
          </div>
        </Map>
      </MapWrapper>
    </div>
  )
}