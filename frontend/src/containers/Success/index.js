import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PREMIUM } from '../../utils/mutations';
import { QUERY_SUBSCRIPTION_LENGTH } from '../../utils/queries';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function Success() {
  
  const [addPremium] = useMutation(ADD_PREMIUM);
  const { data } = useQuery(QUERY_SUBSCRIPTION_LENGTH);

  const subsLengthNum = data?.getLengthOfSubscription?.lengthOfSubscription;

  useEffect(() => {
    async function saveSubscription() {
      
      console.log(subsLengthNum);
      if(subsLengthNum){
      await addPremium({
        variables: { subsLength: subsLengthNum }
      });
      }
      
      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveSubscription();
  },[addPremium, subsLengthNum]);

  return (
    <Box className="container">
      <Grid
        container="true"
        spacing={2}
        sx={{ justifyContent: "center", marginTop: "1em" }}
      >
        <Paper elevation={2} sx={{ p: 5, bgcolor: "success.main", width: "50%" }}>
          <Box sx={{ display: "flex", flexDirection: "column", color: "white"}}>
            <div className="successContent"><CheckCircleOutlineIcon sx={{ fontSize: 65 }} /></div>
            <div className="successContent"><h1 className="successHeader">Success!</h1></div>
            <div className="successContent"><p>Thank you for subscribing!</p></div>
            <div className="successContent"><p>You will now be redirected to the home page</p></div>
          </Box>
        </Paper>
      </Grid>
    </Box>
  );
}

export default Success;
