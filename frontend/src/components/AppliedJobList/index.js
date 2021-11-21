import React, { useState, useEffect, createRef } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import AppliedJob from "../AppliedJob";

const AppliedJobList = ({ jobs }) => {

  return (
    <>
        <Grid container spacing={3} sx={{ padding: 3 }}>
          {jobs?.map((job) => (
            <Grid item xs={12}>
              <AppliedJob
                job={job}
              />
            </Grid>
          ))}
        </Grid>
    </>
  );
};
export default AppliedJobList;
