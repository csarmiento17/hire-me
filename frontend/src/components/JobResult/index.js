import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export default function JobResult({ job, selected, refProp }) {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

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
          {/*`${job.jobDescription.substring(1, 250)} ...`*/}
          {isReadMore ? job.jobDescription.slice(0, 150) : job.jobDescription}
          <IconButton>
            <span onClick={toggleReadMore} style={{ color: "blue" }}>
              {isReadMore ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            </span>
          </IconButton>
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