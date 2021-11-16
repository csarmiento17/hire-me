import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./LocationMarker";
const Map = ({ center, zoom }) => {
  const [data, setData] = useState([
    { company: "Accenture", coordinates: [43.650982, -79.384993] },
    { company: "Google", coordinates: [43.649072, -79.384783] },
    { company: "IBM", coordinates: [43.66455, -79.382963] },
    { company: "Amazon", coordinates: [43.666909, -79.374212] },
    { company: "Facebook", coordinates: [43.65595, -79.401264] },
  ]);

  const markers = data.map((item) => {
    return <Marker lat={item.coordinates[0]} lng={item.coordinates[1]} />;
  });
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyD0eicUFmWGorXvJNsYnCApFQWIbCrbz8c" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
    </>
  );
};

Map.defaultProps = {
  center: {
    lat: Number(43.653225),
    lng: Number(-79.383186),
  },
  zoom: 10,
};

export default Map;
