import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Chip, Container } from "@mui/material";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import Spinner from "../Spinner";

export default function AppliedJobs() {
  const { data, loading, refetch } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState(data?.me || {});

  useEffect(() => {
    data?.me?.savedJobs && setUserData(data?.me);
  }, [data, loading]);

  useEffect(() => {
    async function refetchData() {
      await refetch();
    }

    refetchData();
  }, [refetch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Container>
        <h2>
          {userData.appliedJobs?.length ? null : "You have no applied jobs!"}
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
                </CardContent>
              </Card>
            );
          })}
        </Container>
      </Container>
    </>
  );
}
