import React from "react";
import RoomIcon from "@mui/icons-material/Room";
import { IconButton } from "@mui/material";

const Marker = ({ lat, lng, onClick }) => {
  return (
    <div className="location-marker" onClick={onClick}>
      <IconButton>
        <RoomIcon style={{ color: "red" }} />
      </IconButton>
    </div>
  );
};

export default Marker;
