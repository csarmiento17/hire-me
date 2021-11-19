import React from "react";
import RoomIcon from "@mui/icons-material/Room";
import { IconButton } from "@mui/material";

const Marker = ({ onClick }) => {
  return (
    <>
      <IconButton onClick={onClick}>
        <RoomIcon style={{ color: "red" }} />
      </IconButton>
    </>
  );
};

export default Marker;
