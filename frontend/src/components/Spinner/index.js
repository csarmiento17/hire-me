import React from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = () => {
  return (
    <Box
      style={{
        color: "primary",
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
