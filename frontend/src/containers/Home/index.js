import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import React, { useEffect, useState } from "react";
import Map from "../Map";

const Home = () => {
  const [values, setValues] = React.useState({
    searchParameter: "",
    location: "",
  });

  return (
    <>
      <main>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "center", marginTop: "1em" }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-search"
              label="Job title, keywords, or company"
              type="search"
            />
            <TextField id="outlined-search" label="location" type="search" />
            <Button variant="contained">Find jobs</Button>
          </Box>
        </Grid>
        <Grid container style={{ marginTop: "30px" }}>
          <Grid item xs={4}>
            Job Results
          </Grid>
          <Grid item xs={8} style={{ width: "60vw", height: "70vh" }}>
            <Map />
          </Grid>
        </Grid>
      </main>
    </>
  );
};

export default Home;
