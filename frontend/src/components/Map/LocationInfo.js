import React from "react";
import useStyles from "./styles";

import { Box, Typography } from "@mui/material";

const LocationInfo = ({ info, lat, lang }) => {
  const classes = useStyles();

  return (
    <Box className={classes.info}>
      <Typography>{info.company}</Typography>
      <Typography>{info.coordinates[0]}</Typography>
      <Typography>{info.coordinates[1]}</Typography>
    </Box>
  );
};

export default LocationInfo;
