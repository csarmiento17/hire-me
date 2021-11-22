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
                    FIRST NAME   
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    {userData.firstName}
                  </Typography>

                  <Typography variant="h6" component="div">
                    LAST NAME  
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    {userData.lastName} 
                  </Typography>

                  <Typography variant="h6" component="div">
                    EMAIL 
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    {userData.email}
                  </Typography>
                  
                  <Typography variant="subtitle1" component="div">
                    Number of Saved Jobs 
                    <Chip 
                        label={userData.savedJobsCount} variant="outlined">
                    </Chip>
                  </Typography>
                  
                  <Typography variant="subtitle1" component="div">
                    Number of Applied Jobs 
                    <Chip 
                        label={userData.appliedJobsCount} variant="outlined">
                    </Chip>
                  </Typography> 

                  <Typography variant="subtitle1" component="div">
                    
                    SUBSCRIPTION
                  </Typography> 
                  {/* <Typography variant="subtitle1" component="div">
                    Start of Subscription
                    <Chip 
                        label={userData.premium.startOfSubscription} variant="outlined">
                    </Chip>
                  </Typography>  */}
                  <Typography variant="subtitle1" component="div">
                    Length of Subscription
                      <Chip 
                        label={userData.lengthtOfSubscription} variant="outlined">
                      </Chip>
                  </Typography> 
                  {/* <Typography variant="subtitle1" component="div">
                    End of Subscription
                      <Chip 
                        label={userData.premium.endOfSubscription} variant="outlined">
                      </Chip>
                  </Typography>  */}
                </CardContent>
              </Card>
        </Container>
      </Container>
    </>
  );
}
