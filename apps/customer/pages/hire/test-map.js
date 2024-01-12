import React, { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import GoogleMap from "../../components/GoogleMap";
import { Input } from "../../components/CustomerDashboard_Components";
import GoogleAutocomplete from "../../components/CustomerDashboard_Components/UI/GoogleAutocomplete";
import { Button } from "ui";

const TestMap = () => {
  const [polygons, setPolygons] = useState([]);
  const [mapState, setMapState] = useState("dynamic");
  const [searchCapture, setSearchCapture] = useState(mapState.address);
  const [locationGeocode, setLocationGeocode] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["drawing", "places"],
  });

  return (
    <div className="w-full h-screen flex flex-col items-center">
      {isLoaded && (
        <>
          <div className="py-2 w-2/3">
            <Input>
              <GoogleAutocomplete
                searchCapture={searchCapture}
                setSearchCapture={setSearchCapture}
                setLocationGeocode={setLocationGeocode}
              />
            </Input>
          </div>
          <br />

          <div className="w-96 border border-gray-500 rounded-lg p-5 shadow-lg">
            <h1 className="font-semibold text-xl text-duber-navyBlue">
              {polygons.length < 1 ? (
                <span className="">No Polygons yet</span>
              ) : (
                <span>
                  <span className="mr-2">Polygon Area : </span>
                  {polygons[0].area}
                  <span className="ml-1">
                    {polygons[0].areaType === "squareMeters"
                      ? "m"
                      : polygons[0].areaType === "squareKilometers"
                      ? "Km"
                      : ""}
                  </span>
                  <sup>2</sup>
                </span>
              )}
            </h1>
          </div>

          <br />

          <div className="w-2/3 h-[85vh]">
            <GoogleMap
              polygons={polygons}
              setPolygons={setPolygons}
              mapState={mapState}
              onSaveArea={(payload, error) => {
                if (!error) {
                  setLocationGeocode(payload.center);
                }
              }}
              location={locationGeocode}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TestMap;
