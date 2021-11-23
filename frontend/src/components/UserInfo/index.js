import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Container,
  Divider,
} from "@mui/material";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import Spinner from "./../Spinner";
export default function UserInfo() {
  const { data, loading, refetch } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState(data?.me || {});

  useEffect(() => {
    data?.me?.savedJobs && setUserData(data?.me);
  }, [data, loading]);

  useEffect(async () => {
    const result = await refetch();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <Container>
        <Card sx={{ marginTop: 2 }} elevation={6} key={userData._id}>
          <CardContent>
            <Divider />
            <Typography variant="subtitle1" component="div" sx={{ margin: 1 }}>
              My Name: {userData?.firstName} {userData?.lastName}
            </Typography>
            <Divider />
            <Typography variant="subtitle1" component="div" sx={{ margin: 1 }}>
              My Email: {userData?.email}
            </Typography>
            <Divider />
            <Typography variant="subtitle1" component="div" sx={{ margin: 1 }}>
              Number of Saved Jobs:{" "}
              <Chip
                label={
                  userData?.savedJobsCount
                    ? userData?.savedJobsCount
                    : "No saved job"
                }
                variant="outlined"
                sx={{ marginLeft: 2 }}
              ></Chip>
            </Typography>
            <Divider />
            <Typography variant="subtitle1" component="div" sx={{ margin: 1 }}>
              Number of Applied Jobs:
              <Chip
                label={
                  userData?.appliedJobsCount
                    ? userData?.appliedJobsCount
                    : "No applied job"
                }
                variant="outlined"
                sx={{ marginLeft: 2 }}
              ></Chip>
            </Typography>
            <Divider />
            <Typography variant="subtitle1" component="div" sx={{ margin: 1 }}>
              Length of Subscription:
              <Chip
                label={
                  userData?.lengthtOfSubscription
                    ? userData?.lengthtOfSubscription
                    : "No subscription"
                }
                variant="outlined"
                sx={{ marginLeft: 2 }}
              ></Chip>
            </Typography>
            <Divider />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
