import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
//component dependencies
import List from "../../components/List";
import Map from "../../components/Map";
import Spinner from "../../components/Spinner";
//queries and mutations
import { useQuery } from "@apollo/client";
import { QUERY_JOBS } from "../../utils/queries";

const Home = () => {
  const [childClicked, setChildClicked] = useState(null);
  const { loading, data } = useQuery(QUERY_JOBS);
  const jobs = data?.jobs || [];

  return (
    <Box className="container">
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
            label="Search for Job title"
            type="search"
          />
          {/* <TextField id="outlined-search" label="location" type="search" />*/}
          <Button variant="contained">Find jobs</Button>
        </Box>
      </Grid>

      <Grid container style={{ marginTop: "30px" }}>
        <Grid item xs={12} sm={4} sx={{ height: "70vh", overflow: "auto" }}>
          {loading ? (
            <Spinner />
          ) : (
            <List jobs={jobs} childClicked={childClicked} />
          )}
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
          {loading ? (
            <Spinner />
          ) : (
            <Map places={jobs} setChildClicked={setChildClicked} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
