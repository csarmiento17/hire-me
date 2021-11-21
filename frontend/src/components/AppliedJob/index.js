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

const AppliedJobs = () => {
  const { loading, data } = useQuery(QUERY_ME);

  const userData = data?.me || [];

  return (
    <>
      <Container>
        <h2>
          {userData.appliedJobs?.length
            ? `Viewing ${userData.appliedJobs.length} saved ${userData.appliedJobs.length === 1 ? "jobs" : "jobs"
            }:`
            : "You have no applied jobs!"}
        </h2>
        <CardColumns>
          {userData.appliedJobs?.map((job) => {
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
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default AppliedJobs;
