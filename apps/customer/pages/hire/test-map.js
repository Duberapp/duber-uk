import React, { useState } from "react";
import GoogleMap from "../../components/GoogleMap";

const TestMap = () => {
  const [polygons, setPolygons] = useState([]);
  const [mapState, setMapState] = useState("dynamic");

  return (
    <div className="w-full h-screen">
      <GoogleMap
        polygons={polygons}
        setPolygons={setPolygons}
        mapState={mapState}
        onSaveArea={() => console.log("Area Saved")}
      />
    </div>
  );
};

export default TestMap;
