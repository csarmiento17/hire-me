import React from "react";
import useStyles from "./styles";

import { Box, Typography } from "@mui/material";

const LocationInfo = ({ info, lat, lang }) => {
  const classes = useStyles();

  return (
    <Box className={classes.info}>
      <Typography variant="subtitle1">{info.company}</Typography>
      <Typography variant="subtitle2">{info.title}</Typography>
    </Box>
  );
};

export default LocationInfo;
