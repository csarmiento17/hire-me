import React from "react";
import loadable from "../../utils/loadable";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default loadable(() => import("./index"), {
  fallback: (
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
  ),
});