import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Chip,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { REMOVESAVEDJOBS } from "../../utils/mutations";
import Spinner from "../Spinner";

export default function SavedJobs() {
  const { data, loading, refetch } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState(data?.me || {});
  const [removeSavedJobs] = useMutation(REMOVESAVEDJOBS);

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  useEffect(() => {
    data?.me?.savedJobs && setUserData(data?.me);
  }, [data, loading]);

  useEffect(() => {
    async function refetchData() {
      await refetch();
    }

    refetchData();
  }, [refetch]);

  const handleRemoveJob = async (jobId) => {
    try {
      await removeSavedJobs({
        variables: { savedJobId: jobId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Container>
        <h2>{userData.savedJobs?.length ? null : "You have no saved jobs!"}</h2>
        <Container>
          {userData.savedJobs?.map((job) => {
            return (
              <Card sx={{ marginTop: 2 }} elevation={6} key={job._id}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {job.title}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    {job.company}
                  </Typography>
                  <Chip label={job.jobTypes} variant="outlined"></Chip>
                  <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{ marginTop: 2 }}
                  >
                    {isReadMore
                      ? job.jobDescription.slice(0, 150)
                      : job.jobDescription}
                    <IconButton size="small" onClick={toggleReadMore}>
                      <span style={{ color: "blue" }}>
                        {isReadMore ? (
                          <ArrowDropDownIcon />
                        ) : (
                          <ArrowDropUpIcon />
                        )}
                      </span>
                    </IconButton>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid container>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => handleRemoveJob(job._id)}
                      >
                        Remove Job
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            );
          })}
        </Container>
      </Container>
    </>
  );
}
