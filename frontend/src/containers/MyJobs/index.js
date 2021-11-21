import * as React from "react";
import { Box, Tabs, Tab, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import PropTypes from 'prop-types';
import SavedJobList from "../../components/SavedJobList";
import AppliedJobList from "../../components/SavedJobList";
import { useLazyQuery } from "@apollo/react-hooks";
import { QUERY_ME } from "../../utils/queries";
import { useState, useEffect, createRef } from "react";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function MyJobs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [saveJobs, { data, loading }] = useLazyQuery(QUERY_ME);
  const [err, setErr] = useState(false);

  const jobSaved = data?.savedJobs || [];
  const jobApplied= data?.appliedJobs || [];

  return (
    <Box>
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
      <TabPanel value={value} index={0}>
        <SavedJobList jobSaved={jobSaved} />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <AppliedJobList jobApplied={jobApplied} />
      </TabPanel>
    </Box>
  );
}