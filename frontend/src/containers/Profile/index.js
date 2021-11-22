import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AppliedJobs from "../../components/AppliedJobs";
import UserInfo from "../../components/UserInfo";




const Profile = () => {


  return (
    <Box className="container">
      <UserInfo />
    </Box>
  );
}

export default Profile;



