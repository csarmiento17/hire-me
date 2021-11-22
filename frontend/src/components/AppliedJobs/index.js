import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Container,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
// import { useLazyQuery } from "@apollo/react-hooks";

export default function AppliedJobs() {
  const { data, loading, refetch } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState(data?.me || {});

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
    return () => {
      refetchData();
    };
  }, [refetch]);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Container>
        <h2>
          {userData.appliedJobs?.length
            ? `Viewing ${userData.appliedJobs.length} applied ${
                userData.appliedJobs.length === 1 ? "job" : "jobs"
              }:`
            : "You have no applied jobs!"}
        </h2>
        <Container>
          {userData.appliedJobs?.map((job) => {
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
                  {/* <Typography variant="subtitle2" component="div" sx={{ marginTop: 2 }}>
                            {isReadMore ? job.jobDescription.slice(0, 150) : job.jobDescription}
                            <IconButton size="small">
                                <span onClick={toggleReadMore} style={{ color: "blue" }}>
                                    {isReadMore ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                                </span>
                            </IconButton>
                        </Typography> */}
                </CardContent>
              </Card>
            );
          })}
        </Container>
      </Container>
    </>
  );
}
