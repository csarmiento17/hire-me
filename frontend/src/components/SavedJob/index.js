import React, { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Box,
  Container,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { useMutation } from "@apollo/react-hooks";
import Auth from "../../utils/auth";

//component dependencies
import List from "../List";
import Map from "../Map";
import Spinner from "../Spinner";
import Snackbar from "../Snackbar";
import { useQuery } from "@apollo/react-hooks";

//queries and mutations
import { QUERY_ME } from "../../utils/queries";
import { REMOVESAVEDJOBS } from "../../utils/mutations";

const SavedJobs = (job, selected, refProp) => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeJob] = useMutation(REMOVESAVEDJOBS);

  const [isReadMore, setIsReadMore] = useState(true);


  const userData = data?.me || [];

  const handleRemoveJob = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeJob({
        variables: { _id },
      });
      // upon success, remove book's id from localStorage
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      
        <h2>
          {userData.savedJobs?.length
            ? `Viewing ${userData.savedJobs.length} saved ${userData.savedJobs.length === 1 ? "jobs" : "jobs"
            }:`
            : "You have no saved jobs!"}
        </h2>
          {userData.savedJobs?.map((job) => {
            return (
              <Card sx={{ marginTop: 2 }} elevation={6}>

                <CardContent>
                  <Typography variant="h6" component="div">
                    {job.title}
                  </Typography>
                  
                </CardContent>

                
              </Card>
            );
          })}
    </>
  );
};

export default SavedJobs;



