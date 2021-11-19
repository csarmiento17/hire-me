import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Chip,
  Button,
} from "@mui/material";

export default function JobResult({ job, selected, refProp }) {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Card sx={{ marginTop: 2 }} elevation={6}>
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
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item xs={12}>
            <Button fullWidth variant="outlined" style={{ marginBottom: 5 }}>
              Apply
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="outlined">
              Save Job
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
