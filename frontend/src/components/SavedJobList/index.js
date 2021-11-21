import React, { useState, useEffect, createRef } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Paper,
  Typography,
  Grid,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { useMutation } from "@apollo/react-hooks";
import Auth from "../../utils/auth";
import SavedJob from "../SavedJob";

const SavedJobList = ({ jobs }) => {

  return (
    <>
      {
        <Grid container spacing={3} sx={{ padding: 3 }}>
          {jobs?.map((job) => (
            <Grid item xs={12}>
              <SavedJob
                job={job}
              />
            </Grid>
          ))}
        </Grid>
      }
    </>
  );
};
export default SavedJobList;
