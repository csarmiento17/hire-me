import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AppliedJobs from "../../components/AppliedJobs";
import SavedJobs from "../../components/SavedJobs";

export default function IconLabelTabs() {
  const [tab, setTab] = useState(0);
  const handleChange = (e, newValue) => {
    e.preventDefault();
    setTab(newValue);
  };

  return (
    <Box className="container">
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label="icon label tabs example"
      >
        <Tab icon={<FavoriteIcon />} label="Saved Jobs" />
        <Tab icon={<AccessTimeFilledIcon />} label="Applied Jobs" />
      </Tabs>
      {tab === 0 && <SavedJobs />}
      {tab === 1 && <AppliedJobs />}
    </Box>
  );
}
