import React from "react";
import loadable from "../../utils/loadable";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default loadable(() => import("./index"), {
  fallback: (
    <>
      <Box style={{ display: "flex", justifyContent: "center", width: "50%" }}>
        <LinearProgress />
      </Box>
    </>
  ),
});
