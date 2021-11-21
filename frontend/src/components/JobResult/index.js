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
import {ADDTOSAVEDJOBS} from "../../../src/utils/mutations";
import { useMutation } from '@apollo/client';
import Auth from '../../../src/utils/auth';
import Snackbar from "../../components/Snackbar";



export default function JobResult({ job, selected, refProp }) {

  const [addToSavedJobs] = useMutation(ADDTOSAVEDJOBS)
  const [err, setErr] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // create function to handle saving a book to our database
  const handleSaveJob = async (jobId) => {

    console.log("bookId", jobId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      setErr(true);
      return false;
    };

    try {
      const {data} = await addToSavedJobs({
        variables: { savedJobId:jobId  }
      });
      console.log("data", data);
    } catch (err) {
      console.log("save job failed", err);
    }
  };

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
            <Button fullWidth variant="outlined" style={{ marginBottom: 5 }}>
              Apply
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="outlined" onClick={() => handleSaveJob(job._id)}>
              Save Job
            </Button>
          </Grid>
        </Grid>
      </CardActions>

      {err && (
          <Snackbar
            snackopen={err}
            snackclose={() => setErr(false)}
            message="Please log in to save this job!"
          />
        )}
    </Card>
  );
}
