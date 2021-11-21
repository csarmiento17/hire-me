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

import { useMutation } from "@apollo/react-hooks";
import Auth from "../../utils/auth";

import { ADDTOSAVEDJOBS } from "../../utils/mutations.js";
import { ADDTOAPPLIEDJOBS } from "../../utils/mutations.js";
import { QUERY_JOBS, QUERY_ME } from '../../utils/queries';

export default function JobResult({ job, selected, refProp }) {
  const [isReadMore, setIsReadMore] = useState(true);

  // create state to hold saved bookId values
  const [savedJobIds, setSavedJobIds] = useState('');
  const [addToSavedJobs, { error }] = useMutation(ADDTOSAVEDJOBS, {
    update(cache, { data: { addtoSavedJobs } }) {
      //update me object's cache, appending new thought to the end of the array
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, savedJobs: [...me.savedJobs, addToSavedJobs] } }
      });
    }
  });

  // create state to hold applied bookId values
  const [appliedJobIds, setAppliedJobIds] = useState('');
  const [addToAppliedJobs] = useMutation(ADDTOAPPLIEDJOBS, {
    update(cache, { data: { addtoSavedJobs } }) {
      //update me object's cache, appending new thought to the end of the array
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, applieddJobs: [...me.applieddJobs, addToAppliedJobs] } }
      });
    }
  });

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });


  // create function to handle saving a book to our database
  const handleApplyJob = async (_id) => {
    try {
      const { data } = await addToAppliedJobs({
        variables: { job: _id },
      });

      // if book successfully saves to user's account, save book id to state
      setAppliedJobIds([...appliedJobIds, _id]);
    } catch (err) {
      console.error(err);
    }
  };


  // create function to handle saving a job to our database
  const handleSaveJob = async (_id) => {
    console.log(_id);
    try {
      await addToSavedJobs({
        variables: { job: _id },
      });

      // if book successfully saves to user's account, save book id to state
      setSavedJobIds([...savedJobIds, _id]);
    } catch (err) {
      console.error(err);
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
            <Button fullWidth variant="outlined" style={{ marginBottom: 5 }}
              
              className="btn-block btn-info"
              onClick={() => handleApplyJob(job.title)}
            > APPLY
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="outlined"
              
              className="btn-block btn-info"
              onClick={() => handleSaveJob(job.title)}
            > SAVE
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
