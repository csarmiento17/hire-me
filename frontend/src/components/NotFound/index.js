import React from "react";
import { Box, Typography } from "@mui/material";
const PageNotFound = () => {
  return (
    <Box
      sx={{
        color: "primary",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "2em",
      }}
    >
      <Typography variant="h3">Page Not Found</Typography>
      <Typography variant="h5">Sorry, this page does not exist</Typography>
    </Box>
  );
};

export default PageNotFound;
