import React, { useState } from "react";
import { get } from "ol/proj";
import { getCenter } from "ol/extent";
import "ol/ol.css";
import { RMap, RLayerImage, RInteraction, RLayerVector, RStyle } from "rlayers";
import { GeoJSON } from "ol/format";

const ImageInspection = () => {
  const proj = get("EPSG:4326");
  const extent = proj.getWorldExtent();
  const center = getCenter(extent);

  // Calculate the extent of the image, 50% smaller than the map
  const imageExtent = [
    extent[0] + (extent[2] - extent[0]) * 0.25, // min x
    extent[1] + (extent[3] - extent[1]) * 0.25, // min y
    extent[2] - (extent[2] - extent[0]) * 0.25, // max x
    extent[3] - (extent[3] - extent[1]) * 0.25, // max y
  ];

  const [polygonGeoJSON, setPolygonGeoJSON] = useState(null); // Declare state variable to store the GeoJSON of the polygon
  const [polygonFeature, setPolygonFeature] = useState(null); // Declare state variable to store the polygon feature

  // Function to handle the onDrawEnd event of the RDraw interaction
  const handleDrawEnd = (e) => {
    const newPolygonFeature = e.feature; // Get the drawn polygon feature
    const geoJSONFormat = new GeoJSON(); // Create an instance of the GeoJSON format
    const newPolygonGeoJSON = geoJSONFormat.writeFeature(newPolygonFeature); // Encode the feature as GeoJSON
    setPolygonGeoJSON(newPolygonGeoJSON); // Update the state with the polygon GeoJSON
    setPolygonFeature(newPolygonFeature); // Update the state with the polygon feature
  };

  return (
    <RMap
      width={"100%"}
      height={"50vh"}
      initial={{ center: center, zoom: 0 }}
      projection={proj}
      extent={extent}
      noDefaultControls
    >
      <RLayerImage
        url={
          "https://serving.photos.photobox.com/79338811f2b4314592e761807fd98a8dc4ff88db2147990e9488964a175722562847f4fc.jpg"
        }
        extent={imageExtent} // set the extent of the image to the calculated extent
      />
      <RLayerVector>
        {/* This is the style used for the drawn polygons */}
        <RStyle.RStyle>
          <RStyle.RStroke color="#0000ff" width={3} />
        </RStyle.RStyle>

        {polygonFeature ? (
          // If there is a polygon feature, render the RModify interaction
          <RInteraction.RModify feature={polygonFeature} />
        ) : (
          // If there is no polygon feature, render the RDraw interaction
          <RInteraction.RDraw type={"Polygon"} onDrawEnd={handleDrawEnd} />
        )}
      </RLayerVector>
    </RMap>
  );
};

export default ImageInspection;
