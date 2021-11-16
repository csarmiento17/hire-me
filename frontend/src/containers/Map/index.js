import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./LocationMarker";
import { Typography, Menu, Toolbar, IconButton } from "@mui/material";
import LocationInfo from "./LocationInfo";

const Map = ({ center, zoom, places, setChildClicked }) => {
  const [anchorElPinInfo, setAnchorElPinInfo] = React.useState(null);
  const [locInfo, setLocInfo] = useState(null);
  const open = Boolean(anchorElPinInfo);
  const handlePinInfo = (e, item) => {
    e.preventDefault();
    setAnchorElPinInfo(e.currentTarget);
    setLocInfo(item);
  };
  const handleClose = () => {
    setAnchorElPinInfo(null);
    setLocInfo(null);
  };

  const markers = places.map((item, id) => {
    return (
      <Marker
        key={id}
        lat={item.coordinates[0]}
        lng={item.coordinates[1]}
        onClick={(e) => handlePinInfo(e, item)}
      />
    );
  });
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
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
  zoom: 10,
};

export default Map;
