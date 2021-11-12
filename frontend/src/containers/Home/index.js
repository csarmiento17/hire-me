import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";

import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "red",
    color: (props) => props.color,
  },
  // form: {
  //   width: "auto",
  //   [theme.breakpoints.up("md")]: {
  //     backgroundColor: "red",
  //   },
  // },
  spinner: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

const Home = () => {
  const classes = useStyles();
  const timer = React.useRef();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    timer.current = window.setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={classes.root}>Test styling</div>
      <main className={classes.form}>
        <Typography>Home Page</Typography>
      </main>

      {loading && (
        <Box>
          <CircularProgress />
          <Typography variant="h6">Loading...</Typography>
        </Box>
      )}
    </>
  );
};

export default Home;
