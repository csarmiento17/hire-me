import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";

export default function JobResult({ jobs }) {
  return (
    <>
      {jobs &&
        jobs.map((job) => (
          <Card sx={{ maxWidth: 345, maxHeight: 600, marginTop: 2 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {job.title}
              </Typography>
              <Typography variant="subtitle2" component="div">
                {job.company}
              </Typography>
              <Chip label={job.jobTypes} variant="outlined"></Chip>
              <Typography variant="subtitle2" component="div">
                {job.jobDescription}
              </Typography>
              <Button fullWidth variant="outlined" style={{ marginBottom: 5 }}>
                Apply to this Job
              </Button>
              <Button fullWidth variant="outlined">
                Save Job
              </Button>
            </CardContent>
          </Card>
        ))}
    </>
  );
}
