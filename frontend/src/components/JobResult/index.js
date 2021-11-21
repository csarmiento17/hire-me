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
import { ADDTOAPPLIEDJOBS } from '../../../src/utils/mutations';
import { useMutation } from "@apollo/client";
// import { useLazyQuery } from "@apollo/react-hooks";

export default function JobResult({ job, selected, refProp }) {
  const [isReadMore, setIsReadMore] = useState(true);

  const [addToAppliedJobs, { error }] = useMutation(ADDTOAPPLIEDJOBS);
  const [disable, setDisable] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleApplyJob = async (jobId) => {
    
    console.log("jobId: ", jobId)

    try {
        await addToAppliedJobs({
        variables: { appliedJobId: jobId},
      });

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
            disabled={disable.some((savedBookId) => savedBookId === book.bookId)}
            onClick={() => handleApplyJob(job._id) && setDisable(true)}>           
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
