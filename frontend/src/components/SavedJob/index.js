import React, { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { Box, Button, TextField, Grid } from "@mui/material";

//component dependencies
import List from "../List";
import Map from "../Map";
import Spinner from "../Spinner";
import Snackbar from "../Snackbar";
import { useMutation, useQuery } from "@apollo/react-hooks";

//queries and mutations
import { QUERY_ME } from "../../utils/queries";
import { REMOVESAVEDJOBS } from "../../utils/mutations";

const SavedJobs = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeJob] = useMutation(REMOVESAVEDJOBS);

  const userData = data?.me || [];

  const handleRemoveJob = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeJob({
        variables: { _id },
      });
      // upon success, remove book's id from localStorage
      removeJobId(_id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container>
        <h2>
          {userData.savedJobs?.length
            ? `Viewing ${userData.savedJobs.length} saved ${userData.savedJobs.length === 1 ? "jobs" : "jobs"
            }:`
            : "You have no saved jobs!"}
        </h2>
        <CardColumns>
          {userData.savedJobs?.map((book) => {
            return (
              <Card sx={{ marginTop: 2 }} elevation={6}>

                <CardContent>
                  <Typography variant="h6" component="div">
                    {job.title}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    {job.company}
                  </Typography>
                  <Chip label={job.jobTypes} variant="outlined"></Chip>
                  <Typography variant="subtitle2" component="div" sx={{ marginTop: 2 }}>
                    {isReadMore ? job.jobDescription.slice(0, 150) : job.jobDescription}
                    <IconButton size="small">
                      <span onClick={toggleReadMore} style={{ color: "blue" }}>
                        {isReadMore ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                      </span>
                    </IconButton>
                  </Typography>
                </CardContent>

                <CardActions>
                  <Grid container>
                    <Grid item xs={12}>
                      <Button
                        className="btn-block btn-danger"
                        onClick={() => handleRemoveJob(job._id)}>
                        REMOVE JOB
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>

              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedJobs;



