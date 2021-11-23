import React, { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { useQuery } from "@apollo/client";
import { Box, Button, TextField, Grid } from "@mui/material";

//component dependencies
import List from "../../components/List";
import Map from "../../components/Map";
import Spinner from "../../components/Spinner";
import Snackbar from "../../components/Snackbar";
//queries and mutations
import { QUERY_SEARCHEDJOBS, QUERY_JOBS } from "../../utils/queries";

const Home = () => {
  const [childClicked, setChildClicked] = useState(null);
  const [searchJob, setSearchJob] = useState(null);
  const [searchedJobs, { data, loading }] = useLazyQuery(QUERY_SEARCHEDJOBS);
  const [err, setErr] = useState(false);
  const { data: allJobData, loading: allJobsLoading } = useQuery(QUERY_JOBS);

  const jobs = data?.searchedJobs || allJobData?.allJobs || [];

  const handleFindJobs = (e) => {
    e.preventDefault();
    if (!searchJob) {
      setErr(true);
      return;
    }
    searchedJobs({
      variables: { title: searchJob },
    });
  };
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
            onChange={(e) => setSearchJob(e.target.value)}
          />
          {/* <TextField id="outlined-search" label="location" type="search" />*/}
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            onClick={(e) => handleFindJobs(e)}
          >
            Find jobs
          </Button>
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
          xs={12}
          sm={8}
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

        {err && (
          <Snackbar
            snackopen={err}
            snackclose={() => setErr(false)}
            message="Please enter a job title to search"
          />
        )}
      </Grid>
    </Box>
  );
};

export default Home;
