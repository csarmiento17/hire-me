import React, { useState, useEffect, createRef } from "react";
import { Grid, Box, Typography } from "@mui/material";
import JobResult from "../JobResult";
const List = ({ jobs, childClicked }) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) =>
      Array(jobs.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [jobs]);

  return (
    <>
      {jobs.length === 0 ? (
        <Typography>No jobs found</Typography>
      ) : (
        <Grid container spacing={3} sx={{ padding: 3 }}>
          {jobs?.map((job, i) => (
            <Grid item ref={elRefs[i]} key={i} xs={12}>
              <JobResult
                selected={Number(childClicked) === i}
                refProp={elRefs[i]}
                job={job}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
export default List;
