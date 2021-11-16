import React from "react";
import RoomIcon from "@mui/icons-material/Room";
import { Box, IconButton } from "@mui/material";

const Marker = ({ lat, lng, onClick }) => {
  return (
    <>
      <IconButton onClick={onClick}>
        <RoomIcon style={{ color: "red" }} />
      </IconButton>
    </>
  );
};

export default Marker;
