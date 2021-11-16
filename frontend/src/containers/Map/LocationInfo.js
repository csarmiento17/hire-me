import React from "react";
import { makeStyles } from "@mui/styles";

import { Box, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  info: {
    position: "absolute",
    top: "350px",
    right: "130px",
    width: "150px",
    minHeight: "80px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    fontSize: "16px",
    color: "#000",
    //className={classes.info}
  },
}));

const LocationInfo = ({ info }) => {
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
