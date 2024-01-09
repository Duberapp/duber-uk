import React, { useState } from "react";
import GoogleMap from "../../components/GoogleMap";

const TestMap = () => {
  const [polygons, setPolygons] = useState([]);

  return (
    <div className="w-full h-screen">
      <GoogleMap polygons={polygons} setPolygons={setPolygons} />
    </div>
  );
};

export default TestMap;
