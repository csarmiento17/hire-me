import * as React from "react";

import { Box, Tab, Tabs } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

export default function IconLabelTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="container">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
      >
        <Tab icon={<FavoriteIcon />} label="Saved Jobs" />
        <Tab icon={<AccessTimeFilledIcon />} label="Applied Jobs" />
      </Tabs>
    </Box>
  );
}
