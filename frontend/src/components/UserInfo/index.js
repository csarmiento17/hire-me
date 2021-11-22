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
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";

export default function UserInfo() {
  const { data, loading, refetch } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState(data?.me || {});

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
          USER PROFILE
        </h2>
        <Container>
              <Card sx={{ marginTop: 2 }} elevation={6} key={userData._id}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {userData.firstName} 
                  </Typography>
                  <Typography variant="h6" component="div">
                    {userData.lastName} 
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    {userData.email}
                  </Typography>
                  <Chip label={userData.savedJobsCount} variant="outlined"></Chip>
                  <Chip label={userData.appliedJobsCount} variant="outlined"></Chip>
                  <Typography variant="subtitle2" component="div" sx={{ marginTop: 2 }}>  
                  </Typography>
                </CardContent>
              </Card>
        </Container>
      </Container>
    </>
  );
}
