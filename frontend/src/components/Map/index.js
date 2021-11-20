import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./LocationMarker";
import LocationInfo from "./LocationInfo";

const Map = ({ center, places, setChildClicked }) => {
  const [locInfo, setLocInfo] = useState(null);

  const handlePinInfo = (e, item) => {
    e.preventDefault();
    setLocInfo(item);
  };

  const markers = places.map((item, id) => {
    return (
      <Marker
        key={id}
        lat={item.coordinates[0]}
        lng={item.coordinates[1]}
        onClick={(e) => handlePinInfo(e, item)}
      ></Marker>
    );
  });
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={center}
        defaultZoom={14}
        onChildClick={(child) => setChildClicked(child)}
      >
        {markers}
      </GoogleMapReact>
      {locInfo && <LocationInfo info={locInfo} />}
    </>
  );
};

Map.defaultProps = {
  center: {
    lat: Number(43.653225),
    lng: Number(-79.383186),
  },
};

export default Map;
