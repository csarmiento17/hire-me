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
import { ADDTOSAVEDJOBS } from "../utils/mutations";
import { ADDTOAPPLIEDJOBS } from "../utils/mutations";

// create state to hold saved bookId values
const [savedJobIds, setSavedJobIds] = useState(getSavedJobIds());
const [addToSavedJobs] = useMutation(ADDTOSAVEDJOBS);

// create state to hold applied bookId values
const [appliedJobIds, setAppliedJobIds] = useState(getAppliedJobIds());
const [addToAppliedJobs] = useMutation(ADDTOAPPLIEDJOBS);

// set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
// learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup


export default function JobResult({ job, selected, refProp }) {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });


  useEffect(() => {
    return () => saveJobIds(savedJobIds);
  });

  // create function to handle saving a book to our database
  const handleApplyJob = async (_id) => {
    // find the book in `searchedBooks` state by the matching id
    const jobToApply = jobs.find((job) => job._id === _id);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await addToAppliedJobs({
        variables: { job: jobToApply },
      });

      // if book successfully saves to user's account, save book id to state
      setAppliedJobIds([...appliedJobIds, jobToApply._id]);
    } catch (err) {
      console.error(err);
    }
  };


  // create function to handle saving a job to our database
  const handleSaveJob = async (_id) => {
    // find the book in `searchedBooks` state by the matching id
    const jobToSave = jobs.find((job) => job._id === _id);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await addToSavedJobs({
        variables: { job: jobToSave },
      });

      // if book successfully saves to user's account, save book id to state
      setSavedJobIds([...savedJobIds, jobToSave._id]);
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
              disabled={appliedJobIds?.some(
                (appliedJobId) => appliedJobId === job._id
              )}
              className="btn-block btn-info"
              onClick={() => handleApplyJob(job._id)}
                    >
              {appliedBookIds?.some(
                (appliedJobId) => appliedJobId === job._id
              )
                ? "You have already applied to this job!"
                : " Apply Job"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="outlined"
              disabled={savedJobIds?.some(
                (savedJobId) => savedJobId === job._id
              )}
              className="btn-block btn-info"
              onClick={() => handleSaveJob(job._id)}
                    >
              {savedBookIds?.some(
                (savedJobId) => savedJobId === job._id
              )
                ? "This job has already been saved!"
                : " Save Job"}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
