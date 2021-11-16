import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import React, { useState } from "react";
import Map from "../Map";

const Home = () => {
  const [data] = useState([
    { company: "Accenture", coordinates: [43.650982, -79.384993] },
    { company: "Google", coordinates: [43.649072, -79.384783] },
    { company: "IBM", coordinates: [43.66455, -79.382963] },
    { company: "Amazon", coordinates: [43.666909, -79.374212] },
    { company: "Facebook", coordinates: [43.65595, -79.401264] },
  ]);

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
          <Grid item xs={12} sm={4}>
            Job Results
          </Grid>
          <Grid
            item
            xs={8}
            sx={{
              display: { xs: "none", sm: "block" },
              width: "60vw",
              height: "70vh",
            }}
          >
            <Map places={data} />
          </Grid>
        </Grid>
      </main>
    </>
  );
};

export default Home;
